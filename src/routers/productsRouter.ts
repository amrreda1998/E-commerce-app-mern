import express from "express";
import { getAllProducts } from "../services/products/productsServices";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    console.error(error);
    res.status(400).send("bad request");
  }
});
    