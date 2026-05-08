/**
 * Tavily Usage API Client
 *
 * Fetches usage data from the Tavily usage endpoint.
 * @see https://docs.tavily.com/documentation/api-reference/endpoint/usage
 */
/** Default retry-after duration in milliseconds (5 minutes) */
export declare const DEFAULT_RETRY_AFTER_MS = 300000;
/** Error thrown when the Tavily usage API rate limit is exceeded */
export declare class RateLimitError extends Error {
    readonly retryAfterMs: number;
    constructor(retryAfterMs: number);
}
export interface TavilyUsageKeySection {
    usage: number;
    limit: number;
    search_usage: number;
    extract_usage: number;
    crawl_usage: number;
    map_usage: number;
    research_usage: number;
}
export interface TavilyUsageAccountSection {
    current_plan?: string;
    plan_usage: number;
    plan_limit: number;
    paygo_usage: number;
    paygo_limit: number;
    search_usage: number;
    extract_usage: number;
    crawl_usage: number;
    map_usage: number;
    research_usage: number;
}
export interface TavilyUsageResponse {
    key: TavilyUsageKeySection;
    account: TavilyUsageAccountSection;
}
export interface TavilyUsageData {
    /** Total usage as percentage of combined plan + PAYGO limit (0–100+) */
    percentage: number;
    /** Plan credits used */
    planUsage: number;
    /** Plan credits available */
    planLimit: number;
    /** Pay-as-you-go credits used */
    paygoUsage: number;
    /** Pay-as-you-go credits available */
    paygoLimit: number;
    /** Per-API key usage */
    keyUsage: number;
    /** Per-API key limit */
    keyLimit: number;
}
/**
 * Fetch Tavily usage data from the API
 * @returns {Promise<TavilyUsageData | undefined>} Usage data or undefined if API returns empty/invalid response
 * @throws {Error} If the API key is missing, the request fails, or the response is malformed
 * @note Tavily may return 202 with empty body for valid keys without usage history yet
 */
export declare function getTavilyUsage(apiKey: string): Promise<TavilyUsageData | undefined>;
//# sourceMappingURL=api.d.ts.map