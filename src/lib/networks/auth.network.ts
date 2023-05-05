import { type AuthInput, authInputSchema } from '$lib/models/input/user';
import defaultApi from './apis';
import type { AuthResponse } from '$lib/stores/auth';



class AuthNetwork {
	accessTimeout: NodeJS.Timeout | undefined;

	// refresh = async () => await defaultApi.get('v1/api/auth/refresh');
	// signin = async (data: AuthData): Promise<AuthResponse> =>
	//   (await defaultApi.post("v1/api/auth/signin", authSchema.parse(data))).data;

	signout = () => clearInterval(this.accessTimeout);

	signup = async (data: AuthInput) => {
		authInputSchema.parse(data);
		await defaultApi.post('v1/api/auth/signup', data);
	};

	signin = async (data: AuthInput): Promise<AuthResponse> => {
		authInputSchema.parse(data);
		const res = await defaultApi.post<AuthResponse>('v1/api/auth/signin', data);
		// this.autoRefresh(res.data.jwt.accessToken);
		return res.data;
	};

	refresh = async (): Promise<AuthResponse> => {
		const response = await defaultApi.get<AuthResponse>('v1/api/auth/refresh');
		// this.autoRefresh(response.data.jwt.accessToken);
		return response.data;
	};

	// autoRefresh = (accessToken: string) => {
	// 	const decodedToken = decodeJwt(accessToken);
	// 	clearTimeout(this.accessTimeout);
	// 	this.accessTimeout = setTimeout(this.refresh, (decodedToken.exp - decodedToken.iat) * 1000);
	// };
}

export const authNetwork = new AuthNetwork();
