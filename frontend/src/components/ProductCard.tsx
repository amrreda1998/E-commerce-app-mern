import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { productCardProps } from "../types/productType";
import { useAuth } from "../Auth/AuthContext";

import { useCart } from "../Cart/CartContext";
// import { BackendURL } from "../constants/baseURL";

export default function ProdcutCard({
  _id,
  title,
  image,
  price,
  stock,
}: productCardProps) {
  const [quantity, setQuantity] = useState(1);
  //use authenticatinContext
  const { token } = useAuth();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Prevents quantity from going below 1

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!token) {
      alert("Please Login First to Add items to your cart");
    } else {
      addToCart({
        _id, title, image, price, quantity, stock,
        item: ""
      }, token); // Send product data to cart
    }
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: 300, sm: 300, md: 345 },
        margin: "auto",
        backgroundColor: "#e1f5fe",
      }}
    >
      <CardMedia
        sx={{
          height: { xs: 150, sm: 200, md: 300 },
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          EGP {price}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {/* Add to Cart Button */}
        <Button variant="contained" size="medium" onClick={handleAddToCart}>
          Add to Cart
        </Button>

        {/* Decrease Quantity Button */}
        <IconButton onClick={handleDecrement} size="small">
          <RemoveIcon />
        </IconButton>

        {/* Quantity Display */}
        <Typography variant="body2">{quantity}</Typography>

        {/* Increase Quantity Button */}
        <IconButton onClick={handleIncrement} size="small">
          <AddIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
