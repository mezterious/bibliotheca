import { Request, Response, NextFunction } from 'express';

function createBook(req: Request, res: Response, next: NextFunction): any {
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
