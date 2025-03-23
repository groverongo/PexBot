import { z } from "zod";

export const TranscriptionResponseSchema = z.object({
    response: z.object({
        text: z.string(),
        chunks: z.array(z.object({
            timestamp: z.tuple([z.number(), z.number()]),
            text: z.string()
        }))
    })
});

export type TranscriptionResponseType = z.infer<typeof TranscriptionResponseSchema>;