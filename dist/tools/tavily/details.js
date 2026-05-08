/**
 * Details builder for Tavily tool results
 *
 * Constructs WebSearchDetails for the success path,
 * centralizing the default-value logic so execute() stays clean.
 *
 * Error handling is delegated to Pi — thrown errors are caught by the
 * framework and reported to the LLM with isError: true.
 */
import { DEFAULT_MAX_RESULTS } from "./client.js";
// ============================================================================
// Option normalization
// ============================================================================
/**
 * Read normalized param defaults from TavilySearchOptions.
 */
function optionDefaults(options) {
    return {
        maxResults: options.maxResults ?? DEFAULT_MAX_RESULTS,
        searchDepth: String(options.searchDepth ?? "basic"),
        includeImages: options.includeImages ?? false,
        includeAnswer: options.includeAnswer !== false,
        includeRawContent: typeof options.includeRawContent === "string",
    };
}
/**
 * Build WebSearchDetails for a successful search.
 */
export function buildSuccessDetails(input) {
    const defaults = optionDefaults(input.options);
    return {
        query: input.query,
        maxResults: defaults.maxResults,
        searchDepth: defaults.searchDepth,
        includeAnswer: defaults.includeAnswer,
        includeRawContent: defaults.includeRawContent,
        includeImages: defaults.includeImages,
        days: input.options.days,
        answer: input.answer ?? undefined,
        resultCount: input.results.length,
        sources: input.results.map((r) => ({
            title: r.title,
            url: r.url,
            score: r.score,
        })),
        truncation: input.truncation,
        fullOutputPath: input.fullOutputPath,
    };
}
/**
 * Read normalized param defaults from TavilyExtractOptions.
 */
function extractOptionDefaults(options) {
    return {
        extractDepth: String(options.extractDepth ?? "basic"),
        includeImages: options.includeImages ?? false,
        format: String(options.format ?? "markdown"),
    };
}
/**
 * Build WebExtractDetails for a successful extract operation.
 */
export function buildExtractSuccessDetails(input) {
    const defaults = extractOptionDefaults(input.options);
    return {
        urlCount: input.urlCount,
        extractDepth: defaults.extractDepth,
        includeImages: defaults.includeImages,
        format: defaults.format,
        query: input.options.query,
        successCount: input.results.length,
        failureCount: input.failedResults.length,
        results: input.results,
        failedResults: input.failedResults,
        truncation: input.truncation,
        fullOutputPath: input.fullOutputPath,
    };
}
//# sourceMappingURL=details.js.map