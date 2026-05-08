/**
 * Session-level result cache
 *
 * Populated by web_search results that include content.
 * Checked by web_extract before making an API call.
 * Cleared on session_start to prevent stale data across sessions.
 */
const cache = new Map();
export const resultCache = {
    get(url) {
        return cache.get(url);
    },
    set(result) {
        cache.set(result.url, result);
    },
    clear() {
        cache.clear();
    },
};
//# sourceMappingURL=cache.js.map