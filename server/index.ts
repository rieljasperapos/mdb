import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
<<<<<<< HEAD
import booksRoutes from "./routes/booksRoute"
import { db } from './db/dbconnect';
=======
import booksRoutes from './routes/booksRoute'
import userRoutes from './routes/userRoute'
>>>>>>> 1f6ea3d63467dfab6d9cbfd4516ccb4aea018d0f

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
app.use(userRoutes);


app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});

