import { IUser } from "../schema/userSchema";
import { User } from "../models/userModel";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { config } from 'dotenv';

interface CustomRequest extends Request {
  user?: any
};

config();

export const getUsers = (req: Request, res: Response) => {
  console.log(req);
  User.find({})
    .then((data: IUser[]) => {
      res.send(data);
      console.log(data);
    })
    .catch((err: Error) => {
      console.error(err);
    })
}

export const loginUser = (req: Request, res: Response) => {
  // TODO: Compare encrypted password, JWT Sign
  if (!req.body.email || !req.body.password) {
    return res.send({
      message: "Please fill out all the missing fields",
      status: false
    });
  }

  User.findOne({
    email: req.body.email
  })
  .then((data: IUser | null) => {
    if (data) {
      console.log("DATA: ", data.password);
      bcrypt.compare(req.body.password, data.password as string, (err, isPasswordMatched) => {
        if (isPasswordMatched) {
          const user = {
            name: data.name,
            email: data.email
          }
          // TO DO: JWT Sign
          const token = jwt.sign({ user }, process.env.SECRET_KEY as string, {expiresIn: '1h'});
          console.log(token);
          res.cookie('accessToken', token, {maxAge: 3600000, httpOnly: true})
          res.send({
            message: "Successfully logged in",
            status: true
          });
        }
      })
    } else {
      res.send({
        message: "Account not found",
        status: false
      });
    }
  })
  .catch((err: Error) => {
    res.send({
      message: `Error ${err}`,
      status: false
    });
  })
}

export const registerUser = (req: Request, res: Response) => {
  // TODO: Hash password, validations
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      return res.send({ message: "Error hashing the password " });
    }

    bcrypt.compare(req.body.confirmPassword, hashedPassword, (err, isPasswordMatched ) => {
      if (isPasswordMatched) {
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
      } else {
        res.send({
          message: "Password did not match",
          status: false
        });
      }
    })
  });
}

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log("AUTHENTICATE COOKIE: ", req.cookies.accessToken);
  console.log(req.cookies);
  const authToken = req.cookies.accessToken;

  if (!authToken) {
    res.send({
      message: "Unauthorized Access"
    });
  } else {
    jwt.verify(authToken, process.env.SECRET_KEY as string, (err: VerifyErrors | null, data: any) => {
      if (err) {
        res.send({
          message: "Invalid Token",
          status: false
        });
      } else {
        req.user = data;
        next();
      }
    })
  }
}