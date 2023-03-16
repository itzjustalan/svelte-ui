import { type AuthData, authSchema } from "$lib/zod/schemas/user.signup";
import type { User } from "$lib/zod/models/user.model";
import defaultApi from "./apis";
import { decodeJwt } from "$lib/utils";

interface AuthResponse {
  user: User;
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
}

class AuthNetwork {
  accessTimeout: NodeJS.Timeout | undefined;

  // refresh = async () => await defaultApi.get('v1/api/auth/refresh');
  // signin = async (data: AuthData): Promise<AuthResponse> =>
  //   (await defaultApi.post("v1/api/auth/signin", authSchema.parse(data))).data;

  signout = () => clearInterval(this.accessTimeout);

  signin = async (data: AuthData): Promise<AuthResponse> => {
    authSchema.parse(data);
    const res = await defaultApi.post<AuthResponse>("v1/api/auth/signin", data);
    this.autoRefresh(res.data.jwt.accessToken);
    return res.data;
  };

  refresh = async (): Promise<AuthResponse> => {
    const response = await defaultApi.get<AuthResponse>("v1/api/auth/refresh");
    this.autoRefresh(response.data.jwt.accessToken);
    return response.data;
  };

  autoRefresh = (accessToken: string) => {
    const decodedToken = decodeJwt(accessToken);
    clearTimeout(this.accessTimeout);
    this.accessTimeout = setTimeout(
      this.refresh,
      (decodedToken.exp - decodedToken.iat) * 1000,
    );
  }
}

export const authNetwork = new AuthNetwork();