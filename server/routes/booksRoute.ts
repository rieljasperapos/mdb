import express from 'express'
import * as booksController from '../controllers/booksController'
const router = express.Router();

router.get('/books', booksController.getAllBook);
router.post('/books/:title', booksController.searchBookByTitle);
router.post('/addBook', booksController.addBook);
router.put('/updateBook/:title', booksController.updateBook);
router.delete('/deleteBook/:title', booksController.deleteBook);

export = router;