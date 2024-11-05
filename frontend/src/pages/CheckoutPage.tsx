// CheckoutPage.tsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "./../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { BackendURL } from "../constants/baseURL";

const USER_ADDRESS = "Dummy Address";

//helper functions :
const checkoutFromBackend = async (address: string, token: string) => {
  const response = await fetch(`${BackendURL}/carts/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address,
    }),
  });
  console.log(await response.json());
};

const CheckoutPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();

  // Handle the submission of the order
  const handleSubmitOrder = async () => {
    // Logic for submitting the order
    console.log("Order submitted!", cartItems);

    //handle checkout from the backend
    if (token) {
      const response = await checkoutFromBackend(USER_ADDRESS, token);
      console.log(response);
    }

    // Clear the cart after submission
    clearCart();
    navigate("/orders");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      >
        Checkout
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Box
              key={item.item}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    marginRight: 2,
                  }}
                />
                <Typography variant="body1">
                  {item.title} - EGP {item.price} x {item.quantity}
                </Typography>
              </Box>
              <Typography variant="body1">
                EGP {item.price * item.quantity}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              marginTop: 2,
              borderTop: "1px solid #ccc",
              paddingTop: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">Total: EGP {totalPrice}</Typography>
          </Box>
          <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitOrder}
            >
              Submit Order
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CheckoutPage;
