import mongoose, { Document, Schema } from 'mongoose';
import { bookSchema } from '../schema/bookSchema';

export interface IBook extends Document {
    title: string;
    author: string;
    publishYear: number;
}

export const Book = mongoose.model<IBook>('Book', bookSchema);