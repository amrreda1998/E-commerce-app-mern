import express from "express";
import { jwtValidator } from "../middleWares/jwtValidator";
import { ExtendedRequest } from "../types/extendedRequest";
import { getAllOrders } from "../services/orders/orderServices";

export const ordersRouter = express.Router();
ordersRouter.get("/", jwtValidator, async (req, res) => {
  try {
    // Get user ID from the request
    const userID = (req as ExtendedRequest).userInfo._id;

    const {data} = await getAllOrders(userID);
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "bad request" });
  }
});
