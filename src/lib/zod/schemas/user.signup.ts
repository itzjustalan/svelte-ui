import { z } from "zod";

export type AuthInput = z.infer<typeof authInputSchema>;
export const authInputSchema = z.object({
    username: z.string().max(255).email(),
    password: z.string().min(12).max(255),
}).strict();
// AuthSchema