import mongoose, { Document } from 'mongoose';
import { bookSchema, IBook } from '../schema/bookSchema';

export const Book = mongoose.model<IBook>('Book', bookSchema);