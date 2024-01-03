import { Book } from "../models/bookModel";
import { IBook } from "../schema/bookSchema";
import { Request, Response } from "express";

export const getAllBook = (req: Request, res: Response) => {
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
}

export const searchBookByTitle = (req: Request, res: Response) => {
    Book.findOne({ title: req.params.title })
        .then((data: IBook | null) => {
            if (data) {
                const imageDataURL = data.image ? `data:image/jpeg;base64,${data.image.toString('base64')}` : null;
                const responseData = {
                    title: data.title,
                    author: data.author,
                    publishYear: data.publishYear,
                    description: data.description,
                    image: imageDataURL,
                }
                res.send(responseData);
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
}

export const addBook = (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.inputTitle || !req.body.inputAuthor || !req.body.inputPublishYear) {
        return res.send({message: "Send all required fields: title, author, publishYear", valid: false});
    }

    console.log(req.file);
    const newBook = {
        title: req.body.inputTitle,
        author: req.body.inputAuthor,
        publishYear: parseInt(req.body.inputPublishYear, 10),
        description: req.body.inputDescription,
        image: req.file ? req.file.buffer : undefined,
    };

    Book.create(newBook)
        .then((book: IBook) => {
            res.send({message: `Successfully added ${book.title}`, valid: true});
            console.log(`Book is successfully created ${book}`);
        })
        .catch((error: Error) => {
            console.log(error);
            res.send({ message: "Error in server" });
        });
}

export const updateBook = (req: Request, res: Response) => {
    console.log(req.body);
    // if (!req.body.title || !req.body.author || !req.body.publishYear) {
    //     return res.send({ message: "Send all required fields: title, author, publishYear" });
    // }

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
}

export const deleteBook = (req: Request, res: Response) => {
    Book.findOneAndDelete({ title: req.params.title })
        .then((data: IBook | null) => {
            if (data) {
                res.send({ message: `Successfully Deleted ${data}`, valid: true });
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
}

