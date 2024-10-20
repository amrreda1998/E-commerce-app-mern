import express from "express";
import {
  addItemToCart,
  getActiveCart,
  updateCartItem,
} from "../services/cart/cartServices";
import { jwtValidator } from "../middleWares/jwtValidator";
import { ExtendedRequest } from "../types/ExtendedRequest";

export const cartsRouter = express.Router();

//get the active cart from the carts collection for specific user
cartsRouter.get("/", jwtValidator, async (req, res) => {
  //get user id from the req
  const userID = (req as ExtendedRequest).userInfo._id;
  const activeCart = await getActiveCart(userID);
  res.status(200).send(activeCart);
});

// add a product to the cart

cartsRouter.post("/item", jwtValidator, async (req, res) => {
  //get the id of the current logged in  user
  const userID = (req as ExtendedRequest).userInfo._id;

  //get the  product and quantity from the req body
  const { productId, quantity } = req.body;

  //add item to the active cart
  const response = await addItemToCart({ productId, quantity, userID });

  res.status(response.status).send(response.data);
});

//ToDO:!!!!!!!!!!
//update a product quantity in the cart

cartsRouter.put("/item", jwtValidator, async (req, res) => {
  //do authentication
  //get the id of the current logged in  user
  const userID = (req as ExtendedRequest).userInfo._id;

  //get the  product and quantity from the req body
  const { productId, newQuantity } = req.body;

  //update the item in  the active cart
  const response = await updateCartItem({ productId, newQuantity, userID });

  res.status(response.status).send(response.data);
});
