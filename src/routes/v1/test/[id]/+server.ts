import { storageService } from '$lib/services/storage.service';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	// const stream = (await storageService.download(params.id ?? ''))?.Body?.transformToWebStream();
	const stream = await (await storageService.download(params.id ?? ''))?.Body?.transformToString();
	return new Response(stream, {
		headers: { 'content-type': 'image/png' },
		// headers: { 'content-type': 'text/event-stream' },
		// headers: { 'content-type': 'application/octet-stream' },
	});
};
