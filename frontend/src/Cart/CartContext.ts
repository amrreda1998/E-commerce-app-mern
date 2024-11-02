import { createContext, useContext } from "react";
import { CartItemProps } from "../types/productType";

// Define the structure for the Cart Context data
interface CartContextType {
  cartItems: CartItemProps[];
  totalPrice: number;
  addToCart: (item: CartItemProps, token: string) => void;
  setCartData: (items: CartItemProps[], value: number) => void;
}

// Create a Cart Context with undefined as the initial value
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Custom hook for accessing the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;
