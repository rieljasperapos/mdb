import { Book } from "../models/book.models";
import { IBook } from "../schema/book.schema";
import { Request, Response } from "express";


export const getAllBook = (req: Request, res: Response) => {
  Book.find({})
    .then((data: IBook[]) => {
      res.send(data);
    })
    .catch((err: Error) => {
      res.send({ message: `Error ${err}` });
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
      } else {
        res.send({ message: "Book not found" });
      }
    })
    .catch((err: Error) => {
      res.send({ message: `Error ${err}` });
    });
}

export const addBook = (req: Request, res: Response) => {
  if (!req.body.inputTitle || !req.body.inputAuthor || !req.body.inputPublishYear) {
    return res.send({ message: "Please fill out missing fields.", valid: false });
  }

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
    })
    .catch((err: Error) => {
      res.send({ message: `Error ${err}` });
    });
}

export const updateBook = (req: Request, res: Response) => {
  const updatedBook = {
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  };

  Book.findOneAndUpdate({ title: req.params.title }, updatedBook, { new: true })
    .then((data: IBook | null) => {
      if (data) {
        res.send({ message: `Updated ${data.title} successfully` });
      } else {
        res.send({ message: "Book not found" });
      }
    })
    .catch((err: Error) => {
      res.send({ message: `Error ${err}` });
    });
}

export const deleteBook = (req: Request, res: Response) => {
  Book.findOneAndDelete({ title: req.params.title })
    .then((data: IBook | null) => {
      if (data) {
        res.send({ message: `Successfully Deleted ${data.title}`, valid: true });
      } else {
        res.send({ message: "Book not found" });
      }
    })
    .catch((err: Error) => {
      res.send({ message: `Error ${err}` });
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

