import boom from 'boom';
import { Request, Response, NextFunction } from 'express';

const asyncHandler = (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  Promise.resolve(fn(req, res, next)).catch((error: any) => {
    if (!error.isBoom) {
      return next(boom.badImplementation(error));
    }
    next(error);
  });
};

export { asyncHandler };
