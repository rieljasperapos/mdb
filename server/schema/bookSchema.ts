import { Schema } from 'mongoose';

export interface IBook {
    title: string;
    author: string;
    publishYear: number;
}

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
