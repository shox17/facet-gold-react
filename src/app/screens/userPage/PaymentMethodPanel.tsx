import React from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { T } from "../../../lib/types/common";

export default function PaymentMethodPanel() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardName, setCardName] = useState("");

  const handleCardNumberChange = (e: T) => setCardNumber(e.target.value);
  const handleCardExpiryChange = (e: T) => setCardExpiry(e.target.value);
  const handleCardCVVChange = (e: T) => setCardCVV(e.target.value);
  const handleCardNameChange = (e: T) => setCardName(e.target.value);

  const handleSavePayment = () => {
    // Placeholder - implement payment method save logic if needed
    console.log("Save payment method:", { cardNumber, cardExpiry, cardCVV, cardName });
  };

  return (
    <Card className="checkout-form-card" elevation={0}>
      <CardContent className="checkout-form-content">
        <Typography className="account-panel-title">Payment Method</Typography>
        
        <Stack spacing={2.5} className="checkout-form-stack">
          <Box className="checkout-payment-icons-header">
            <img src="/icons/western-card.svg" alt="Western Union" />
            <img src="/icons/master-card.svg" alt="Mastercard" />
            <img src="/icons/paypal-card.svg" alt="PayPal" />
            <img src="/icons/visa-card.svg" alt="Visa" />
          </Box>
          
          <TextField
            label="Card Number *"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            fullWidth
            className="checkout-form-field"
            required
          />
          
          <Box className="checkout-form-row">
            <TextField
              label="Expiry Date *"
              placeholder="MM / YY"
              value={cardExpiry}
              onChange={handleCardExpiryChange}
              fullWidth
              className="checkout-form-field"
              required
            />
            <TextField
              label="CVV *"
              placeholder="123"
              value={cardCVV}
              onChange={handleCardCVVChange}
              fullWidth
              className="checkout-form-field"
              required
            />
          </Box>
          
          <TextField
            label="Cardholder Name *"
            placeholder="John Doe"
            value={cardName}
            onChange={handleCardNameChange}
            fullWidth
            className="checkout-form-field"
            required
          />
          
          <Button
            variant="contained"
            className="checkout-place-order-btn"
            onClick={handleSavePayment}
            fullWidth
          >
            Save Payment Method
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
