import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const genHash = async (text: string): Promise<string> =>
  await argon2.hash(text);

export const compareHash = async (
  text: string,
  hash: string,
): Promise<boolean> => await argon2.verify(hash, text);

export const genJwt = (secret: string, expiresIn: string) =>
  jwt.sign({ role: "aamaadmi" }, secret, { expiresIn });
