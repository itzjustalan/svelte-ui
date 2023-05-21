import { json, type RequestHandler } from '@sveltejs/kit';
import { storageService } from '$lib/services/storage.service';
import { extFromName } from '$lib/utils';
import { randomFileName } from '$lib/utils/extra';
import { InternalServerError } from '$lib/errors';
// import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
// import { json, type RequestHandler } from '@sveltejs/kit';
// import { writeFileSync } from 'fs';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File | null;
	if (!file) return new Response('file not found!');
	const bytes = new Uint8Array(await file.arrayBuffer());
	const fileName = randomFileName(extFromName(file.name));
	const upres = await storageService.upload(fileName, bytes);
	if (upres?.$metadata.httpStatusCode === 200) return json({ fileName });
	return new InternalServerError('error uploading file').respond();
};
