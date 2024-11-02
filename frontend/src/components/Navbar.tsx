import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge"; // Import Badge component
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

function Navbar() {
  const { email, token, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null
  );

  const { cartItems, totalPrice, setCartData } = useCart();

  React.useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    clearAuthData();
    navigate("/");
  };

  const handleMyOrders = () => {
    navigate("/orders");
    setAnchorElUser(null);
  };

  // Calculate the total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Tech Store
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: ".9rem", md: "1.2rem" },
            }}
          >
            Tech Store
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {token && (
            <>
              {/* Cart Icon with Badge */}
              <IconButton
                color="inherit"
                onClick={handleOpenCartMenu}
                sx={{ mr: 1 }}
              >
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
                    {/* Display item image */}
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{ width: 40, height: 40, borderRadius: 1 }}
                    />
                    {/* Display item details */}
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
          )}

          {email ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                {email}
              </Typography>

              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                  <Avatar alt={email} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleMyOrders}>
                  <Typography sx={{ textAlign: "center" }}>
                    My Orders
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            location.pathname !== "/login" && (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
