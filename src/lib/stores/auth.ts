import { browser } from '$app/environment';
import { log } from '$lib/logger';
import type { UserModel } from '$lib/models/db/user.model';
import { authNetwork } from '$lib/networks/auth.network';
import { decodeJwt } from '$lib/utils';
import { writable } from 'svelte/store';

export interface AuthResponse {
	user: UserModel;
	jwt: {
		accessToken: string;
		refreshToken: string;
	};
}

let accessTimeout: NodeJS.Timeout | undefined;

const autoRefresh = (accessToken: string) => {
	const decodedToken = decodeJwt(accessToken);
	clearTimeout(accessTimeout);
	accessTimeout = setTimeout(async () => {
		try {
			auth.set(await authNetwork.refresh());
		} catch (e) {
			log.error('error refreshing tokens in auth.ts');
		}
		// }, 2000);
	}, (decodedToken.exp - decodedToken.iat) * 1000);
};

const init = (): AuthResponse | undefined =>
	browser ? JSON.parse(localStorage.getItem('auth_store') ?? 'null') ?? undefined : undefined;

function createStore() {
	const { subscribe, set, update } = writable<AuthResponse | undefined>(init());

	return {
		set,
		subscribe,
		signout: () => {
			authNetwork
				.signout()
				.then(() => {
					set(undefined);
					clearTimeout(accessTimeout);
					localStorage.removeItem('auth_store');
				})
				.catch(log.error);
		},
	};
}

export const auth = createStore();

auth.subscribe((res) => {
	if (!res?.jwt.accessToken) return;
	autoRefresh(res?.jwt.accessToken);
	if (browser) localStorage.setItem('auth_store', JSON.stringify(res ?? 'null'));
});
