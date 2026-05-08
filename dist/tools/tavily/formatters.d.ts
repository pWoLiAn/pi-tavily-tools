/**
 * Response formatters for Tavily tools
 */
import type { ExtractFailedResult, ExtractResult, FormattedOutputParts, ImageResult, SearchResult } from "./types.js";
/**
 * Format Tavily search response into human-readable text
 */
export declare function formatWebSearchResponse(answer: string | null, results: SearchResult[], images: ImageResult[], includeImages: boolean | undefined): string;
/**
 * Format Tavily search results into compact parts structure
 */
export declare function formatSearchResults(answer: string | null, results: SearchResult[], images: ImageResult[], includeImages: boolean): FormattedOutputParts;
/**
 * Extract and type-safe Tavily response data
 */
export declare function extractSearchResults(response: unknown): {
    answer: string | null;
    results: SearchResult[];
    images: ImageResult[];
};
/**
 * Format Tavily extract response into human-readable text
 */
export declare function formatExtractResponse(results: ExtractResult[], failedResults: ExtractFailedResult[], includeImages: boolean): string;
/**
 * Extract and type-safe Tavily extract response data
 */
export declare function extractExtractResults(response: unknown): {
    results: ExtractResult[];
    failedResults: ExtractFailedResult[];
};
//# sourceMappingURL=formatters.d.ts.map