//get all products in the cart collection

import { cartModel } from "../../models/cartModel";
import { Iproduct, productModel } from "./../../models/productModel";

export const getActiveCart = async (userID: string) => {
  const activeCart = await cartModel.findOne({ userID, status: "active" });
  //if there is no active cart create one
  if (!activeCart) {
    //create a one
    const newCart = await cartModel.create({ userID });
    return newCart;
  } else {
    return activeCart;
  }
};

interface addItemToCartProps {
  productId: string;
  quantity: number;
  userID: string;
}

export const addItemToCart = async ({
  productId,
  quantity,
  userID,
}: addItemToCartProps) => {
  //get the active cart
  const activeCart = await getActiveCart(userID);

  //ToDO:!!!!!!!!!!

  //check if the product already in the cart
  const ExistedInActiveCart = activeCart.items.find(
    (CartItem) => CartItem.item.toString() === productId.toString()
  );
  if (ExistedInActiveCart) {
    return { data: "Product is already added to the cart", status: 400 };
  }

  //get product to push into the cart items
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found in the database", status: 400 };
  }

  //check for product stock
  if (product.stock == 0 || product.stock < quantity) {
    return {
      data: `Sorry product quantity in stock is ${product.stock}`,
      status: 400,
    };
  }

  //add the new item to the cart
  activeCart.items.push({
    item: productId,
    unitPrice: product.price,
    quantity: quantity,
  });
  //update the total amount of the cart
  activeCart.totalPrice += product.price * quantity;

  //update the database with the new cart state
  const updatedCart = await activeCart.save();

  //return response to the user
  return { data: updatedCart, status: 201 };
};

//add product to the cart collection
