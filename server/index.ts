import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './util/config.util';
import booksRoutes from "./routes/books.routes"
import { db } from './db/dbconnect';
import userRoutes from './routes/user.routes'
import authRoutes from './routes/authenticate.routes'
import cookieParser from 'cookie-parser'

db();
const port = config.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));

app.use(userRoutes);
app.use(authRoutes);
app.use(booksRoutes);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

