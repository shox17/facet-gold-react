import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CardContent, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { NavLink } from "react-router-dom";
import OrderService from "../../services/OrderService";
import { Order, OrderItem } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import Newsletter from "../homePage/Newsletter";
import "../../../css/orderSuccessPage.css";

export default function OrderSuccessPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

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

  const handleDownloadInvoice = () => {
    sweetTopSmallSuccessAlert("Invoice download will be available soon!", 2000);
  };

  const calculateEstimatedDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const generateTransactionId = () => {
    return `TR${Math.random().toString(36).substring(2, 10).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  };

  const getPaymentMethod = () => {
    // Mock payment method - in real app, this would come from order data
    return "Visa";
  };

  // Get title and subtitle based on order status
  const getOrderStatusInfo = () => {
    switch (order?.orderStatus) {
      case OrderStatus.PAUSE:
        return {
          title: "Your order is on hold",
          subtitle: "Your order has been received and is currently paused.",
          deliveryStatus: "Order Paused",
          deliveryStatusClass: "paused",
        };
      case OrderStatus.PROCESS:
        return {
          title: "Your order is being processed!",
          subtitle: "Thank you. Your order has been received and is being prepared for delivery.",
          deliveryStatus: "Order Being Processed",
          deliveryStatusClass: "processing",
        };
      case OrderStatus.FINISH:
        return {
          title: "Your order has been delivered!",
          subtitle: "Thank you for your purchase. Your order has been successfully delivered.",
          deliveryStatus: "Order Delivered",
          deliveryStatusClass: "delivered",
        };
      default:
        return {
          title: "Your order is completed!",
          subtitle: "Thank you. Your order has been received.",
          deliveryStatus: "Order Being Processed",
          deliveryStatusClass: "processing",
        };
    }
  };

  const statusInfo = getOrderStatusInfo();

  if (loading) {
    return (
      <div className="order-success-page">
        <Container maxWidth="lg">
          <Box className="order-success-loading">
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-success-page">
        <Container maxWidth="lg">
          <Box className="order-success-empty">
            <Box className="order-success-empty-icon">
              <ShoppingBagIcon />
            </Box>
            <Typography className="order-success-empty-title">Order Not Found</Typography>
            <Typography className="order-success-empty-subtitle">
              We couldn't find the order you're looking for.
            </Typography>
            <Button
              component={NavLink}
              to="/products"
              variant="contained"
              className="order-success-empty-btn"
            >
              Back to Shop
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  // Calculate totals
  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );
  const shipping = order.orderDelivery || 0;
  const taxes = 0;
  const discount = 0;
  const total = order.orderTotal;

  return (
    <div className="order-success-page">
      <Container maxWidth="lg" className="order-success-container">
        {/* Success Header */}
        <Card className="order-success-header-card" elevation={0}>
          <CardContent className="order-success-header-content">
            <Box className="order-success-header">
              <Box className="order-success-icon-wrapper">
                <CheckCircleIcon className="order-success-icon" />
              </Box>
              <Typography className="order-success-title">{statusInfo.title}</Typography>
              <Typography className="order-success-subtitle">
                {statusInfo.subtitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Payment & Delivery Status */}
        <Card className="order-success-status-card" elevation={0}>
          <CardContent className="order-success-status-content">
            <Box className="order-success-status-grid">
              <Box className="order-success-status-item">
                <Box className="order-success-status-icon-wrapper payment">
                  <PaymentIcon className="order-success-status-icon" />
                </Box>
                <Box className="order-success-status-info">
                  <Typography className="order-success-status-label">Payment Status</Typography>
                  <Typography className="order-success-status-value completed">Payment Completed</Typography>
                </Box>
              </Box>
              <Box className="order-success-status-item">
                <Box className={`order-success-status-icon-wrapper delivery ${statusInfo.deliveryStatusClass}`}>
                  <LocalShippingIcon className="order-success-status-icon" />
                </Box>
                <Box className="order-success-status-info">
                  <Typography className="order-success-status-label">Delivery Status</Typography>
                  <Typography className={`order-success-status-value ${statusInfo.deliveryStatusClass}`}>
                    {statusInfo.deliveryStatus}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Order Summary Bar */}
        <Card className="order-success-summary-card" elevation={0}>
          <CardContent className="order-success-summary-content">
            <Box className="order-success-summary-grid">
              <Box className="order-success-summary-item">
                <Typography className="order-success-summary-label">Order ID</Typography>
                <Typography className="order-success-summary-value">#{order._id.substring(0, 12).toUpperCase()}</Typography>
              </Box>
              <Box className="order-success-summary-item">
                <Typography className="order-success-summary-label">Payment Method</Typography>
                <Typography className="order-success-summary-value">{getPaymentMethod()}</Typography>
              </Box>
              <Box className="order-success-summary-item">
                <Typography className="order-success-summary-label">Transaction ID</Typography>
                <Typography className="order-success-summary-value">{generateTransactionId()}</Typography>
              </Box>
              <Box className="order-success-summary-item">
                <Typography className="order-success-summary-label">Estimated Delivery Date</Typography>
                <Typography className="order-success-summary-value">{calculateEstimatedDelivery()}</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              className="order-success-download-btn"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadInvoice}
            >
              Download Invoice
            </Button>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="order-success-details-card" elevation={0}>
          <CardContent className="order-success-details-content">
            <Typography className="order-success-details-title">Order Details</Typography>
            <Divider className="order-success-details-divider" />
            
            <TableContainer component={Paper} className="order-success-table-container" elevation={0}>
              <Table className="order-success-table">
                <TableHead>
                  <TableRow className="order-success-table-header-row">
                    <TableCell className="order-success-table-header">Product</TableCell>
                    <TableCell className="order-success-table-header" align="center">Quantity</TableCell>
                    <TableCell className="order-success-table-header" align="right">Price</TableCell>
                    <TableCell className="order-success-table-header" align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderItems.map((item: OrderItem) => {
                    const product: Product = order.productData.find(
                      (p: Product) => p._id === item.productId
                    ) || order.productData[0];
                    const imagePath = product?.productImages?.[0] 
                      ? `${serverApi}/${product.productImages[0]}` 
                      : "/icons/default-product.svg";
                    const itemSubtotal = item.itemPrice * item.itemQuantity;
                    
                    return (
                      <TableRow key={item._id} className="order-success-table-row">
                        <TableCell className="order-success-table-cell product-cell">
                          <Box className="order-success-product-info">
                            <img 
                              src={imagePath} 
                              alt={product?.productName || "Product"} 
                              className="order-success-product-image" 
                            />
                            <Box className="order-success-product-details">
                              <Typography className="order-success-product-name">
                                {product?.productName || "Product"}
                              </Typography>
                              {product?.productCollection && (
                                <Typography className="order-success-product-category">
                                  {product.productCollection}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className="order-success-table-cell" align="center">
                          <Typography className="order-success-quantity">{item.itemQuantity}</Typography>
                        </TableCell>
                        <TableCell className="order-success-table-cell" align="right">
                          <Typography className="order-success-price">${item.itemPrice.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell className="order-success-table-cell" align="right">
                          <Typography className="order-success-subtotal">${itemSubtotal.toFixed(2)}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Totals Section */}
            <Box className="order-success-totals">
              <Box className="order-success-totals-row">
                <Typography className="order-success-totals-label">Subtotal</Typography>
                <Typography className="order-success-totals-value">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box className="order-success-totals-row">
                <Typography className="order-success-totals-label">Shipping</Typography>
                <Typography className="order-success-totals-value">
                  {shipping > 0 ? `$${shipping.toFixed(2)}` : "$0.00"}
                </Typography>
              </Box>
              <Box className="order-success-totals-row">
                <Typography className="order-success-totals-label">Taxes</Typography>
                <Typography className="order-success-totals-value">${taxes.toFixed(2)}</Typography>
              </Box>
              {discount > 0 && (
                <Box className="order-success-totals-row">
                  <Typography className="order-success-totals-label">Coupon Discount</Typography>
                  <Typography className="order-success-totals-value discount">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>
              )}
              <Divider className="order-success-totals-divider" />
              <Box className="order-success-totals-row total-row">
                <Typography className="order-success-totals-label total-label">Total</Typography>
                <Typography className="order-success-totals-value total-value">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <Box className="order-success-cta">
          <Button
            component={NavLink}
            to="/products"
            variant="contained"
            className="order-success-continue-btn"
            startIcon={<ShoppingBagIcon />}
          >
            Continue Shopping
          </Button>
          <Button
            component={NavLink}
            to={`/orders/${orderId}/manage`}
            variant="outlined"
            className="order-success-track-btn"
            startIcon={<AssignmentIcon />}
          >
            Track & Manage Order
          </Button>
        </Box>
      </Container>

      {/* Newsletter Section - Full Width */}
      <Newsletter />
    </div>
  );
}
