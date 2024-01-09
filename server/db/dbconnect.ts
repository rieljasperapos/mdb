import mongoose from "mongoose";
import { config } from 'dotenv';

config();

export const db = () => {
  mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log('Connected Successfully to the database');
  })
  .catch((err: Error) => {
    console.error(err);
  });
}