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
import { productModel } from "../models/productModel";

export const cartsRouter = express.Router();

//get the active cart from the carts collection for specific user
cartsRouter.get("/", jwtValidator, async (req, res) => {
  try {
    // Get user ID from the request
    const userID = (req as ExtendedRequest).userInfo._id;
    const activeCart = await getActiveCart({ userID });

    if (activeCart && activeCart.items) {
      // Fetch each product manually and format the items
      const formattedItems = await Promise.all(
        activeCart.items.map(async (item) => {
          const product = await productModel.findById(item.item);
          if (product) {
            return {
              item: item.item,  // Keep the reference to the product ID
              title: product.title,
              image: product.image,
              price: product.price,
              stock: product.stock,
              quantity: item.quantity,
            };
          }
          return null; // In case the product is not found
        })
      );

      // Filter out any null values in case some products were not found
      const filteredItems = formattedItems.filter((item) => item !== null);

      // Format the entire cart response
      const formattedCart = {
        ...activeCart.toObject(),
        items: filteredItems,
      };

      res.status(200).send(formattedCart);
    } else {
      res.status(404).send("Active cart not found for this user.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
});


// add a product to the cart
cartsRouter.post("/", jwtValidator, async (req, res) => {
  try {
    //get the id of the current logged in  user
    const userID = (req as ExtendedRequest).userInfo._id;

    //get the  product and quantity from the req body
    const { productId, quantity } = req.body;

    //add item to the active cart
    const response = await addItemToCart({ productId, quantity, userID });

    res.status(response.status).send({ data: response.data });
  } catch (error) {
    res.status(500).send({ message: "something goes wrong !!! " });
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

    res.status(response.status).send({ data: response.data });
  } catch (error) {
    res.status(500).send({ message: "something goes wrong !!! " });
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
      res.status(response.status).send({ data: response.data });
    } else {
      //Delete an item from a cart service
      const response = await deleteCartItem({ userID, productId });
      //respond
      res.status(response.status).send({ data: response.data });
    }
  } catch (error) {
    res.status(500).send({ message: "something goes wrong !!! " });
  }
});

cartsRouter.delete("/item/", jwtValidator, async (req, res) => {
  try {
    //authenticate the user (make sure the one who wants to delete is a valid user)
    const userID = (req as ExtendedRequest).userInfo._id;
    //clear all items service
    const response = await clearCart(userID);
    res.status(response.status).send({ data: response.data });
  } catch (error) {
    res.status(500).send({ message: "something goes wrong !!! " });
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
    res.status(500).send({ message: "something goes wrong !!! " });
  }
});
