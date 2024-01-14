import express from 'express'
import * as booksController from '../controllers/books.controller.'
import { authenticate } from '../middleware/auth.middleware';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get('/books', authenticate, booksController.getAllBook);
router.post('/books/:title', booksController.searchBookByTitle);
router.post('/add-book', upload.single('image'), authenticate, booksController.addBook);
router.put('/update-book/:title', booksController.updateBook);
router.delete('/delete-book/:title', booksController.deleteBook);
router.get('/book-count', booksController.addedBooksByMonth);

export = router;