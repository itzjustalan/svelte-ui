import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { json, type RequestHandler } from '@sveltejs/kit';
import { writeFileSync } from 'fs';

export const POST: RequestHandler = async ({ request }) => {
	const requestBody = await request.json();
	if (!requestBody.fileData || requestBody.fileData === 'data:') {
		return new Response('No file data', { status: HttpStatusCodes.BadRequest });
	}
	const { fileData, fileName } = requestBody as {
		fileData: string;
		fileName: string;
	};
	writeFileSync(`static/${fileName}`, fileData.split(',')[1], 'base64');
	return json({ success: true, message: 'File uploaded successfully' });
};
