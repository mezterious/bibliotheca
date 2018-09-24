import { Request, Response, NextFunction } from 'express';

async function createBook(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  console.log('Creating a book');
  console.log(req);
  console.log(res);
  console.log(next);

  res.json({
    message: 'route: /v1/books',
  });
}

const booksController = {
  createBook,
};

export { booksController };
