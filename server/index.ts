import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Book } from './models/bookModel';
import { IBook } from './schema/bookSchema';
import { config } from 'dotenv';

config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
}))

app.get('/', (req: Request, res: Response) => {
    res.send("HELLO MONGODB");
});

app.get('/books', (req: Request, res: Response) => {
    Book.find({})
        .then((data: IBook[]) => {
            res.send(data);
            console.log("Successful");
            console.log(data);
        })
        .catch((err: Error) => {
            res.send({ message: "Error in node" });
            console.log(err);
        });
});

app.post('/books/:title', (req: Request, res: Response) => {
    Book.findOne({ title: req.params.title })
        .then((data: IBook | null) => {
            if (data) {
                res.send(data);
                console.log("Book found");
                console.log(data);
            } else {
                res.send({ message: "Book not found" });
                console.log("Book not found");
            }
        })
        .catch((err: Error) => {
            res.send({ message: "Error in node" });
            console.log(err);
        });
});

app.post('/addBook', (req: Request, res: Response) => {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.send({ message: "Send all required fields: title, author, publishYear" });
    }

    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };

    Book.create(newBook)
        .then((book: IBook) => {
            res.send(book);
            console.log(`Book is successfully created ${book}`);
        })
        .catch((error: Error) => {
            console.log(error);
            res.send({ message: "Error in server" });
        });
});

app.put('/updateBook/:title', (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.send({ message: "Send all required fields: title, author, publishYear" });
    }

    const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
    };

    Book.findOneAndUpdate({ title: req.params.title }, updatedBook, { new: true })
        .then((data: IBook | null) => {
            if (data) {
                res.send(data);
                console.log(`Updated ${req.params.title} Successfully`);
            } else {
                res.send({ message: "Book not found" });
            }
        })
        .catch((err: Error) => {
            console.log(err);
            res.send({ message: "Error in node" });
        });
});

app.delete('/deleteBook/:title', (req: Request, res: Response) => {
    Book.findOneAndDelete({ title: req.params.title })
        .then((data: IBook | null) => {
            if (data) {
                res.send({ message: `Successfully Deleted ${data}` });
                console.log("Successfully Deleted" + " " + req.params.title);
            } else {
                res.send({ message: "Book not found" });
                console.log("Book not found");
            }
        })
        .catch((err: Error) => {
            console.log(err);
            res.send({ message: "Error in node" });
        });
});

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
        console.log('Connected Successfully to the database');

        app.listen(port, () => {
            console.log(`App is listening to port ${port}`);
        });
    })
    .catch((err: Error) => {
        console.error(err);
    });

