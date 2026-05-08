/**
 * Session-level result cache
 *
 * Populated by web_search results that include content.
 * Checked by web_extract before making an API call.
 * Cleared on session_start to prevent stale data across sessions.
 */
import type { ExtractResult } from "../tavily/types.js";
export declare const resultCache: {
    get(url: string): ExtractResult | undefined;
    set(result: ExtractResult): void;
    clear(): void;
};
//# sourceMappingURL=cache.d.ts.map