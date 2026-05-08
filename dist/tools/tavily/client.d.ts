/**
 * Tavily Client Management
 *
 * Creates Tavily client instances with proper initialization.
 */
import { type TavilyClient, type TavilyExtractOptions, type TavilySearchOptions } from "@tavily/core";
/** Default number of search results when max_results is not specified. */
export declare const DEFAULT_MAX_RESULTS = 8;
/**
 * Create a new Tavily client instance
 * @throws {Error} If TAVILY_API_KEY is not set or client initialization fails
 */
export declare function createTavilyClient(apiKey?: string): TavilyClient;
/**
 * Build Tavily search options from parameters
 */
export declare function buildSearchOptions(params: Record<string, unknown>): TavilySearchOptions;
/**
 * Create a search function pre-bound with a client
 * @param client Tavily client instance
 * @returns Search function
 */
export declare function createSearchFunction(client: TavilyClient): import("@tavily/core").TavilySearchFuncton;
/**
 * Validate search query
 * @throws {Error} If query is empty or whitespace only
 */
export declare function validateQuery(query: string): string;
/**
 * Build Tavily extract options from parameters
 */
export declare function buildExtractOptions(params: Record<string, unknown>): TavilyExtractOptions;
/**
 * Validate URLs array
 * @throws {Error} If URLs array is empty, exceeds max count, or contains invalid URLs
 */
export declare function validateUrls(urls: unknown[]): string[];
//# sourceMappingURL=client.d.ts.map