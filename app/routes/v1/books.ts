import express from 'express';
import { booksController } from '../../controllers/v1/books';

const router = express.Router();

router.post('/', booksController.createBook);

export { router as booksRouter };
