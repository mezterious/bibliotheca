import express from 'express';
import { booksController } from '../../controllers/v1/books';
import { asyncHandler } from '../../middlewares/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(booksController.createBook));

export { router as booksRouter };
