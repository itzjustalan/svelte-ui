import { log } from '$lib/logger';
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async (input) => {
	log.error('hooks.client.ts', input);
	return Error('client error');
};
