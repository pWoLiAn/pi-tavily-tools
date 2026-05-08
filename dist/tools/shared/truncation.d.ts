/**
 * Shared truncation utilities
 */
import { type TruncationResult } from "@earendil-works/pi-coding-agent";
export interface TruncatedOutput {
    content: string;
    truncation?: TruncationResult;
    fullOutputPath?: string;
}
/**
 * Get the temp directory path used for storing truncated output files.
 */
export declare function getTempDir(cwd: string): string;
/**
 * Remove the temp directory and all its contents.
 */
export declare function cleanupTempDir(cwd: string): Promise<void>;
/**
 * Apply truncation to output and save full content to temp file if needed
 */
export declare function applyTruncation(fullOutput: string, cwd: string, toolName: string): Promise<TruncatedOutput>;
//# sourceMappingURL=truncation.d.ts.map