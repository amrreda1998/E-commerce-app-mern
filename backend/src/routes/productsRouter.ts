import express from "express";
import { getAllProducts } from "../services/products/productsServices";
import { productModel } from "../models/productModel";

export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    res.status(200).send({ data: allProducts });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "bad request" });
  }
});

productsRouter.get("/item/:id", async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      res.status(400).send({ message: "bad request" });
    }
    res.status(200).send({ data: product });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: "bad request" });
  }
});
