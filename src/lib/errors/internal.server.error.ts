import { HttpStatusCodes } from "$lib/utils/httpStatusCodes";
import { AppError } from "./app.error";

export class InternalServerError extends AppError {
  constructor(
    message?: string,
    statusCode?: HttpStatusCodes,
  ) {
    message ??= "Internal Server Error";
    statusCode ??= HttpStatusCodes.InternalServerError;
    super(message, statusCode);
  }
}
