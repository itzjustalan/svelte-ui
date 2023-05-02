import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { AppError } from './app.error';

export class ForbiddenRequestError extends AppError {
	constructor() {
		super('Forbidden', HttpStatusCodes.Forbidden);
	}
}
