import { RecordSchema } from "cirql";
import { z } from "zod";

// export interface User {
//   id: string,
//   username: string,
//   password: string
// }

export type User = z.infer<typeof userSchema>;
export const userSchema = RecordSchema.extend({
  username: z.string().max(255).email(),
  password: z.string().min(12).max(255),
}).strict();

export type Unverifieduser = z.infer<typeof unverifieduserSchema>;
export const unverifieduserSchema = RecordSchema.extend({
  id: z.string(),
  code: z.string(),
  createdAt: z.coerce.date(),
  username: z.string().max(255).email(),
  password: z.string().min(12).max(255),
}).strict();