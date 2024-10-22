//get all products

import { productModel } from "../../models/productModel";

export const getAllProducts = async () => {
  const allProducts = await productModel.find();
  return allProducts;
};

export const seedInitialProdcuts = async () => {
  try {
    const exitingProducts = await getAllProducts();

    const products = [
      { title: "testing product", image: "image.png", price: 40, stock: 3 },
    ];

    if (exitingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error("Cannot connect to the database \n", error);
  }
};
