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
import Button from "@mui/material/Button";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Navbar() {
  const { email, token, clearAuthData } = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
    setAnchorElUser(null);
    //clear authentication data
    clearAuthData();
  };

  const handleMyOrders = () => {
    // Add your "My Orders" navigation logic here
    console.log("Navigating to My Orders");
    navigate("/orders");
    setAnchorElUser(null);
  };

  console.log("From NavBar", { email, token });

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
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
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
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Tech Store
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Conditional Rendering: Login Button if not logged in, otherwise Avatar and Email */}
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
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}

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
            {/* Menu items with handlers for My Orders and Logout */}
            <MenuItem onClick={handleMyOrders}>
              <Typography sx={{ textAlign: "center" }}>My Orders</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography sx={{ textAlign: "center" }}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
