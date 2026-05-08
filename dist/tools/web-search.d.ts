/**
 * Web Search Tool - Provides web search capabilities using Tavily SDK
 *
 * Features:
 * - Search the web using Tavily's search API
 * - Configurable search depth (basic/advanced)
 * - Time-limited searches with days parameter
 * - AI-generated answers
 * - Proper output truncation (50KB / 2000 lines)
 * - Custom TUI rendering
 * - Robust error handling
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { TavilyClient } from "@tavily/core";
export declare function registerWebSearchTool(pi: ExtensionAPI, client: TavilyClient): void;
//# sourceMappingURL=web-search.d.ts.map