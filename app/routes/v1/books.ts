import express from 'express';
import { booksController } from '../../controllers/v1/books';
import { asyncHandler } from '../../middlewares/asyncHandler';
import { validator } from '../../middlewares/validator';

const router = express.Router();

router.post(
  '/',
  asyncHandler(validator.validate('post', '/books')),
  asyncHandler(booksController.createBook),
);

export { router as booksRouter };
