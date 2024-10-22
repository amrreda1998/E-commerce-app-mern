//get all products in the cart collection

import { cartModel, ICartItem } from "../../models/cartModel";
import { IOrderItem, orderModel } from "../../models/orderModel";
import { Iproduct, productModel } from "../../models/productModel";

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

//Interface for update product  in the active cart fucntion params

interface cartItemUpdateProps {
  productId: string;
  newQuantity: number;
  userID: string;
}
//update product in the active cart
export const updateCartItem = async ({
  productId,
  newQuantity,
  userID,
}: cartItemUpdateProps) => {
  //get the active cart
  const activeCart = await getActiveCart(userID);

  //search by productID in the active cart
  const cartItem = activeCart.items.find(
    (item) => item.item.toString() === productId.toString()
  );

  if (!cartItem) {
    return { data: "product is not found in the active cart", status: 404 };
  }
  //check if the quantity is less than or equal the product stock
  //get product stock form the database
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product not found in the database", status: 400 };
  }

  //check for product stock
  if (product.stock == 0 || product.stock < newQuantity) {
    return {
      data: `Sorry product quantity in stock is ${product.stock}`,
      status: 400,
    };
  }

  //remove the old item calculation from  total price
  activeCart.totalPrice -= cartItem.quantity * cartItem.unitPrice;

  //update the values that the user wants in the cart item
  cartItem.quantity = newQuantity;

  //recalculate the total price with every update
  activeCart.totalPrice += cartItem.quantity * cartItem.unitPrice;

  //save the sate of the database
  activeCart.save();

  return { data: cartItem, status: 202 };
};

//delete an item from a cart

interface deleteItemProps {
  userID: string;
  productId: string;
}

export const deleteCartItem = async ({
  userID,
  productId,
}: deleteItemProps) => {
  //get the active cart
  const activeCart = await getActiveCart(userID);
  console.log(userID);
  console.log(productId);
  //find the item that want to be deleted in the cart
  const cartItem = activeCart.items.find(
    (item) => item.item.toString() === productId
  );
  //check if it existed in the cart
  if (!cartItem) {
    return { data: "item was not found in the cart", status: 404 };
  }
  //decrease the total price by the amount of the deleted item
  activeCart.totalPrice -= cartItem.unitPrice * cartItem.quantity;

  //find and delete the product from the active cart and update the active cart items
  activeCart.items = activeCart.items.filter(
    (item) => item.item.toString() !== productId
  );
  //save cart status to the database
  activeCart.save();
  return { data: "The item is successfully deleted", status: 204 };
};

//clear cart service

export const clearCart = async (userID: string) => {
  //get the active cart
  const activeCart = await getActiveCart(userID);
  //check if the cart is already clear
  if (activeCart.items.length === 0) {
    return { data: "The cart is already empty", status: 400 };
  }
  //delete all items
  activeCart.items = [];
  //zero the total amount
  activeCart.totalPrice = 0;
  //save the state to the database
  activeCart.save();
  return { data: "the cart has been cleared", status: 200 };
};

//checkout service

export const checkOut = async (userID: string, address: string) => {
  //get active cart
  const activeCart = await getActiveCart(userID);
  //check if the cart is empty :
  if (activeCart.items.length === 0) {
    return { data: "The cart is empty !!", status: 400 };
  }

  const createAnOrderItem = (product: Iproduct, item: ICartItem) => {
    const orderItem: IOrderItem = {
      title: product.title,
      image: product.image,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    };

    //update the prodcut stock status in the database
    product.stock -= item.quantity;
    product.save();

    return orderItem;
  };

  const createOrderItems = async (cartItems: ICartItem[]) => {
    const orderItems: IOrderItem[] = [];

    // Use for...of to handle async/await properly in loops
    for (const item of cartItems) {
      // Get the product info from the product database collection
      const product = await productModel.findById(item.item);

      // Check if the product exists in the database
      if (!product) {
        return {
          data: "Cannot find the product in the database",
          status: 404,
        };
      }

      // Create an order
      const orderItem = createAnOrderItem(product, item);

      // Push the order item into the orderItems array
      orderItems.push(orderItem);
      
    
    }

    return orderItems; // Return the populated orderItems array
  };

  // Creating the new order
  const newOrder = await orderModel.create({
    userID: userID,
    address: address,
    totalPrice: activeCart.totalPrice,
    orderItems: await createOrderItems(activeCart.items),
  });

  //update the cart status
  activeCart.status = "completed";
  activeCart.save();
  
  return { data: newOrder, status: 201 };
};
