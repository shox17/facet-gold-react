import React, { useEffect, useRef, useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function BrandStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="brand-story-section" ref={sectionRef}>
      <div className="brand-story-container">
        <Stack
          className={`brand-story-content ${isVisible ? "visible" : ""}`}
          direction="row"
          spacing={0}
        >
          <Box className="brand-story-image-wrapper">
            <Box className="brand-story-badge">HANDCRAFTED</Box>
            <img
              src="/img/jewelry.jpg"
              alt="Craftsmanship at Facet & Gold"
              className="brand-story-image"
            />
          </Box>
          <Box className="brand-story-text-wrapper">
            <Box className="brand-story-label">OUR CRAFT</Box>
            <Box className="brand-story-heading">
              Timeless Elegance, Handcrafted with Care
            </Box>
            <Box className="brand-story-divider" />
            <Box className="brand-story-intro">
              <p>
                At Facet & Gold, we believe that true luxury lies in the details. 
                Each piece is meticulously crafted by skilled artisans using only 
                the finest materials, ensuring every creation meets our exacting standards.
              </p>
            </Box>
            <Box className="brand-story-highlights">
              <Box className="brand-story-highlight-item">
                <Box className="highlight-bullet" />
                <span>Ethically sourced stones</span>
              </Box>
              <Box className="brand-story-highlight-item">
                <Box className="highlight-bullet" />
                <span>18K gold & premium metals</span>
              </Box>
              <Box className="brand-story-highlight-item">
                <Box className="highlight-bullet" />
                <span>Hand-finished by artisans</span>
              </Box>
            </Box>
            <Box className="brand-story-trust-row">
              <Box className="brand-story-trust-item">
                <LocalShippingIcon className="trust-icon" />
                <span>Free Shipping $200+</span>
              </Box>
              <Box className="brand-story-trust-item">
                <AssignmentReturnIcon className="trust-icon" />
                <span>14-Day Returns</span>
              </Box>
              <Box className="brand-story-trust-item">
                <VerifiedIcon className="trust-icon" />
                <span>Certified Materials</span>
              </Box>
            </Box>
            <Button
              className="brand-story-cta"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Learn About Our Craft
            </Button>
          </Box>
        </Stack>
      </div>
    </div>
  );
}

