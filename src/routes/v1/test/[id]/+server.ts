import { InternalServerError } from '$lib/errors';
import { storageService } from '$lib/services/storage.service';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.id) return new InternalServerError().respond();
	const response = await storageService.download(params.id);
	const buffer = await response?.Body?.transformToByteArray();
	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'application/octet-stream',
			'Content-Disposition':
				// Use filename* instead of filename to support non-ASCII characters
				`attachment; filename*=UTF-8''${encodeURIComponent(params.id)}`,
		},
	});
};
