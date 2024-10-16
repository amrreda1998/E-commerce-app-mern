import express from "express";
import { getActiveCart } from "../services/cart/cartServices";
import { ExtendedRequest, jwtValidator } from "../middleWares/jwtValidator";
import { productModel } from "../models/productModel";
import { ICartItem } from "../models/cartModel";

export const cartsRouter = express.Router();

//get the active cart from the carts collection for specific user
cartsRouter.get("/", jwtValidator, async (req, res) => {
  //get user id from the req
  const userID = (req as ExtendedRequest).userInfo._id;
  const activeCart = await getActiveCart(userID);
  res.status(200).send(activeCart);
});

// add a product to the cart

// cartsRouter.post("/:newCartProductID", jwtValidator, async (req, res) => {
//   //get the id of the current logged in  user
//   const userID = (req as ExtendedRequest).userInfo._id;
//   //get the current active cart
//   const activeCart = await getActiveCart(userID);

//   //get the id of the product user wants to add
//   const newCartProductID = req.params.newCartProductID;
//   //get the product form the database
//   const product = await productModel.findById(newCartProductID);
//   if (!product) {
//     res.status(404).send("this product does not exist in the database");
//   } else {
//     //define a new cart item from the product object we got
//     const cartItem: ICartItem = {
//       item: product,
//       unitPrice: product.price,
//       _id: newCartProductID,
//       quantity:1
//     };

//     //add item to the active cart collection
//     activeCart.items.push();

//     res.status(200).send(activeCart);
//   }
// });
