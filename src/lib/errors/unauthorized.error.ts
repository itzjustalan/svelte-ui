import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { AppError } from './app.error';

export class UnauthorizedError extends AppError {
	constructor() {
		super('Unauthorized', HttpStatusCodes.Unauthorized);
	}
}
