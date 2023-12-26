import { Schema, Document } from 'mongoose';

export const bookSchema: Schema<IBook> = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

interface IBook extends Document {
    title: string;
    author: string;
    publishYear: number;
}