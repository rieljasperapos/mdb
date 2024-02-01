import mongoose from "mongoose"

export const connect = () => {
  console.log(process.env.MONGODB_URL);
  mongoose.connect(process.env.MONGODB_URL as string)
  .then(() => {
    console.log("Successfully Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  })
}