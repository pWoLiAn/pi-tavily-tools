/**
 * Shared execute helpers for Tavily tools
 *
 * Provides reusable utilities for the common phases of tool execution:
 * - Progress updates (onUpdate)
 * - Truncation + result assembly
 */
import type { AgentToolUpdateCallback, ExtensionContext, TruncationResult } from "@earendil-works/pi-coding-agent";
/**
 * Race a promise against an AbortSignal.
 * The SDK doesn't natively support signal, so we wrap the call.
 * The underlying HTTP request still completes on Tavily's side,
 * but the tool call rejects immediately on cancellation.
 */
export declare function raceAbort<T>(promise: Promise<T>, signal: AbortSignal | undefined): Promise<T>;
/**
 * Sanitize a provider error before surfacing it.
 * Strips Tavily API keys and auth header values from error messages
 * to prevent credential leakage in tool output or logs.
 */
export declare function sanitizeError(error: unknown): Error;
/**
 * Send a progress update to the TUI during tool execution.
 * Wraps the common `onUpdate?.({ content: [...], details: {} })` pattern.
 */
export declare function sendProgress(onUpdate: AgentToolUpdateCallback | undefined, message: string): void;
/**
 * Apply truncation to full output and assemble the standard tool result.
 *
 * Handles: truncation → temp file (if needed) → `{ content, details }` return shape.
 * The `buildDetails` callback receives truncation metadata so each tool can
 * include it in its own typed details object.
 */
export declare function buildToolResult<TDetails>(fullOutput: string, ctx: ExtensionContext, toolName: string, buildDetails: (truncation: TruncationResult | undefined, fullOutputPath: string | undefined) => TDetails): Promise<{
    content: Array<{
        type: "text";
        text: string;
    }>;
    details: TDetails;
}>;
//# sourceMappingURL=execute.d.ts.map