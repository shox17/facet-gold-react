import React from "react";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../../css/footer.css";

export default function Footer() {
  const authMember = null;

  return (
    <footer className="premium-footer">
      <Container maxWidth="lg" className="footer-container">
        <div className="footer-content">
          {/* Left Column - Brand */}
          <div className="footer-column footer-brand">
            <Box className="footer-brand-name">FACET & GOLD</Box>
            <Box className="footer-brand-tagline">Fine Jewellery</Box>
            <Box className="footer-description">
              At Facet & Gold, we believe that true luxury lies in the details.
              Each piece is meticulously crafted by skilled artisans using only
              the finest materials, ensuring every creation meets our exacting
              standards.
            </Box>
            <Box className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <img src="/icons/facebook.svg" alt="Facebook" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <img src="/icons/twitter.svg" alt="Twitter" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram"
              >
                <img src="/icons/instagram.svg" alt="Instagram" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="YouTube"
              >
                <img src="/icons/youtube.svg" alt="YouTube" />
              </a>
            </Box>
          </div>

          {/* Middle Columns */}
          <div className="footer-column footer-links">
            <Box className="footer-column-title">Company</Box>
            <Box className="footer-link-list">
              <Link to="/" className="footer-link">
                About Us
              </Link>
              <Link to="/help" className="footer-link">
                Blog
              </Link>
              <Link to="/help" className="footer-link">
                Contact Us
              </Link>
              <Link to="/help" className="footer-link">
                Career
              </Link>
            </Box>
          </div>

          <div className="footer-column footer-links">
            <Box className="footer-column-title">Customer Services</Box>
            <Box className="footer-link-list">
              <Link to="/member-page" className="footer-link">
                My Account
              </Link>
              <Link to="/orders" className="footer-link">
                Track Your Order
              </Link>
              <Link to="/help" className="footer-link">
                Return
              </Link>
              <Link to="/help" className="footer-link">
                FAQ
              </Link>
            </Box>
          </div>

          <div className="footer-column footer-links">
            <Box className="footer-column-title">Our Information</Box>
            <Box className="footer-link-list">
              <Link to="/help" className="footer-link">
                Privacy
              </Link>
              <Link to="/help" className="footer-link">
                User Terms & Condition
              </Link>
              <Link to="/help" className="footer-link">
                Return Policy
              </Link>
            </Box>
          </div>

          {/* Right Column - Contact Info */}
          <div className="footer-column footer-contact">
            <Box className="footer-column-title">Contact Info</Box>
            <Box className="footer-contact-list">
              <Box className="footer-contact-item">
                <PhoneIcon className="contact-icon" />
                <span>+971 4 554 7777</span>
              </Box>
              <Box className="footer-contact-item">
                <EmailIcon className="contact-icon" />
                <span>info@facetandgold.com</span>
              </Box>
              <Box className="footer-contact-item">
                <LocationOnIcon className="contact-icon" />
                <span>Downtown, Dubai, UAE</span>
              </Box>
            </Box>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <Box className="footer-copyright">
            Copyright © 2026 Facet & Gold. All Rights Reserved.
          </Box>
        </div>
      </Container>
    </footer>
  );
}
