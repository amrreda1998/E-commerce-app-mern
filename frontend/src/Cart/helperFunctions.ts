import { BackendURL } from "../constants/baseURL";

  // Function to update the cart item on the backend
  export const updateCartItem = async (productId: string, newQuantity: number, token: string) => {
    try {
      const response = await fetch(`${BackendURL}/carts/item`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          newQuantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
  
      // Optionally, handle successful response if needed
      const data = await response.json();
      console.log("Cart item updated:", data);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  
  // Function to add a new cart item on the backend
  export const addCartItem = async (productId: string, quantity: number, token: string) => {
    try {
      const response = await fetch(`${BackendURL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add cart item");
      }
  
      // Optionally, handle successful response if needed
      const data = await response.json();
      console.log("Cart item added:", data);
    } catch (error) {
      console.error("Error adding cart item:", error);
    }
  };



    // Function to update the cart item on the backend
    export const ClearCartFrombackend = async (token: string) => {
      try {
        const response = await fetch(`${BackendURL}/carts/item/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to Clear the Cart");
        }
    
        // Optionally, handle successful response if needed
        const data = await response.json();
        console.log("Cart has been cleared :", data);
      } catch (error) {
        console.error("Error Clearing the cart :", error);
      }
    };



  // Function to add a new cart item on the backend
  export const removeItemFromBackend = async (productId: string ,token:string) => {

      const response = await fetch(`${BackendURL}/carts/item/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(await response.json());

  };