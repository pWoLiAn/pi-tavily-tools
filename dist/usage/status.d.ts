/**
 * Tavily Usage Footer Status
 *
 * Manages the Pi footer status display for Tavily API usage,
 * with caching to avoid excessive API calls.
 */
import type { ExtensionContext } from "@earendil-works/pi-coding-agent";
import { type TavilyUsageData } from "./api.js";
/** Fetch usage function signature (same as getTavilyUsage for testability) */
export type FetchUsageFn = (apiKey: string) => Promise<TavilyUsageData | undefined>;
/** Cache for Tavily usage data to avoid excessive API calls */
export declare class UsageCache {
    private readonly apiKey;
    private lastUsage;
    private lastFetchTime;
    private backoffUntil;
    private static readonly FETCH_COOLDOWN_MS;
    constructor(apiKey: string);
    /** Build and set footer status string from usage data */
    private setStatusFromUsage;
    /** Update footer status with Tavily usage information */
    updateStatus(ctx: ExtensionContext, fetchUsage?: FetchUsageFn): Promise<void>;
    /** Clear Tavily usage footer status */
    clear(ctx: ExtensionContext): void;
}
//# sourceMappingURL=status.d.ts.map