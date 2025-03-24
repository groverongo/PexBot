import { z } from "zod";

export const SimilarityResponseSchema = z.object({
    response: z.record(z.string(), z.number())
});

export type SimilarityResponseType = z.infer<typeof SimilarityResponseSchema>;