import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink, useHistory } from "react-router-dom";
import Basket from "./Basket";
import React from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onDelete,
    onAdd,
    onDeleteAll,
    onRemove,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const history = useHistory();

  const bannerUrl = `${process.env.PUBLIC_URL || ''}/img/banner.jpg`;

  return (
    <div 
      className="home-navbar"
      style={{
        backgroundImage: `url(${bannerUrl})`
      }}
    >
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className="brand-wrapper">
            <NavLink to="/" className="brand-link">
              <Box className="brand-name">FACET & GOLD</Box>
              <Box className="brand-tagline">FINE JEWELLERY</Box>
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home{" "}
              </NavLink>
            </Box>

            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>

            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}

            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page
                </NavLink>
              </Box>
            ) : null}

            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>

            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />

            {!authMember ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  className="signup-button-nav"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Stack>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                alt={authMember?.memberNick || "User"}
                onClick={handleLogoutClick}
                style={{ cursor: "pointer" }}
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              className="user-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                className: "user-menu-paper",
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 16px rgba(0,0,0,0.12))",
                  mt: 1.5,
                  borderRadius: "12px",
                  border: "1px solid rgba(201, 162, 77, 0.15)",
                  backgroundColor: "#FAF9F7",
                  minWidth: "160px",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    backgroundColor: "#FAF9F7",
                    borderLeft: "1px solid rgba(201, 162, 77, 0.15)",
                    borderTop: "1px solid rgba(201, 162, 77, 0.15)",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest} className="logout-menu-item">
                <ListItemIcon className="logout-icon-wrapper">
                  <Logout fontSize="small" className="logout-icon" />
                </ListItemIcon>
                <span className="logout-text">Logout</span>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
              Timeless Fine Jewellery
            </Box>
            <Box className={"wel-txt"}>
              Crafted in gold & diamonds for everyday elegance.
            </Box>
            <Stack className={"trust-row"} direction="row" spacing={0}>
              <Box className="trust-item">
                <LocalShippingIcon className="trust-icon" />
                <span>Free Shipping over $200</span>
              </Box>
              <Box className="trust-item">
                <VerifiedIcon className="trust-icon" />
                <span>Certified Materials</span>
              </Box>
              <Box className="trust-item">
                <AssignmentReturnIcon className="trust-icon" />
                <span>14-Day Returns</span>
              </Box>
            </Stack>
            <Stack className={"hero-buttons"}>
              <Button
                variant={"contained"}
                className={"hero-btn-primary"}
                onClick={() => history.push("/products")}
                endIcon={<ArrowForwardIcon />}
              >
                Browse Collections
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
