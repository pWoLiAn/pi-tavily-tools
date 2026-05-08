/**
 * Web Extract Tool - Provides content extraction capabilities using Tavily SDK
 *
 * Features:
 * - Extract raw content from one or more URLs
 * - Configurable extraction depth (basic/advanced)
 * - Optional image extraction
 * - Multiple output formats (markdown/text)
 * - Query-based content filtering
 * - Proper output truncation (50KB / 2000 lines)
 * - Custom TUI rendering
 * - Robust error handling
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import type { TavilyClient } from "@tavily/core";
export declare function registerWebExtractTool(pi: ExtensionAPI, client: TavilyClient): void;
//# sourceMappingURL=web-extract.d.ts.map