import { HttpStatusCodes } from '$lib/utils/httpStatusCodes';
import { AppError } from './app.error';

export class BadRequestError extends AppError {
	constructor(message?: string, statusCode?: HttpStatusCodes) {
		message ??= 'Bad request';
		statusCode ??= HttpStatusCodes.BadRequest;
		super(message, statusCode);
	}
	//   constructor({
	//     message,
	//     statusCode = HttpStatusCodes.BadRequest,
	//   }: {message: string, statusCode: HttpStatusCodes}) {
	//     super(message, statusCode);
	//   }
}
