import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CardContent, Divider, Chip } from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import OrderService from "../../services/OrderService";
import { Order, OrderItem } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert, sweetFailureProvider } from "../../../lib/sweetAlert";
import moment from "moment";
import "../../../css/orderActionsPage.css";

export default function OrderActionsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [orderId]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          setLoading(false);
          return;
        }

        const orderService = new OrderService();
        const fetchedOrder = await orderService.getOrder(orderId);
        setOrder(fetchedOrder);
      } catch (err) {
        console.log("Error fetching order:", err);
        sweetErrorHandling(err).then();
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleWriteReview = () => {
    if (order?.orderStatus !== OrderStatus.FINISH) {
      sweetFailureProvider("Reviews can only be submitted for delivered orders.", false, "");
      return;
    }
    sweetTopSmallSuccessAlert("Review form will open shortly!", 2000);
  };

  const handleRequestRefund = () => {
    sweetTopSmallSuccessAlert("Refund request form will open shortly!", 2000);
  };

  const handleContactSupport = () => {
    sweetTopSmallSuccessAlert("Support team will contact you shortly!", 2000);
  };

  const handleDownloadInvoice = () => {
    sweetTopSmallSuccessAlert("Invoice download will start shortly!", 2000);
  };

  const calculateDeliveryDate = () => {
    if (!order) return "N/A";
    const date = new Date(order.createdAt);
    date.setDate(date.getDate() + 7);
    return moment(date).format("MMM DD, YYYY");
  };

  if (loading) {
    return (
      <div className="order-actions-page">
        <Container maxWidth="lg">
          <Box className="order-actions-loading">
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-actions-page">
        <Container maxWidth="lg">
          <Box className="order-actions-empty">
            <Box className="order-actions-empty-icon">
              <ShoppingBagIcon />
            </Box>
            <Typography className="order-actions-empty-title">Order Not Found</Typography>
            <Typography className="order-actions-empty-subtitle">
              We couldn't find the order you're looking for.
            </Typography>
            <Button
              component={NavLink}
              to="/member-page"
              variant="contained"
              className="order-actions-empty-btn"
            >
              Back to My Orders
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );
  const shipping = order.orderDelivery || 0;
  const total = order.orderTotal;

  return (
    <div className="order-actions-page">
      {/* Top Banner */}
      <Box className="order-actions-banner">
        <Container maxWidth="lg" className="order-actions-banner-container">
          <Box className="order-actions-breadcrumb">
            <NavLink to="/" className="breadcrumb-link">Home</NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <NavLink to="/member-page" className="breadcrumb-link">My Account</NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <NavLink to="/member-page" className="breadcrumb-link">My Orders</NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <Typography className="breadcrumb-current">Order Actions</Typography>
          </Box>
          <Typography className="order-actions-banner-title">Order Completed</Typography>
          <Box className="order-actions-banner-info">
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Order ID</Typography>
              <Typography className="banner-info-value">#{order._id.substring(0, 12).toUpperCase()}</Typography>
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Payment Status</Typography>
              <Chip label="Completed" className="status-chip completed" size="small" />
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Order Status</Typography>
              <Chip 
                label="Delivered"
                className="status-chip delivered"
                size="small"
              />
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Order Date</Typography>
              <Typography className="banner-info-value">{moment(order.createdAt).format("MMM DD, YYYY")}</Typography>
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Delivery Date</Typography>
              <Typography className="banner-info-value">{calculateDeliveryDate()}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="order-actions-container">
        <Box className="order-actions-main-grid">
          {/* Left Column - Wider */}
          <Box className="order-actions-left-column">
            {/* Products in Order */}
            <Card className="order-actions-card" elevation={0}>
              <CardContent className="order-actions-card-content">
                <Typography className="order-actions-card-title">Products in This Order</Typography>
                <Divider className="order-actions-divider" />
                <Box className="order-actions-products-list">
                  {order.orderItems.map((item: OrderItem) => {
                    const product: Product = order.productData.find(
                      (p: Product) => p._id === item.productId
                    ) || order.productData[0];
                    const imagePath = product?.productImages?.[0]
                      ? `${serverApi}/${product.productImages[0]}`
                      : "/icons/default-product.svg";
                    const itemSubtotal = item.itemPrice * item.itemQuantity;

                    return (
                      <Box key={item._id} className="order-actions-product-item">
                        <img
                          src={imagePath}
                          alt={product?.productName || "Product"}
                          className="order-actions-product-image"
                        />
                        <Box className="order-actions-product-details">
                          <Typography className="order-actions-product-name">
                            {product?.productName || "Product"}
                          </Typography>
                          {product?.productCollection && (
                            <Typography className="order-actions-product-category">
                              {product.productCollection}
                            </Typography>
                          )}
                          <Typography className="order-actions-product-quantity">
                            Quantity: {item.itemQuantity}
                          </Typography>
                        </Box>
                        <Typography className="order-actions-product-price">
                          ${itemSubtotal.toFixed(2)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Totals */}
                <Divider className="order-actions-divider" sx={{ my: 3 }} />
                <Box className="order-actions-totals">
                  <Box className="order-actions-totals-row">
                    <Typography className="order-actions-totals-label">Subtotal</Typography>
                    <Typography className="order-actions-totals-value">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box className="order-actions-totals-row">
                    <Typography className="order-actions-totals-label">Shipping</Typography>
                    <Typography className="order-actions-totals-value">
                      {shipping > 0 ? `$${shipping.toFixed(2)}` : "$0.00"}
                    </Typography>
                  </Box>
                  <Divider className="order-actions-divider" sx={{ my: 2 }} />
                  <Box className="order-actions-totals-row total-row">
                    <Typography className="order-actions-totals-label total-label">Total</Typography>
                    <Typography className="order-actions-totals-value total-value">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Action Cards Section */}
            <Box className="order-actions-cards-section">
              <Card className="order-actions-card" elevation={0}>
                <CardContent className="order-actions-card-content">
                  <Typography className="order-actions-card-title">Manage Your Order</Typography>
                  <Divider className="order-actions-divider" />
                  <Box className="order-actions-manage-grid">
                    <Button
                      variant="contained"
                      className="order-actions-manage-btn primary"
                      onClick={handleWriteReview}
                      fullWidth
                    >
                      Write Review
                    </Button>
                    <Button
                      variant="outlined"
                      className="order-actions-manage-btn"
                      onClick={handleRequestRefund}
                      fullWidth
                    >
                      Request Refund
                    </Button>
                    <Button
                      variant="outlined"
                      className="order-actions-manage-btn"
                      onClick={handleContactSupport}
                      fullWidth
                    >
                      Contact Support
                    </Button>
                    <Button
                      variant="outlined"
                      className="order-actions-manage-btn"
                      onClick={handleDownloadInvoice}
                      fullWidth
                    >
                      Download Invoice
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Back to Orders Button */}
            <Box className="order-actions-back-section">
              <Button
                component={NavLink}
                to="/member-page"
                variant="outlined"
                className="order-actions-back-btn"
                fullWidth
              >
                Back to My Orders
              </Button>
            </Box>
          </Box>

          {/* Right Column - Order Summary */}
          <Box className="order-actions-right-column">
            <Card className="order-actions-card" elevation={0}>
              <CardContent className="order-actions-card-content">
                <Typography className="order-actions-card-title">Order Summary</Typography>
                <Divider className="order-actions-divider" />
                <Box className="order-actions-summary-content">
                  <Box className="order-actions-summary-row">
                    <Typography className="order-actions-summary-label">Subtotal</Typography>
                    <Typography className="order-actions-summary-value">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box className="order-actions-summary-row">
                    <Typography className="order-actions-summary-label">Shipping</Typography>
                    <Typography className="order-actions-summary-value">
                      {shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}
                    </Typography>
                  </Box>
                  <Divider className="order-actions-divider" sx={{ my: 2 }} />
                  <Box className="order-actions-summary-row total-row">
                    <Typography className="order-actions-summary-label total-label">Total</Typography>
                    <Typography className="order-actions-summary-value total-value">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box className="order-actions-payment-status">
                    <Chip
                      label="Payment Status: Paid"
                      className="payment-status-chip"
                      color="success"
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
