/**
 * Response formatters for Tavily tools
 */
// ============================================================================
// Web Search Formatting
// ============================================================================
/**
 * Format Tavily search response into human-readable text
 */
export function formatWebSearchResponse(answer, results, images, includeImages) {
    const parts = [];
    // Add AI answer if available
    if (answer) {
        parts.push(`AI Answer: ${answer}\n`);
    }
    // Add sources
    if (results.length > 0) {
        parts.push("Sources:");
        results.forEach((result, index) => {
            parts.push(`\n${index + 1}. ${result.title}`, `   URL: ${result.url}`, `   Score: ${result.score.toFixed(2)}`);
            // Add full content — truncation is handled downstream by applyTruncation
            const contentToShow = result.rawContent || result.content;
            if (contentToShow) {
                parts.push(`   Content: ${contentToShow}`);
            }
        });
    }
    else {
        parts.push("No results found.");
    }
    // Add image results if available
    if (includeImages && images.length > 0) {
        parts.push("\nImages:");
        images.slice(0, 5).forEach((image, index) => {
            parts.push(`\n${index + 1}. ${image.url}`);
            if (image.description) {
                parts.push(`   ${image.description}`);
            }
        });
    }
    return parts.join("\n");
}
/**
 * Format Tavily search results into compact parts structure
 */
export function formatSearchResults(answer, results, images, includeImages) {
    const parts = {
        answer: answer ?? undefined,
        sources: [],
    };
    // Add sources
    results.forEach((result, index) => {
        parts.sources.push(`\n${index + 1}. ${result.title}`, `   URL: ${result.url}`, `   Score: ${result.score.toFixed(2)}`);
        const contentToShow = result.rawContent || result.content;
        if (contentToShow) {
            parts.sources.push(`   Content: ${contentToShow}`);
        }
    });
    // Add image results if available
    if (includeImages && images.length > 0) {
        parts.images = [];
        images.slice(0, 5).forEach((image, index) => {
            parts.images.push(`\n${index + 1}. ${image.url}`);
            if (image.description) {
                parts.images.push(`   ${image.description}`);
            }
        });
    }
    return parts;
}
/**
 * Extract and type-safe Tavily response data
 */
export function extractSearchResults(response) {
    const resp = response;
    // Extract results
    const results = (resp.results || [])
        .filter((r) => r !== null && typeof r === "object")
        .map((r) => {
        const result = r;
        const scoreValue = typeof result.score === "number" ? result.score : Number(result.score);
        return {
            title: typeof result.title === "string" ? result.title : "Untitled",
            url: typeof result.url === "string" ? result.url : "",
            score: Number.isNaN(scoreValue) ? 0 : scoreValue,
            content: result.content,
            rawContent: result.rawContent,
        };
    });
    // Extract images
    const images = (resp.images || [])
        .filter((img) => img !== null && typeof img === "object")
        .map((img) => {
        const image = img;
        return {
            url: typeof image.url === "string" ? image.url : "",
            description: image.description,
        };
    });
    return {
        answer: resp.answer ?? null,
        results,
        images,
    };
}
// ============================================================================
// Web Extract Formatting
// ============================================================================
/**
 * Format Tavily extract response into human-readable text
 */
export function formatExtractResponse(results, failedResults, includeImages) {
    const parts = [];
    // Add successful extractions
    if (results.length > 0) {
        parts.push(`Successfully extracted content from ${results.length} URL(s):\n`);
        results.forEach((result, index) => {
            parts.push(`${index + 1}. ${result.title || "Untitled"}`);
            parts.push(`   URL: ${result.url}`);
            // Add full content — truncation is handled downstream by applyTruncation
            parts.push(`   Content: ${result.rawContent}`);
            // Add images if available and requested
            if (includeImages && result.images && result.images.length > 0) {
                parts.push(`   Images: ${result.images.length} found`);
                result.images.slice(0, 3).forEach((img, imgIndex) => {
                    parts.push(`      ${imgIndex + 1}. ${img}`);
                });
                if (result.images.length > 3) {
                    parts.push(`      ... ${result.images.length - 3} more`);
                }
            }
            parts.push("");
        });
    }
    else {
        parts.push("No content was extracted successfully.");
    }
    // Add failed extractions
    if (failedResults.length > 0) {
        parts.push(`\nFailed to extract from ${failedResults.length} URL(s):\n`);
        failedResults.forEach((failed, index) => {
            parts.push(`${index + 1}. URL: ${failed.url}`);
            parts.push(`   Error: ${failed.error}`);
        });
    }
    return parts.join("\n");
}
/**
 * Extract and type-safe Tavily extract response data
 */
export function extractExtractResults(response) {
    const resp = response;
    // Extract successful results
    const results = (resp.results || [])
        .filter((r) => r !== null && typeof r === "object")
        .map((r) => {
        const result = r;
        return {
            url: typeof result.url === "string" ? result.url : "",
            title: typeof result.title === "string" ? result.title : null,
            rawContent: typeof result.rawContent === "string" ? result.rawContent : "",
            images: Array.isArray(result.images) && result.images.every((img) => typeof img === "string")
                ? result.images
                : undefined,
        };
    });
    // Extract failed results
    const failedResults = (resp.failedResults || [])
        .filter((f) => f !== null && typeof f === "object")
        .map((f) => {
        const failed = f;
        return {
            url: typeof failed.url === "string" ? failed.url : "",
            error: typeof failed.error === "string" ? failed.error : "Unknown error",
        };
    });
    return {
        results,
        failedResults,
    };
}
//# sourceMappingURL=formatters.js.map