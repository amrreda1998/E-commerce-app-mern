import express, { json } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter";

// create the express server app
const app = express();
// defining the port
const port = process.env.PORT || 3001;

// using mongoose to conncet to mongodb database
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Connected successfully to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

//use middle ware to parse json reqs body
app.use(express.json());
// use a router to handle/recieve reqs with specific urls for specific enitity
app.use("/users", userRouter);

// make the server listen on port
app.listen(port, () => {
  console.log(`Server is Listening on port ${port} .....`);
});
