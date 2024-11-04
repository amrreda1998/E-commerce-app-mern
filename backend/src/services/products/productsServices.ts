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
        title: "HP Laptop 15-fd0022ne",
        image: "https://m.media-amazon.com/images/I/41rfGeZkNDL._AC_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo IdeaPad Slim 3 ",
        image: "https://m.media-amazon.com/images/I/41FVQBytYVL._AC_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "HP Victus Gaming Laptop",
        image:
          "https://m.media-amazon.com/images/I/61UwzqsXZOL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Dell Vostro 3520 Laptop",
        image:
          "https://m.media-amazon.com/images/I/71+-viLETIL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Acer Aspire 7",
        image:
          "https://m.media-amazon.com/images/I/71kEyZrTihL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "ASUS Vivobook S 15 OLED",
        image:
          "https://m.media-amazon.com/images/I/71Krxuxqi7L._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo Legion 5",
        image:
          "https://m.media-amazon.com/images/I/61GI6xEsYQL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Acer Nitro",
        image:
          "https://m.media-amazon.com/images/I/61gqM+makEL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo IdeaPad Gaming 3 Laptop",
        image:
          "https://m.media-amazon.com/images/I/51la1mi53lL._AC_SL1000_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "MSI Thin GF63",
        image:
          "https://m.media-amazon.com/images/I/51TOPfOnS-L._AC_SL1024_.jpg",
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
      {
        title: "HP Laptop 15-fd0022ne",
        image: "https://m.media-amazon.com/images/I/41rfGeZkNDL._AC_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo IdeaPad Slim 3 ",
        image: "https://m.media-amazon.com/images/I/41FVQBytYVL._AC_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "HP Victus Gaming Laptop",
        image:
          "https://m.media-amazon.com/images/I/61UwzqsXZOL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Dell Vostro 3520 Laptop",
        image:
          "https://m.media-amazon.com/images/I/71+-viLETIL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Acer Aspire 7",
        image:
          "https://m.media-amazon.com/images/I/71kEyZrTihL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "ASUS Vivobook S 15 OLED",
        image:
          "https://m.media-amazon.com/images/I/71Krxuxqi7L._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo Legion 5",
        image:
          "https://m.media-amazon.com/images/I/61GI6xEsYQL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Acer Nitro",
        image:
          "https://m.media-amazon.com/images/I/61gqM+makEL._AC_SL1500_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "Lenovo IdeaPad Gaming 3 Laptop",
        image:
          "https://m.media-amazon.com/images/I/51la1mi53lL._AC_SL1000_.jpg",
        price: 40000,
        stock: 10,
      },
      {
        title: "MSI Thin GF63",
        image:
          "https://m.media-amazon.com/images/I/51TOPfOnS-L._AC_SL1024_.jpg",
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
