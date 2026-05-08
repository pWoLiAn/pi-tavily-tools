/**
 * Schemas for Tavily tools
 */
export declare const WebSearchParamsSchema: import("@sinclair/typebox").TObject<{
    query: import("@sinclair/typebox").TString;
    max_results: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    search_depth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"basic">, import("@sinclair/typebox").TLiteral<"advanced">]>>;
    include_answer: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    include_raw_content: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    include_images: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    days: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
}>;
export declare const WebExtractParamsSchema: import("@sinclair/typebox").TObject<{
    urls: import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>;
    extract_depth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"basic">, import("@sinclair/typebox").TLiteral<"advanced">]>>;
    include_images: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    format: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"markdown">, import("@sinclair/typebox").TLiteral<"text">]>>;
    query: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const BaseSearchParamsSchema: {
    query: import("@sinclair/typebox").TString;
    max_results: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    search_depth: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"basic">, import("@sinclair/typebox").TLiteral<"advanced">]>>;
    days: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
};
export declare const IncludeOptionsSchema: {
    include_answer: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    include_raw_content: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    include_images: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
};
//# sourceMappingURL=schemas.d.ts.map