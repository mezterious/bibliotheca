import { Request, Response, NextFunction } from 'express';

async function createBook(
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<any> {
  console.log('Creating a book');
  // console.log(req);
  // console.log(res);
  // console.log(next);

  res.json({
    message: 'route: /v1/books',
  });
}

const booksController = {
  createBook,
};

export { booksController };
