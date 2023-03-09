import { RecordSchema } from "cirql";
import { z } from "zod";

// export interface User {
//   id: string,
//   username: string,
//   password: string
// }

export const User = RecordSchema.extend({
  username: z.string().max(255).email(),
  password: z.string().min(12).max(255),
});

export const Unverifieduser = RecordSchema.extend({
  id: z.string(),
  code: z.string(),
  createdAt: z.coerce.date(),
  username: z.string().max(255).email(),
  password: z.string().min(12).max(255),
});