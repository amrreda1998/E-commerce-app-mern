// OrdersPage.tsx
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useAuth } from "../Auth/AuthContext";
import { BackendURL } from "../constants/baseURL";

interface IOrderItem {
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface IOrder {
  _id: string;
  orderItems: IOrderItem[];
  totalPrice: number;
  address: string;
}

const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${BackendURL}/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOrders(data); // Now directly setting `data` as orders since the API returns an array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setLoading(false);
        });
    }
  }, [token]);

  if (loading) {
    return (
      <Typography variant="body1" align="center">
        Loading orders...
      </Typography>
    );
  }

  if (orders.length === 0) {
    return (
      <Typography variant="body1" align="center">
        No orders found.
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Orders
        </Typography>
        {orders.map((order) => (
          <Paper
            key={order._id}
            elevation={3}
            sx={{
              padding: 3,
              marginBottom: 3,
              borderRadius: 2,
              border: "1px solid #ccc",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" color="primary" sx={{ marginBottom: 1 }}>
              Order ID: {order._id}
            </Typography>
            <Typography variant="body1">
              Shipping Address: {order.address}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: 1 }}
            >
              Total Price: EGP {order.totalPrice}
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              {order.orderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: 2,
                    borderBottom:
                      index !== order.orderItems.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: EGP {item.price} | Qty: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ marginLeft: "auto", fontWeight: "bold" }}
                  >
                    EGP {item.price * item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OrdersPage;
