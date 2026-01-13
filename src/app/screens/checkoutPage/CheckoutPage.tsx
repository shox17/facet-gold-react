import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Card, CardContent, Divider, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Chip, Stack } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "../ordersPage/selector";
import Newsletter from "../homePage/Newsletter";
import "../../../css/checkout.css";
import "../../../css/home.css";

interface CheckoutPageProps {
  cartItems: CartItem[];
  onDeleteAll: () => void;
}

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

export default function CheckoutPage(props: CheckoutPageProps) {
  const { cartItems, onDeleteAll } = props;
  const history = useHistory();
  const location = useLocation();
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  
  // Get orderId from query params
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  
  // Form state
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [companyName, setCompanyName] = useState("Acme Corporation");
  const [country, setCountry] = useState("KR"); // Default to South Korea
  const [streetAddress, setStreetAddress] = useState("123 Main Street, Gangnam District");
  const [city, setCity] = useState("Incheon"); // Default to Incheon
  const [zipCode, setZipCode] = useState("22000");
  const [phone, setPhone] = useState("010-1234-5678");
  const [email, setEmail] = useState("john.doe@example.com");
  const [deliveryNote, setDeliveryNote] = useState("Please leave at the front door");
  const [deliveryAddress, setDeliveryAddress] = useState("same");
  const [cardNumber, setCardNumber] = useState("1234 5678 9012 3456");
  const [cardPeriod, setCardPeriod] = useState("12/25");
  const [cardCVV, setCardCVV] = useState("123");
  const [cardCreator, setCardCreator] = useState("John Doe");
  
  // Order data (if loading from paused order)
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  
  // Load order data if orderId is provided
  useEffect(() => {
    const loadOrderData = async () => {
      if (orderId) {
        // First try to find in pausedOrders
        if (pausedOrders && pausedOrders.length > 0) {
          const order = pausedOrders.find((o: Order) => o._id === orderId);
          if (order) {
            setOrderData(order);
            // Convert order items to cart items format
            const items: CartItem[] = order.orderItems.map((item: OrderItem) => {
              const product: Product = order.productData.find(
                (p: Product) => p._id === item.productId
              ) || order.productData[0];
              return {
                _id: item.productId,
                quantity: item.itemQuantity,
                price: item.itemPrice,
                name: product?.productName || "Product",
                image: product?.productImages[0] || "",
              };
            });
            setOrderItems(items);
            return;
          }
        }
        
        // If not found in pausedOrders, fetch it directly
        try {
          const orderService = new OrderService();
          const allOrders = await orderService.getMyOrders({
            page: 1,
            limit: 100,
            orderStatus: OrderStatus.PAUSE,
          });
          const order = allOrders.find((o: Order) => o._id === orderId);
          if (order) {
            setOrderData(order);
            // Convert order items to cart items format
            const items: CartItem[] = order.orderItems.map((item: OrderItem) => {
              const product: Product = order.productData.find(
                (p: Product) => p._id === item.productId
              ) || order.productData[0];
              return {
                _id: item.productId,
                quantity: item.itemQuantity,
                price: item.itemPrice,
                name: product?.productName || "Product",
                image: product?.productImages[0] || "",
              };
            });
            setOrderItems(items);
          } else {
            // If order not found, fall back to cart items
            setOrderItems(cartItems);
          }
        } catch (err) {
          console.log("Error loading order:", err);
          // Fall back to cart items on error
          setOrderItems(cartItems);
        }
      } else {
        setOrderItems(cartItems);
      }
    };

    loadOrderData();
  }, [orderId, pausedOrders, cartItems]);
  
  // Pre-fill form with member data if available (overrides defaults)
  useEffect(() => {
    if (authMember) {
      if (authMember.memberPhone) {
        setPhone(authMember.memberPhone);
      }
      if (authMember.memberAddress) {
        setStreetAddress(authMember.memberAddress);
      }
    }
  }, [authMember]);
  
  // Calculate prices
  const itemsPrice: number = orderItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const shippingCost: number = itemsPrice < 1500 ? 10 : 0;
  const taxes: number = 0;
  const couponDiscount: number = 0;
  const totalPrice: number = itemsPrice + shippingCost + taxes - couponDiscount;
  const totalItems: number = orderItems.reduce(
    (a: number, c: CartItem) => a + c.quantity,
    0
  );
  
  const placeOrderHandler = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      
      // Basic validation
      if (!firstName || !lastName || !country || !streetAddress || !city || !zipCode || !phone || !email) {
        throw new Error("Please fill in all required fields");
      }
      
      if (orderItems.length === 0) {
        throw new Error("Your cart is empty");
      }
      
      // If orderId exists, update the order status to PROCESS
      if (orderId && orderData) {
        const order = new OrderService();
        const updatedOrder = await order.updateOrder({
          orderId: orderId,
          orderStatus: OrderStatus.PROCESS,
        });
        setOrderBuilder(new Date());
        await sweetTopSuccessAlert("Order placed successfully!", 700);
        history.push(`/order-success/${updatedOrder._id}`);
      } else {
        // Create new order from cart
        const order = new OrderService();
        const createdOrder = await order.createOrder(orderItems);
        
        onDeleteAll();
        setOrderBuilder(new Date());
        await sweetTopSuccessAlert("Order placed successfully!", 700);
        history.push(`/order-success/${createdOrder._id}`);
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  
  if (!authMember) {
    history.push("/");
    return null;
  }
  
  return (
    <div className="checkout-page">
      {/* Header Section */}
      <Box className="checkout-header-section">
        <Container className="checkout-header-container" maxWidth="lg">
          <Box className="checkout-header-title">Checkout</Box>
          <Box className="checkout-breadcrumbs">
            <Typography className="breadcrumb-item">Home</Typography>
            <NavigateNextIcon className="breadcrumb-separator" />
            <Typography className="breadcrumb-item">Shopping Cart</Typography>
            <NavigateNextIcon className="breadcrumb-separator" />
            <Typography className="breadcrumb-item active">Checkout</Typography>
          </Box>
        </Container>
      </Box>
      
      {/* Main Content */}
      <Container className="checkout-main-container" maxWidth="lg">
        <Box className="checkout-content-grid">
          {/* Left Column - Billing Details Form */}
          <Box className="checkout-form-column">
            <Card className="checkout-form-card" elevation={0}>
              <CardContent className="checkout-form-content">
                <Box className="checkout-section-header">
                  <Typography className="checkout-form-title">Billing Details</Typography>
                </Box>
                
                <Stack spacing={2.5} className="checkout-form-stack">
                  <Box className="checkout-form-row">
                    <TextField
                      className="checkout-form-field"
                      label="First Name *"
                      placeholder="Ex. John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      className="checkout-form-field"
                      label="Last Name *"
                      placeholder="Ex. Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      fullWidth
                    />
                  </Box>
                  
                  <TextField
                    className="checkout-form-field"
                    label="Company Name (Optional)"
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                  />
                  
                  {/* Country and City in one row */}
                  <Box className="checkout-form-row">
                    <TextField
                      className="checkout-form-field"
                      label="Country *"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        // Reset city when country changes
                        setCity("");
                      }}
                      required
                      fullWidth
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="KR">South Korea</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="JP">Japan</option>
                      <option value="CN">China</option>
                      <option value="SG">Singapore</option>
                    </TextField>
                    <TextField
                      className="checkout-form-field"
                      label="City *"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      fullWidth
                      select
                      SelectProps={{ native: true }}
                    >
                      <option value="">Select City</option>
                      {country === "KR" ? (
                        <>
                          <option value="Seoul">Seoul</option>
                          <option value="Busan">Busan</option>
                          <option value="Incheon">Incheon</option>
                          <option value="Daegu">Daegu</option>
                          <option value="Daejeon">Daejeon</option>
                          <option value="Gwangju">Gwangju</option>
                          <option value="Ulsan">Ulsan</option>
                          <option value="Suwon">Suwon</option>
                          <option value="Seongnam">Seongnam</option>
                          <option value="Goyang">Goyang</option>
                          <option value="Yongin">Yongin</option>
                          <option value="Changwon">Changwon</option>
                          <option value="Sejong">Sejong</option>
                          <option value="Jeju">Jeju</option>
                        </>
                      ) : country === "US" ? (
                        <>
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Houston">Houston</option>
                          <option value="Phoenix">Phoenix</option>
                          <option value="Philadelphia">Philadelphia</option>
                        </>
                      ) : (
                        <>
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                        </>
                      )}
                    </TextField>
                  </Box>
                  
                  {/* Street Address and Zip Code in one row */}
                  <Box className="checkout-form-row">
                    <TextField
                      className="checkout-form-field"
                      label="Street Address *"
                      placeholder="Enter Street Address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      className="checkout-form-field"
                      label="Zip Code *"
                      placeholder="Enter Zip Code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                      fullWidth
                    />
                  </Box>
                  
                  <TextField
                    className="checkout-form-field"
                    label="Phone *"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    fullWidth
                  />
                  
                  <TextField
                    className="checkout-form-field checkout-email-field"
                    label="Email *"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    type="email"
                  />
                  
                  <Divider className="checkout-form-divider" />
                  
                  <FormControl component="fieldset" className="checkout-delivery-address" fullWidth>
                    <FormLabel component="legend" className="checkout-delivery-label">
                      Delivery Address *
                    </FormLabel>
                    <RadioGroup
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    >
                      <FormControlLabel
                        value="same"
                        control={<Radio />}
                        label="Same as shipping address"
                      />
                      <FormControlLabel
                        value="different"
                        control={<Radio />}
                        label="Use a different billing address"
                      />
                    </RadioGroup>
                  </FormControl>
                  
                  <TextField
                    className="checkout-form-field checkout-delivery-note-field"
                    label="Delivery Note (Optional)"
                    placeholder="Add delivery instructions..."
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </Stack>
              </CardContent>
            </Card>
            
            {/* Payment Method Card */}
            <Card className="checkout-payment-card" elevation={0}>
              <CardContent className="checkout-payment-content">
                <Box className="checkout-section-header">
                  <Typography className="checkout-payment-title">Payment Method</Typography>
                </Box>
                
                <Stack spacing={2.5} className="checkout-form-stack">
                  <Box className="checkout-payment-icons-header">
                    <img src="/icons/western-card.svg" alt="Western Union" />
                    <img src="/icons/master-card.svg" alt="Mastercard" />
                    <img src="/icons/paypal-card.svg" alt="PayPal" />
                    <img src="/icons/visa-card.svg" alt="Visa" />
                  </Box>
                  
                  <TextField
                    className="checkout-form-field"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    fullWidth
                  />
                  
                  <Box className="checkout-form-row">
                    <TextField
                      className="checkout-form-field"
                      label="Expiry Date"
                      placeholder="MM / YY"
                      value={cardPeriod}
                      onChange={(e) => setCardPeriod(e.target.value)}
                      fullWidth
                    />
                    <TextField
                      className="checkout-form-field"
                      label="CVV"
                      placeholder="123"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      fullWidth
                    />
                  </Box>
                  
                  <TextField
                    className="checkout-form-field checkout-cardholder-field"
                    label="Cardholder Name"
                    placeholder="John Doe"
                    value={cardCreator}
                    onChange={(e) => setCardCreator(e.target.value)}
                    fullWidth
                  />
                </Stack>
              </CardContent>
            </Card>
          </Box>
          
          {/* Right Column - Order Summary */}
          <Box className="checkout-summary-column">
            <Card className="checkout-summary-card" elevation={0}>
              <CardContent className="checkout-summary-content">
                <Typography className="checkout-summary-title">Order Summary</Typography>
                <Divider className="checkout-summary-divider" />
                
                <Box className="checkout-summary-row">
                  <Typography className="checkout-summary-label">Items</Typography>
                  <Typography className="checkout-summary-value">{totalItems}</Typography>
                </Box>
                
                <Box className="checkout-summary-row">
                  <Typography className="checkout-summary-label">Sub Total</Typography>
                  <Typography className="checkout-summary-value">${itemsPrice.toFixed(2)}</Typography>
                </Box>
                
                <Box className="checkout-summary-row">
                  <Typography className="checkout-summary-label">Shipping</Typography>
                  <Typography className="checkout-summary-value">
                    {shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "$0.00"}
                  </Typography>
                </Box>
                
                <Box className="checkout-summary-row">
                  <Typography className="checkout-summary-label">Taxes</Typography>
                  <Typography className="checkout-summary-value">${taxes.toFixed(2)}</Typography>
                </Box>
                
                {couponDiscount > 0 && (
                  <Box className="checkout-summary-row">
                    <Typography className="checkout-summary-label">Coupon Discount</Typography>
                    <Typography className="checkout-summary-value discount">
                      -${couponDiscount.toFixed(2)}
                    </Typography>
                  </Box>
                )}
                
                <Divider className="checkout-summary-divider" />
                
                <Box className="checkout-summary-row total-row">
                  <Typography className="checkout-summary-label total-label">Total</Typography>
                  <Typography className="checkout-summary-value total-value">
                    ${totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  className="checkout-place-order-btn"
                  startIcon={<ShoppingCartIcon />}
                  fullWidth
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
