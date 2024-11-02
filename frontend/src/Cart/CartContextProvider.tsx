import React, { useState, ReactNode } from "react";
import { CartContext } from "./CartContext";
import { CartItemProps, productCardProps } from "../types/productType";
import {
  addCartItem,
  ClearCartFrombackend,
  removeItemFromBackend,
  updateCartItem,
} from "./helperFunctions";
import { useAuth } from "../Auth/AuthContext";

// Define the provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { token } = useAuth();

  const addToCart = async (item: productCardProps, token: string) => {
    setCartItems((prevItems) => {
      // Clone previous cart items for updating
      const updatedItems = [...prevItems];
      let isCartModified = false;

      // Find if the item already exists in the cart
      const existingItemIndex = updatedItems.findIndex(
        (prevItem) => prevItem.item === item._id
      );

      // Helper function to check stock availability
      const canUpdateQuantity = (
        currentQuantity: number,
        addQuantity: number,
        stock: number
      ) => currentQuantity + addQuantity <= stock;

      if (existingItemIndex >= 0) {
        // Handle the case where the item is already in the cart
        const existingItem = updatedItems[existingItemIndex];
        const potentialNewQuantity = existingItem.quantity + item.quantity;

        // Check stock availability
        if (
          canUpdateQuantity(
            existingItem.quantity,
            item.quantity,
            existingItem.stock
          )
        ) {
          existingItem.quantity = potentialNewQuantity;
          isCartModified = true;

          // Call the API to update the cart item
          updateCartItem(existingItem.item, potentialNewQuantity, token);
        } else {
          console.log("Stock limit exceeded; item not added or updated.");
          return prevItems; // Return previous items if stock is exceeded
        }
      } else {
        // Handle the case where the item is new to the cart
        if (item.quantity <= item.stock) {
          const newItem: CartItemProps = {
            _id: item._id,
            item: item._id,
            title: item.title,
            image: item.image,
            price: item.price,
            stock: item.stock,
            quantity: item.quantity,
          };
          updatedItems.push({ ...newItem });

          isCartModified = true;

          // Call the API to add a new cart item
          addCartItem(item._id, item.quantity, token);
        } else {
          console.log("Stock limit exceeded for new item; item not added.");
          return prevItems; // Return previous items if stock is exceeded
        }
      }

      // Update total price only if the cart was modified
      if (isCartModified) {
        setTotalPrice((prevTotal) => prevTotal + item.price * item.quantity);
      }

      return updatedItems;
    });
  };

  const setCartData = (cartItems: CartItemProps[], totalPrice: number) => {
    setCartItems(cartItems);
    setTotalPrice(totalPrice);
  };

  const removeItem = (id: string) => {
    if (token) {
      //Front end removal
      const productToRemove = cartItems.find((item) => item.item.toString() === id);
      if (productToRemove) {
        //recalulate the total price
        const newtotalPrice =
          totalPrice - productToRemove.price * productToRemove.quantity;

        const newCartItems = cartItems.filter((item) => item.item.toString() !== id);
        console.log(newCartItems);
        setCartData(newCartItems, newtotalPrice);
        // backend removal
        removeItemFromBackend(id, token);
      }
    }
  };

  const clearCart = () => {
    if (token) {
      //front end clearing
      setCartData([], 0);
      console.log("Cart has been cleared");
      //back end clearnig
      ClearCartFrombackend(token);
    }
  };

  const value = {
    cartItems,
    totalPrice,
    addToCart,
    setCartData,
    removeItem,
    clearCart,
  };

  // Provide context values to children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
