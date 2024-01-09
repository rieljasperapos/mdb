import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import booksRoutes from "./routes/booksRoute"
import { db } from './db/dbconnect';

config();
db();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"]
}))

app.get('/', (req: Request, res: Response) => {
  res.send("HELLO MONGODB");
});

app.use(booksRoutes);

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

