import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import booksRoutes from "./routes/booksRoute"
import { db } from './db/dbconnect';
import userRoutes from './routes/userRoute'
import authRoutes from './routes/authenticateRoute'
import cookieParser from 'cookie-parser'

config();
db();
const port = process.env.PORT;
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

app.get('/', (req: Request, res: Response) => {
  res.send("HELLO MONGODB");
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

