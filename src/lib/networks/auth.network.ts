import { type AuthData, authSchema } from "$lib/zod/schemas/user.signup";
import type { User } from "$lib/zod/models/user.model";
import defaultApi from "./apis";

interface AuthResponse {
  user: User;
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
}

class AuthNetwork {
  signin = async (data: AuthData): Promise<AuthResponse> =>
    (await defaultApi.post("v1/api/auth/signin", authSchema.parse(data))).data;

//   async signin(data: AuthData): Promise<AuthResponse> {
//     authSchema.parse(data);
//     return (await defaultApi.post<AuthResponse>("v1/api/auth/signin", data))
//       .data;
//   }
}

export const authNetwork = new AuthNetwork();
