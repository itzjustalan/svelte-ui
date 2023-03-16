import type { HttpStatusCodes } from "$lib/utils/httpStatusCodes";

export class AppError extends Error {
    public readonly statusCode: HttpStatusCodes;
    constructor(
        message: string,
        statusCode: HttpStatusCodes,
    ) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }

    respond = (): Response => new Response(this.message, { status: this.statusCode });
}