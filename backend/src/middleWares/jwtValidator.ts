import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendedRequest } from "../types/extendedRequest";

export const jwtValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    res.status(403).send("Authorization header is not provided");
    return;
  }
  //get the token form the header
  const token = authorizationHeader.split(" ")[1];
  //verify token existence
  if (!token) {
    res.status(403).send("Token is not provided");
    return;
  }
  //validate the token provided in the auth header
  Jwt.verify(
    token,
    process.env.JWT_SECRET||"",
    async (err, payload) => {
      if (err) {
        res.status(403).send("invalid token");
        return;
      }
      //verify payload existence
      if (!payload) {
        res.status(403).send("invalid payload");
        return;
      }
      //define the type of a user payload
      const IuserPayLoad = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      try {
        //get the user info from the users collection
        const userInfo = await userModel.findOne({ email: IuserPayLoad.email });
        //update the revieved request so that we can extract user info from it
        (req as ExtendedRequest).userInfo = userInfo;
      } catch (error) {
        res.status(500).send("something goes wrong !!! ");
      }
      next();
    }
  );
};
