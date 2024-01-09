import { IUser } from "../schema/userSchema";
import { User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((data: IUser[]) => {
      res.send(data);
      console.log(data);
    })
    .catch((err: Error) => {
      console.error(err);
    })
}

export const addUser = (req: Request, res: Response) => {
  // TODO: Hash password, validations
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.send({ message: "Error hasing the password " });
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };

    User.findOne({ email: newUser.email })
      .then((existingUser: IUser | null) => {
        if (existingUser) {
          console.log(existingUser);
          res.send({
            message: "Email already exist",
            status: false
          })
        } else {
          User.create(newUser)
            .then((data: IUser) => {
              console.log(data);
              res.send({
                message: "Successfully added user",
                status: true
              });
            })
            .catch((err: Error) => {
              res.send({
                message: `Error ${err}`,
                status: false
              })
            })
        }
      })
      .catch((err: Error) => {
        res.send({ message: `Error ${err}`, status: false })
      })
  });
}