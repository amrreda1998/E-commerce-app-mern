import express, { json } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter";
import { seedInitialProdcuts } from "./services/products/productsServices";
import { productsRouter } from "./routers/productsRouter";
import { cartsRouter } from "./routers/cartRouter";
import { jwtValidator } from "./middleWares/jwtValidator";

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

//seed products in the database
seedInitialProdcuts();


//use awtAuthentacation custom middle ware 
// app.use(jwtValidator);


//use middle ware to parse json reqs body
app.use(express.json());
// use a router to handle/recieve reqs with specific urls for users
app.use("/users", userRouter);

// use a router to handle/recieve reqs with specific urls for products
app.use("/products", productsRouter);


app.use("/carts", cartsRouter);


// make the server listen on port
app.listen(port, () => {
  console.log(`Server is Listening on port ${port} .....`);
});
