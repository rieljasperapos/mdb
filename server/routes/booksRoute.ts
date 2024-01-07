import express from 'express'
import * as booksController from '../controllers/booksController'
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
});

router.get('/books', booksController.getAllBook);
router.post('/books/:title', booksController.searchBookByTitle);
router.post('/addBook', upload.single('image'), booksController.addBook);
router.put('/updateBook/:title', booksController.updateBook);
router.delete('/deleteBook/:title', booksController.deleteBook);
router.get('/bookCount', booksController.addedBooksByMonth);

export = router;