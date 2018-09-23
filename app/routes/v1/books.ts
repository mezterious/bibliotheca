import express from 'express';

const router = express.Router();

router.post('/', (_, res) => {
  res.json({
    message: 'route: /v1/books',
  });
});

export { router as booksRouter };
