import { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
};

export const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);