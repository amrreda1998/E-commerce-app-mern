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
      {
        title: "HP laptop",
        image:
          "https://i5.walmartimages.com/seo/HP-Stream-14-Laptop-Intel-Celeron-N4000-4GB-SDRAM-32GB-eMMC-Office-365-1-yr-Royal-Blue_4f941fe6-0cf3-42af-a06c-7532138492fc_2.cb8e85270e731cb1ef85d431e49f0bf2.jpeg",
        price: 15000,
        stock: 10,
      },
      {
        title: "Lenevo laptop",
        image:
          "https://m.media-amazon.com/images/I/71RVRfwvMzL._AC_SL1500_.jpg",
        price: 20000,
        stock: 10,
      },
      {
        title: "Asus laptop",
        image:
          "https://m.media-amazon.com/images/I/81nQwW8OR8L._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "HP laptop",
        image:
          "https://i5.walmartimages.com/seo/HP-Stream-14-Laptop-Intel-Celeron-N4000-4GB-SDRAM-32GB-eMMC-Office-365-1-yr-Royal-Blue_4f941fe6-0cf3-42af-a06c-7532138492fc_2.cb8e85270e731cb1ef85d431e49f0bf2.jpeg",
        price: 15000,
        stock: 10,
      },
      {
        title: "Lenevo laptop",
        image:
          "https://m.media-amazon.com/images/I/71RVRfwvMzL._AC_SL1500_.jpg",
        price: 20000,
        stock: 10,
      },
      {
        title: "Asus laptop",
        image:
          "https://m.media-amazon.com/images/I/81nQwW8OR8L._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
    ];

    if (exitingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.error("Cannot connect to the database \n", error);
  }
};
