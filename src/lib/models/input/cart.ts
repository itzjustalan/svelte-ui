import { z } from "zod";

export type CartUpdateInput = z.infer<typeof cartUpdateInputSchema>;
export const cartUpdateInputSchema = z.object({
    add: z.string().optional(),
    remove: z.string().optional(),
}).strict();