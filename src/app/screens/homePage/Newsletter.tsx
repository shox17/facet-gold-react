import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="newsletter-section">
      <div className="newsletter-container">
        <Box className="newsletter-content">
          <Box className="newsletter-label">OUR NEWSLETTER</Box>
          <Box className="newsletter-heading">
            Subscribe to Our Newsletter to Get Updates to Our Latest Collection
          </Box>
          <Box className="newsletter-subtext">
            Get 20% off on your first order just by subscribing to our newsletter
          </Box>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <TextField
              className="newsletter-input"
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
            <Button
              type="submit"
              className="newsletter-button"
              variant="contained"
            >
              Subscribe
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}

