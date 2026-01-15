import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, Card, CardContent, Stepper, Step, StepLabel, StepContent, Divider, Chip } from "@mui/material";
import { useParams, useHistory, NavLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DownloadIcon from "@mui/icons-material/Download";
import SupportIcon from "@mui/icons-material/Support";
import CancelIcon from "@mui/icons-material/Cancel";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import OrderService from "../../services/OrderService";
import { Order, OrderItem } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert, sweetFailureProvider, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import "../../../css/orderManagePage.css";

export default function OrderManagePage() {
  const { orderId } = useParams<{ orderId: string }>();
  const history = useHistory();
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

  const getOrderStatusStep = (status: OrderStatus): number => {
    switch (status) {
      case OrderStatus.PAUSE:
        return 0;
      case OrderStatus.PROCESS:
        return 2;
      case OrderStatus.FINISH:
        return 4;
      default:
        return 1;
    }
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

  const handleDownloadInvoice = () => {
    sweetTopSmallSuccessAlert("Invoice download will be available soon!", 2000);
  };

  const handleContactSupport = () => {
    sweetTopSmallSuccessAlert("Support team will contact you shortly!", 2000);
  };

  const handleRequestRefund = () => {
    if (order?.orderStatus === OrderStatus.FINISH) {
      sweetFailureProvider("Refund cannot be requested for delivered orders.", false, "");
      return;
    }
    sweetTopSmallSuccessAlert("Refund request submitted successfully!", 2000);
  };

  const handleCancelOrder = () => {
    if (order?.orderStatus !== OrderStatus.PAUSE && order?.orderStatus !== OrderStatus.PROCESS) {
      sweetFailureProvider("Order cannot be cancelled at this stage.", false, "");
      return;
    }
    sweetTopSmallSuccessAlert("Order cancellation request submitted!", 2000);
  };

  const handleWriteReview = () => {
    if (order?.orderStatus !== OrderStatus.FINISH) {
      sweetFailureProvider("Reviews can only be submitted for delivered orders.", false, "");
      return;
    }
    sweetTopSmallSuccessAlert("Review form will open shortly!", 2000);
  };

  if (loading) {
    return (
      <div className="order-manage-page">
        <Container maxWidth="lg">
          <Box className="order-manage-loading">
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-manage-page">
        <Container maxWidth="lg">
          <Box className="order-manage-empty">
            <Box className="order-manage-empty-icon">
              <ShoppingBagIcon />
            </Box>
            <Typography className="order-manage-empty-title">Order Not Found</Typography>
            <Typography className="order-manage-empty-subtitle">
              We couldn't find the order you're looking for.
            </Typography>
            <Button
              component={NavLink}
              to="/orders"
              variant="contained"
              className="order-manage-empty-btn"
            >
              Back to Orders
            </Button>
          </Box>
        </Container>
      </div>
    );
  }

  const activeStep = getOrderStatusStep(order.orderStatus);
  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );
  const shipping = order.orderDelivery || 0;
  const total = order.orderTotal;

  const steps = [
    { label: "Payment Confirmed", icon: <PaymentIcon />, description: "Payment confirmed — your jewellery is being prepared for delivery." },
    { label: "Accepted", icon: <CheckCircleIcon />, description: "Order accepted and confirmed." },
    { label: "Crafting in Progress", icon: <InventoryIcon />, description: "Your jewellery is being crafted with precision." },
    { label: "Handed to Courier", icon: <LocalShippingIcon />, description: "Your order is on the way to you." },
    { label: "Delivered", icon: <CheckCircleIcon />, description: "Your order has been successfully delivered." },
  ];

  return (
    <div className="order-manage-page">
      {/* Top Banner */}
      <Box className="order-manage-banner">
        <Container maxWidth="lg" className="order-manage-banner-container">
          <Box className="order-manage-breadcrumb">
            <NavLink to="/" className="breadcrumb-link">Home</NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <NavLink to="/orders" className="breadcrumb-link">Orders</NavLink>
            <NavigateNextIcon className="breadcrumb-separator" />
            <Typography className="breadcrumb-current">Track & Manage</Typography>
          </Box>
          <Typography className="order-manage-banner-title">Track & Manage Order</Typography>
          <Box className="order-manage-banner-info">
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Order ID</Typography>
              <Typography className="banner-info-value">#{order._id.substring(0, 12).toUpperCase()}</Typography>
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Payment Status</Typography>
              <Chip label="Completed" className="status-chip completed" size="small" icon={<CheckCircleIcon />} />
            </Box>
            <Box className="banner-info-item">
              <Typography className="banner-info-label">Order Status</Typography>
              <Chip 
                label={order.orderStatus === OrderStatus.PAUSE ? "Paused" : 
                       order.orderStatus === OrderStatus.PROCESS ? "Processing" : 
                       order.orderStatus === OrderStatus.FINISH ? "Delivered" : "Unknown"}
                className={`status-chip ${order.orderStatus === OrderStatus.FINISH ? "delivered" : "processing"}`}
                size="small"
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="order-manage-container">
        <Box className="order-manage-main-grid">
          {/* Left Column - Wider */}
          <Box className="order-manage-left-column">
            {/* Order Status Timeline */}
            <Card className="order-manage-card" elevation={0}>
              <CardContent className="order-manage-card-content">
                <Typography className="order-manage-card-title">Order Status</Typography>
                <Divider className="order-manage-divider" />
                <Stepper activeStep={activeStep} orientation="vertical" className="order-status-stepper">
                  {steps.map((step, index) => (
                    <Step key={index} completed={index < activeStep} active={index === activeStep}>
                      <StepLabel 
                        StepIconComponent={() => (
                          <Box className={`step-icon-wrapper ${index <= activeStep ? "active" : ""}`}>
                            {step.icon}
                          </Box>
                        )}
                        className="step-label"
                      >
                        <Typography className="step-title">{step.label}</Typography>
                        <Typography className="step-description">{step.description}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>

            {/* Shipment Card */}
            <Card className="order-manage-card" elevation={0}>
              <CardContent className="order-manage-card-content">
                <Typography className="order-manage-card-title">Shipment Details</Typography>
                <Divider className="order-manage-divider" />
                <Box className="shipment-details">
                  <Box className="shipment-detail-item">
                    <Typography className="shipment-label">Estimated Delivery Date</Typography>
                    <Typography className="shipment-value">{calculateEstimatedDelivery()}</Typography>
                  </Box>
                  <Box className="shipment-detail-item">
                    <Typography className="shipment-label">Carrier</Typography>
                    <Typography className="shipment-value">Facet Delivery</Typography>
                  </Box>
                  <Box className="shipment-detail-item">
                    <Typography className="shipment-label">Tracking Number</Typography>
                    <Typography className="shipment-value">Will be updated soon</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Products in Order */}
            <Card className="order-manage-card" elevation={0}>
              <CardContent className="order-manage-card-content">
                <Typography className="order-manage-card-title">Products in This Order</Typography>
                <Divider className="order-manage-divider" />
                <Box className="order-products-list">
                  {order.orderItems.map((item: OrderItem) => {
                    const product: Product = order.productData.find(
                      (p: Product) => p._id === item.productId
                    ) || order.productData[0];
                    const imagePath = product?.productImages?.[0] 
                      ? `${serverApi}/${product.productImages[0]}` 
                      : "/icons/default-product.svg";
                    const itemSubtotal = item.itemPrice * item.itemQuantity;
                    
                    return (
                      <Box key={item._id} className="order-product-item">
                        <img 
                          src={imagePath} 
                          alt={product?.productName || "Product"} 
                          className="order-product-image" 
                        />
                        <Box className="order-product-details">
                          <Typography className="order-product-name">
                            {product?.productName || "Product"}
                          </Typography>
                          {product?.productCollection && (
                            <Typography className="order-product-category">
                              {product.productCollection}
                            </Typography>
                          )}
                          <Typography className="order-product-quantity">
                            Quantity: {item.itemQuantity}
                          </Typography>
                        </Box>
                        <Typography className="order-product-price">
                          ${itemSubtotal.toFixed(2)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>

                {/* Totals */}
                <Divider className="order-manage-divider" sx={{ my: 3 }} />
                <Box className="order-totals">
                  <Box className="order-totals-row">
                    <Typography className="order-totals-label">Subtotal</Typography>
                    <Typography className="order-totals-value">${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box className="order-totals-row">
                    <Typography className="order-totals-label">Shipping</Typography>
                    <Typography className="order-totals-value">
                      {shipping > 0 ? `$${shipping.toFixed(2)}` : "$0.00"}
                    </Typography>
                  </Box>
                  <Divider className="order-manage-divider" sx={{ my: 2 }} />
                  <Box className="order-totals-row total-row">
                    <Typography className="order-totals-label total-label">Total</Typography>
                    <Typography className="order-totals-value total-value">
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Manage Actions */}
          <Box className="order-manage-right-column">
            <Card className="order-manage-card" elevation={0}>
              <CardContent className="order-manage-card-content">
                <Typography className="order-manage-card-title">Manage Your Order</Typography>
                <Divider className="order-manage-divider" />
                <Box className="manage-actions">
                  <Button
                    variant="outlined"
                    className="manage-action-btn"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadInvoice}
                    fullWidth
                  >
                    Download Invoice
                  </Button>
                  <Button
                    variant="outlined"
                    className="manage-action-btn"
                    startIcon={<SupportIcon />}
                    onClick={handleContactSupport}
                    fullWidth
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outlined"
                    className="manage-action-btn"
                    startIcon={<AssignmentIcon />}
                    onClick={handleRequestRefund}
                    disabled={order.orderStatus === OrderStatus.FINISH}
                    fullWidth
                  >
                    Request Refund
                  </Button>
                  <Button
                    variant="outlined"
                    className="manage-action-btn"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelOrder}
                    disabled={order.orderStatus !== OrderStatus.PAUSE && order.orderStatus !== OrderStatus.PROCESS}
                    fullWidth
                  >
                    Cancel Order
                  </Button>
                  <Button
                    variant="contained"
                    className="manage-action-btn primary"
                    startIcon={<RateReviewIcon />}
                    onClick={handleWriteReview}
                    disabled={order.orderStatus !== OrderStatus.FINISH}
                    fullWidth
                  >
                    Write Review
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
