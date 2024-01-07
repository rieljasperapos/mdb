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
        return res.send({ message: "Please fill out missing fields.", valid: false });
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
            res.send({ message: `Successfully added ${book.title}`, valid: true });
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
                res.send({message: `Updated ${data.title} successfully`});
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
                res.send({ message: `Successfully Deleted ${data.title}`, valid: true });
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

export const addedBooksByMonth = (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    Book.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
                    $lt: new Date(`${currentYear + 1}-01-01T00:00:00.000Z`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                bookCount: { $sum: 1 }
            }
        }
    ])
    .then(result => {
        const booksByMonth = months.map((month, index) => ({
            month,
            bookCount: result.find((item) => item._id === index + 1)?.bookCount || 0
        }));

        res.send({ booksByMonth });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    });
};

