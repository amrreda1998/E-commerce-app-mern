//get all products in the cart collection

import { cartModel } from "../../models/cartModel";

export const getActiveCart = async (userID:string) => {
  const activeCart = await cartModel.findOne({ userID, status: "active" });
  //if there is no active cart create one
  if (!activeCart) {
    //create a one
    const newCart = await cartModel.create({ userID });
    return(newCart);
  } else {
    return(activeCart);
  }
};









//add product to the cart collection
