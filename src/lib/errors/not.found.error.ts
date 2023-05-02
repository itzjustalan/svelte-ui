import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { AppError } from './app.error';

export class NotFoundError extends AppError {
	constructor() {
		super('Not Found', HttpStatusCodes.NotFound);
	}
}
