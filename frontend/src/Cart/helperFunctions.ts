  // Function to update the cart item on the backend
  export const updateCartItem = async (productId: string, newQuantity: number, token: string) => {
    try {
      const response = await fetch("http://localhost:3001/carts/item", {
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
      const response = await fetch("http://localhost:3001/carts", {
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