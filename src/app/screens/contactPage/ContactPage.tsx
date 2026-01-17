import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button, Card, CardContent, Stack } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { NavLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import Newsletter from "../homePage/Newsletter";
import "../../../css/contactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    sweetTopSmallSuccessAlert("Message sent successfully! We'll get back to you soon.", 3000);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <Box className="contact-header-section">
        <Container className="contact-header-container" maxWidth="lg">
          <Box className="contact-breadcrumb">
            <Typography component={NavLink} to="/" className="breadcrumb-item">
              Home
            </Typography>
            <Typography className="breadcrumb-separator">/</Typography>
            <Typography className="breadcrumb-item active">Contact Us</Typography>
          </Box>
          <Box className="contact-header-title">Contact Us</Box>
          <Box className="contact-header-subtitle">Get in touch with us</Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" className="contact-container">
        {/* Contact Form and Image Section */}
        <Box className="contact-form-section">
          <Grid container spacing={4}>
            {/* Left Column - Contact Form */}
            <Grid item xs={12} md={6}>
              <Card className="contact-form-card" elevation={0}>
                <CardContent className="contact-form-content">
                  <Box className="contact-section-header">
                    <Typography className="contact-form-title">Get in Touch</Typography>
                  </Box>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5} className="contact-form-stack">
                      <Box className="contact-form-row">
                        <TextField
                          name="name"
                          label="Your Name *"
                          placeholder="Ex. John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          fullWidth
                          className="contact-form-field"
                        />
                        <TextField
                          name="email"
                          label="Email *"
                          type="email"
                          placeholder="example@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          fullWidth
                          className="contact-form-field"
                        />
                      </Box>
                      <TextField
                        name="subject"
                        label="Subject *"
                        placeholder="Enter Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        className="contact-form-field"
                      />
                      <TextField
                        name="message"
                        label="Your Message *"
                        placeholder="Enter here."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={6}
                        fullWidth
                        className="contact-form-field"
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        className="contact-submit-btn"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column - Image */}
            <Grid item xs={12} md={6}>
              <Box className="contact-image-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL || ''}/img/contactus.jpg`}
                  alt="Contact Us"
                  className="contact-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/icons/default-contact.svg";
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Contact Information Cards */}
        <Box className="contact-info-section">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className="contact-info-card" elevation={0}>
                <CardContent className="contact-info-card-content">
                  <Box className="contact-info-icon-wrapper">
                    <LocationOnIcon className="contact-info-icon" />
                  </Box>
                  <Typography className="contact-info-title">Address</Typography>
                  <Typography className="contact-info-text">
                    123 Gangnam-daero, Gangnam-gu<br />
                    Seoul, South Korea 06000
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="contact-info-card" elevation={0}>
                <CardContent className="contact-info-card-content">
                  <Box className="contact-info-icon-wrapper">
                    <PhoneIcon className="contact-info-icon" />
                  </Box>
                  <Typography className="contact-info-title">Phone</Typography>
                  <Typography className="contact-info-text">
                    +82-2-1234-5678
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="contact-info-card" elevation={0}>
                <CardContent className="contact-info-card-content">
                  <Box className="contact-info-icon-wrapper">
                    <EmailIcon className="contact-info-icon" />
                  </Box>
                  <Typography className="contact-info-title">Email</Typography>
                  <Typography className="contact-info-text">
                    contact@facetandgold.com
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Map Section */}
        <Box className="contact-map-section">
          <iframe
            title="Facet & Gold Store Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1157956945285!2d127.00147907550128!3d37.50518697205449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca17b9151635d%3A0xcb143e3ba25deff0!2sTiffany%20%26%20Co.!5e0!3m2!1sen!2skr!4v1767944829358!5m2!1sen!2skr"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "18px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contact-map"
          />
        </Box>

        {/* Feature Section */}
        <Box className="contact-features-section">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className="contact-feature-card" elevation={0}>
                <CardContent className="contact-feature-card-content">
                  <Box className="contact-feature-icon-wrapper">
                    <LocalShippingIcon className="contact-feature-icon" />
                  </Box>
                  <Typography className="contact-feature-title">Free Shipping</Typography>
                  <Typography className="contact-feature-text">
                    Free shipping for order above $200
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="contact-feature-card" elevation={0}>
                <CardContent className="contact-feature-card-content">
                  <Box className="contact-feature-icon-wrapper">
                    <PaymentIcon className="contact-feature-icon" />
                  </Box>
                  <Typography className="contact-feature-title">Flexible Payment</Typography>
                  <Typography className="contact-feature-text">
                    Multiple secure payment options
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="contact-feature-card" elevation={0}>
                <CardContent className="contact-feature-card-content">
                  <Box className="contact-feature-icon-wrapper">
                    <SupportAgentIcon className="contact-feature-icon" />
                  </Box>
                  <Typography className="contact-feature-title">24x7 Support</Typography>
                  <Typography className="contact-feature-text">
                    We support online all days.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
