/**
 * Details builder for Tavily tool results
 *
 * Constructs WebSearchDetails for the success path,
 * centralizing the default-value logic so execute() stays clean.
 *
 * Error handling is delegated to Pi — thrown errors are caught by the
 * framework and reported to the LLM with isError: true.
 */
import type { TruncationResult } from "@earendil-works/pi-coding-agent";
import type { TavilyExtractOptions, TavilySearchOptions } from "@tavily/core";
import type { ExtractFailedResult, ExtractResult, SearchResult, WebExtractDetails, WebSearchDetails } from "./types.js";
export interface SuccessDetailsInput {
    query: string;
    options: TavilySearchOptions;
    answer: string | null;
    results: SearchResult[];
    truncation?: TruncationResult;
    fullOutputPath?: string;
}
/**
 * Build WebSearchDetails for a successful search.
 */
export declare function buildSuccessDetails(input: SuccessDetailsInput): WebSearchDetails;
export interface ExtractSuccessDetailsInput {
    urlCount: number;
    options: TavilyExtractOptions;
    results: ExtractResult[];
    failedResults: ExtractFailedResult[];
    truncation?: TruncationResult;
    fullOutputPath?: string;
}
/**
 * Build WebExtractDetails for a successful extract operation.
 */
export declare function buildExtractSuccessDetails(input: ExtractSuccessDetailsInput): WebExtractDetails;
//# sourceMappingURL=details.d.ts.map