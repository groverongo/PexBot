import { z } from "zod";

export const TranscriptionResponseSchema = z.object({
    transcript: z.string(),
});

export type TranscriptionResponseType = z.infer<typeof TranscriptionResponseSchema>;