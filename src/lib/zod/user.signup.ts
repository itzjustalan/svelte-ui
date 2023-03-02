import { z } from "zod";

export const userSignupSchema = z.object({
    username: z.string().max(255).email(),
    password: z.string().min(12).max(255),
})