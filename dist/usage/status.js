/**
 * Tavily Usage Footer Status
 *
 * Manages the Pi footer status display for Tavily API usage,
 * with caching to avoid excessive API calls.
 */
import { Temporal } from "temporal-polyfill";
import { RateLimitError, getTavilyUsage } from "./api.js";
/** Cache for Tavily usage data to avoid excessive API calls */
export class UsageCache {
    apiKey;
    lastUsage = null;
    lastFetchTime = 0;
    backoffUntil = 0;
    static FETCH_COOLDOWN_MS = 120_000;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    /** Build and set footer status string from usage data */
    setStatusFromUsage(ctx, usageData) {
        const theme = ctx.ui.theme;
        let status;
        if (usageData) {
            const displayPercentage = Math.round(usageData.percentage * 10) / 10;
            status = theme.fg("muted", "🔍:") + theme.fg("accent", `${displayPercentage}%`);
        }
        else {
            status = theme.fg("muted", "🔍:") + theme.fg("accent", "N/A");
        }
        ctx.ui.setStatus("tavily-usage", status);
    }
    /** Update footer status with Tavily usage information */
    async updateStatus(ctx, fetchUsage = getTavilyUsage) {
        const now = Temporal.Now.instant().epochMilliseconds;
        // Respect rate-limit backoff — use cached data or show N/A
        if (now < this.backoffUntil) {
            this.setStatusFromUsage(ctx, this.lastUsage ?? undefined);
            return;
        }
        // Use cached data if still fresh
        if (this.lastUsage &&
            this.lastFetchTime &&
            now - this.lastFetchTime < UsageCache.FETCH_COOLDOWN_MS) {
            this.setStatusFromUsage(ctx, this.lastUsage);
            return;
        }
        try {
            const usage = await fetchUsage(this.apiKey);
            if (!usage) {
                // API returned empty or non-JSON body (e.g. 202 with no data)
                if (!this.lastUsage) {
                    this.setStatusFromUsage(ctx, undefined);
                }
                return;
            }
            this.lastUsage = usage;
            this.lastFetchTime = now;
            this.setStatusFromUsage(ctx, usage);
        }
        catch (error) {
            if (error instanceof RateLimitError) {
                this.backoffUntil = now + error.retryAfterMs;
                this.lastFetchTime = now;
                this.setStatusFromUsage(ctx, this.lastUsage ?? undefined);
            }
            else {
                // Network/API errors — show N/A if no cached data, otherwise keep cache
                if (this.lastUsage) {
                    this.setStatusFromUsage(ctx, this.lastUsage);
                }
                else {
                    this.setStatusFromUsage(ctx, undefined);
                }
            }
        }
    }
    /** Clear Tavily usage footer status */
    clear(ctx) {
        ctx.ui.setStatus("tavily-usage", undefined);
    }
}
//# sourceMappingURL=status.js.map