/**
 * TUI renderers for Tavily tools
 */
import { Text } from "@earendil-works/pi-tui";
export type ToolCallResult = {
    details?: unknown;
    content: Array<{
        type: string;
        text?: string;
    }>;
};
type Theme = {
    fg: (color: string, text: string) => string;
    bold: (text: string) => string;
};
/**
 * Render a web search tool call
 */
export declare function renderWebSearchCall(args: Record<string, unknown>, theme: Theme): Text;
/**
 * Render a web search tool result
 */
export declare function renderWebSearchResult(result: ToolCallResult, state: {
    expanded: boolean;
    isPartial: boolean;
}, theme: Theme): Text;
/**
 * Render a web extract tool call
 */
export declare function renderExtractCall(args: Record<string, unknown>, theme: Theme): Text;
/**
 * Render a web extract tool result
 */
export declare function renderExtractResult(result: ToolCallResult, state: {
    expanded: boolean;
    isPartial: boolean;
}, theme: Theme): Text;
export {};
//# sourceMappingURL=renderers.d.ts.map