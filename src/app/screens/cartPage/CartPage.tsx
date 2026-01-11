import React, { useState } from "react";
import { Container, Box, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Divider, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory, NavLink } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";
import Newsletter from "../homePage/Newsletter";
import "../../../css/cart.css";

interface CartPageProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function CartPage(props: CartPageProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember } = useGlobals();
  const history = useHistory();
  const [couponCode, setCouponCode] = useState("");

  // Calculate prices
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const shippingCost: number = itemsPrice < 1500 ? 10 : 0;
  const totalPrice: number = itemsPrice + shippingCost;
  const totalItems: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0
  );

  const proceedOrderHandler = () => {
    if (!authMember) {
      sweetErrorHandling(Messages.error2).then();
      return;
    }
    history.push("/checkout");
  };

  return (
    <div className="cart-page">
      {/* Header / Banner Section */}
      <Box className="cart-header-section">
        <Container className="cart-header-container" maxWidth="lg">
          <Box className="cart-header-title">Shopping Cart</Box>
          <Box className="cart-header-subtitle">Review your selections</Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container className="cart-main-container" maxWidth="lg">
        {cartItems.length === 0 ? (
          <Box className="cart-empty-state">
            <Box className="cart-empty-icon-wrapper">
              <img src="/icons/shopping-cart.svg" alt="Empty Cart" className="cart-empty-icon" />
            </Box>
            <Typography className="cart-empty-title">Your Shopping Cart is Empty</Typography>
            <Typography className="cart-empty-subtitle">
              Discover our exquisite collection of fine jewellery and add items to your cart
            </Typography>
            <Button
              component={NavLink}
              to="/products"
              variant="contained"
              className="cart-continue-shopping-btn"
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Box className="cart-content-grid">
            {/* Left Column - Cart Table */}
            <Box className="cart-table-column">
              <TableContainer component={Paper} className="cart-table-container" elevation={0}>
                <Table className="cart-table">
                  <TableHead>
                    <TableRow className="cart-table-header-row">
                      <TableCell className="cart-table-header">Product</TableCell>
                      <TableCell className="cart-table-header" align="right">Price</TableCell>
                      <TableCell className="cart-table-header" align="center">Quantity</TableCell>
                      <TableCell className="cart-table-header" align="right">Subtotal</TableCell>
                      <TableCell className="cart-table-header" align="center">Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item: CartItem) => {
                      const imagePath = `${serverApi}/${item.image}`;
                      const subtotal = item.price * item.quantity;
                      return (
                        <TableRow key={item._id} className="cart-table-row">
                          <TableCell className="cart-table-cell product-cell" data-label="">
                            <Box className="cart-product-info">
                              <img src={imagePath} alt={item.name} className="cart-product-image" />
                              <Box className="cart-product-details">
                                <Typography className="cart-product-name">{item.name}</Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell className="cart-table-cell price-cell" align="right" data-label="Price">
                            <Typography className="cart-product-price">${item.price.toFixed(2)}</Typography>
                          </TableCell>
                          <TableCell className="cart-table-cell quantity-cell" align="center" data-label="Quantity">
                            <Box className="cart-quantity-control">
                              <IconButton
                                size="small"
                                onClick={() => onRemove(item)}
                                className="cart-quantity-btn"
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Typography className="cart-quantity-value">{item.quantity}</Typography>
                              <IconButton
                                size="small"
                                onClick={() => onAdd(item)}
                                className="cart-quantity-btn"
                              >
                                <AddIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell className="cart-table-cell subtotal-cell" align="right" data-label="Subtotal">
                            <Typography className="cart-subtotal">${subtotal.toFixed(2)}</Typography>
                          </TableCell>
                          <TableCell className="cart-table-cell remove-cell" align="center" data-label="">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(item)}
                              className="cart-remove-btn"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Coupon Section */}
              <Box className="cart-coupon-section">
                <Box className="cart-coupon-left">
                  <TextField
                    className="cart-coupon-input"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    className="cart-coupon-apply-btn"
                    variant="contained"
                    onClick={() => {
                      // Coupon logic would go here
                      console.log("Apply coupon:", couponCode);
                    }}
                  >
                    Apply Coupon
                  </Button>
                </Box>
                <Button
                  onClick={onDeleteAll}
                  className="cart-clear-btn"
                  startIcon={<DeleteIcon />}
                >
                  Clear Shopping Cart
                </Button>
              </Box>
            </Box>

            {/* Right Column - Order Summary */}
            <Box className="cart-summary-column">
              <Card className="cart-summary-card" elevation={0}>
                <CardContent className="cart-summary-content">
                  <Typography className="cart-summary-title">Order Summary</Typography>
                  <Divider className="cart-summary-divider" />
                  
                  <Box className="cart-summary-row">
                    <Typography className="cart-summary-label">Items</Typography>
                    <Typography className="cart-summary-value">{totalItems}</Typography>
                  </Box>
                  
                  <Box className="cart-summary-row">
                    <Typography className="cart-summary-label">Sub Total</Typography>
                    <Typography className="cart-summary-value">${itemsPrice.toFixed(2)}</Typography>
                  </Box>
                  
                  <Box className="cart-summary-row">
                    <Typography className="cart-summary-label">Shipping</Typography>
                    <Typography className="cart-summary-value">
                      {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "$0.00"}
                    </Typography>
                  </Box>
                  
                  <Divider className="cart-summary-divider" />
                  
                  <Box className="cart-summary-row total-row">
                    <Typography className="cart-summary-label total-label">Total</Typography>
                    <Typography className="cart-summary-value total-value">${totalPrice.toFixed(2)}</Typography>
                  </Box>
                  
                  <Button
                    onClick={proceedOrderHandler}
                    variant="contained"
                    className="cart-checkout-btn"
                    startIcon={<ShoppingCartIcon />}
                    fullWidth
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Container>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
