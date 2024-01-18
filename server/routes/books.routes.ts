import express from 'express'
import * as booksController from '../controllers/books.controller.'
import { authenticate } from '../middleware/auth.middleware';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
});

router.get('/books', booksController.getAllBook);
router.post('/books/:title', booksController.searchBookByTitle);
router.post('/add-book', upload.single('image'), booksController.addBook);
router.put('/update-book/:title', booksController.updateBook);
router.delete('/delete-book/:title', booksController.deleteBook);
router.get('/book-count', booksController.addedBooksByMonth);
router.post('/add-book-user', upload.single('image'), booksController.addBookUser);
router.post('/get-book-user', booksController.getBookUser);
router.post('/book-count-user', booksController.addedBooksByMonthUser);
router.post('/books-user/:title', booksController.searchBookByTitleUser);
router.put('/update-book-user/:title', booksController.updateBookUser);

export = router;