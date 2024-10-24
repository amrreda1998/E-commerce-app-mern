import express, { json } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter";
import { seedInitialProdcuts } from "./services/products/productsServices";
import { productsRouter } from "./routers/productsRouter";
import { cartsRouter } from "./routers/cartRouter";
import "dotenv/config";
import cors from "cors";

// create the express server app
const app = express();
// defining the port
const port = process.env.PORT || 3001;

// using mongoose to conncet to mongodb database
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected successfully to mongodb");
  })
  .catch((err) => {
    console.log("Failed to connect to the database !!", err);
  });

//seed products in the database
seedInitialProdcuts();

//use middle wate to determine the domains that can request data from the backend
app.use(cors());
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
