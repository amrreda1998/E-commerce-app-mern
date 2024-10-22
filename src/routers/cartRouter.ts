import express from "express";
import {
  addItemToCart,
  getActiveCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  checkOut,
} from "../services/cart/cartServices";
import { jwtValidator } from "../middleWares/jwtValidator";
import { ExtendedRequest } from "../types/extendedRequest";

export const cartsRouter = express.Router();

//get the active cart from the carts collection for specific user
cartsRouter.get("/", jwtValidator, async (req, res) => {
  try {
    //get user id from the req
    const userID = (req as ExtendedRequest).userInfo._id;
    const activeCart = await getActiveCart(userID);
    res.status(200).send(activeCart);
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});

// add a product to the cart
cartsRouter.post("/item", jwtValidator, async (req, res) => {
  try {
    //get the id of the current logged in  user
    const userID = (req as ExtendedRequest).userInfo._id;

    //get the  product and quantity from the req body
    const { productId, quantity } = req.body;

    //add item to the active cart
    const response = await addItemToCart({ productId, quantity, userID });

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});

//update a product quantity in the cart

cartsRouter.put("/item", jwtValidator, async (req, res) => {
  try {
    //do authentication
    //get the id of the current logged in  user
    const userID = (req as ExtendedRequest).userInfo._id;

    //get the  product and quantity from the req body
    const { productId, newQuantity } = req.body;

    //update the item in  the active cart
    const response = await updateCartItem({ productId, newQuantity, userID });

    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});

//Delete an item in the active cart

cartsRouter.delete("/item/:id", jwtValidator, async (req, res) => {
  try {
    //authenticate the user (make sure the one who wants to delete is a valid user)
    const userID = (req as ExtendedRequest).userInfo._id;
    //get product id
    const productId = req.params.id;

    //clear the cart if the user sent "all" in the url
    if (productId === "all") {
      //clear all items service
      const response = await clearCart(userID);
      res.status(response.status).send(response.data);
    } else {
      //Delete an item from a cart service
      const response = await deleteCartItem({ userID, productId });
      //respond
      res.status(response.status).send(response.data);
    }
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});

cartsRouter.delete("/item/", jwtValidator, async (req, res) => {
  try {
    //authenticate the user (make sure the one who wants to delete is a valid user)
    const userID = (req as ExtendedRequest).userInfo._id;
    //clear all items service
    const response = await clearCart(userID);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});

cartsRouter.post("/checkout", jwtValidator, async (req, res) => {
  try {
    //authenticate the user (make sure the one who wants to delete is a valid user)
    const userID = (req as ExtendedRequest).userInfo._id;
    //get the address from the req body
    const { address } = req.body;
    //checkout process
    const checkOutResponse = await checkOut(userID, address);
    res.status(checkOutResponse.status).send(checkOutResponse.data);
  } catch (error) {
    res.status(500).send("something goes wrong !!! ");
  }
});
