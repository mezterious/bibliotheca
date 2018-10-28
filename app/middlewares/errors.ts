import { ValidationError } from './validator';
import { Request, Response, NextFunction } from 'express';
import boom from 'boom';

export function handleValidationError(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ValidationError) {
    boom.boomify(error);
    res.status(error.statusCode).json({
      error: {
        name: 'validation_error',
        message: error.message,
        data: error.data,
      },
    });
  }

  next(error);
  return;
}
