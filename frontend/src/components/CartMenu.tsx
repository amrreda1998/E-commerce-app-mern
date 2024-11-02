// CartMenu.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { useEffect } from "react";

type CartMenuProps = {
  anchorElCart: HTMLElement | null;
  handleOpenCartMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseCartMenu: () => void;
};

function CartMenu({
  anchorElCart,
  handleOpenCartMenu,
  handleCloseCartMenu,
}: CartMenuProps) {
  const { token } = useAuth();
  const { cartItems, totalPrice, setCartData } = useCart();

  useEffect(() => {
    if (token) {
      fetch("http://localhost:3001/carts/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCartData(data.items, data.totalPrice);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    }
  }, [token, setCartData]);

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenCartMenu} sx={{ mr: 1 }}>
        <Badge badgeContent={totalCartQuantity} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        sx={{ mt: "45px" }}
        id="cart-menu"
        anchorEl={anchorElCart}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElCart)}
        onClose={handleCloseCartMenu}
      >
        {cartItems.map((item, index) => (
          <MenuItem
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{ width: 40, height: 40, borderRadius: 1 }}
            />
            <Box>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Price: EGP {item.price} | Qty: {item.quantity}
              </Typography>
            </Box>
          </MenuItem>
        ))}

        <MenuItem divider>
          <Typography sx={{ fontWeight: "bold" }}>
            Total: EGP {totalPrice}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default CartMenu;
