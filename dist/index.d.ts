/**
 * Pi Tavily Web Search Extension
 *
 * Provides web search capabilities to Pi using Tavily's search API.
 * Adds a `web_search` tool that the LLM can use to find current
 * information, recent news, documentation, and time-sensitive data.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
/**
 * Main extension entry point.
 *
 * Requires TAVILY_API_KEY to be set — if missing, no hooks are registered
 * and the extension is effectively a no-op.
 *
 * Defers tool registration to `session_start` so Pi can start
 * even if the TAVILY_API_KEY is missing. The tool is registered only
 * once on the first agent run and persists across sessions.
 */
export default function (pi: ExtensionAPI): void;
//# sourceMappingURL=index.d.ts.map