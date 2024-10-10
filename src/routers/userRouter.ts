import { userModel } from "../models/userModel";
import express from "express";
import { login, register } from "../services/users/usersServices";

export const userRouter = express.Router();

//User APIS

//Register new user
userRouter.post("/register", async (req, res) => {
  try {
    //create and save a new user document from the req body using userModel.
    const { statusCode, data } = await register(req.body);
    //respond to the front end with status code and data that is created in the database
    res.status(statusCode).send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error saving new data");
  }
});

//login a user
userRouter.post("/login", async (req, res) => {
  try {
    //use login service
    const { data, statusCode } = await login(req.body);
    //respond to the front end with status code and data
    res.status(statusCode).send(data);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error saving new data");
  }
});



//update
userRouter.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error occured while updating ");
  }
});

//delete
userRouter.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(`user: ${deletedUser} \n has been deleted`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occured while Deleting ");
  }
});
