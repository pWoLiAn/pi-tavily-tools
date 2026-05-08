/**
 * Shared execute helpers for Tavily tools
 *
 * Provides reusable utilities for the common phases of tool execution:
 * - Progress updates (onUpdate)
 * - Truncation + result assembly
 */
import { applyTruncation } from "./truncation.js";
// ============================================================================
// Abort Signal
// ============================================================================
/**
 * Race a promise against an AbortSignal.
 * The SDK doesn't natively support signal, so we wrap the call.
 * The underlying HTTP request still completes on Tavily's side,
 * but the tool call rejects immediately on cancellation.
 */
export function raceAbort(promise, signal) {
    if (!signal)
        return promise;
    if (signal.aborted)
        return Promise.reject(new Error("Tool call aborted"));
    return new Promise((resolve, reject) => {
        const onAbort = () => reject(new Error("Tool call aborted"));
        signal.addEventListener("abort", onAbort, { once: true });
        promise.then((value) => {
            signal.removeEventListener("abort", onAbort);
            resolve(value);
        }, (error) => {
            signal.removeEventListener("abort", onAbort);
            reject(error instanceof Error ? error : new Error(String(error)));
        });
    });
}
// ============================================================================
// Error Sanitization
// ============================================================================
/**
 * Sanitize a provider error before surfacing it.
 * Strips Tavily API keys and auth header values from error messages
 * to prevent credential leakage in tool output or logs.
 */
export function sanitizeError(error) {
    const message = error instanceof Error ? error.message : String(error);
    const sanitized = message
        .replace(/tvly-[a-zA-Z0-9_-]+/gi, "[REDACTED]")
        .replace(/(authorization|x-api-key)[^\n]*/gi, "$1: [REDACTED]");
    return new Error(sanitized);
}
// ============================================================================
// Progress Update
// ============================================================================
/**
 * Send a progress update to the TUI during tool execution.
 * Wraps the common `onUpdate?.({ content: [...], details: {} })` pattern.
 */
export function sendProgress(onUpdate, message) {
    onUpdate?.({
        content: [{ type: "text", text: message }],
        details: {},
    });
}
// ============================================================================
// Tool Result Assembly
// ============================================================================
/**
 * Apply truncation to full output and assemble the standard tool result.
 *
 * Handles: truncation → temp file (if needed) → `{ content, details }` return shape.
 * The `buildDetails` callback receives truncation metadata so each tool can
 * include it in its own typed details object.
 */
export async function buildToolResult(fullOutput, ctx, toolName, buildDetails) {
    const { content, truncation, fullOutputPath } = await applyTruncation(fullOutput, ctx.cwd, toolName);
    return {
        content: [{ type: "text", text: content }],
        details: buildDetails(truncation, fullOutputPath),
    };
}
//# sourceMappingURL=execute.js.map