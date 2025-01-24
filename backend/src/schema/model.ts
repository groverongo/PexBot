import { z } from "zod";

export const ModelResponseSchema = z.object({
    response: z.string(),
});

export type ModelResponseType = z.infer<typeof ModelResponseSchema>;