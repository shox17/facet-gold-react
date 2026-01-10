import React from "react";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";

interface Category {
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    name: "Rings",
    image: "/img/rings.jpg",
  },
  {
    name: "Necklaces",
    image: "/img/necklaces.jpg",
  },
  {
    name: "Bracelets",
    image: "/img/bracelets.jpg",
  },
  {
    name: "Earrings",
    image: "/img/earrings.jpg",
  },
  {
    name: "New Arrivals",
    image: "/img/newarrivals.jpg",
  },
];

export default function ShopByCategory() {

  return (
    <div className="shop-by-category-section">
      <div className="category-section-container">
        <Box className="category-section-header">
          <Box className="category-eyebrow">OUR CATEGORIES</Box>
          <Box className="category-title">Shop By Category</Box>
          <Box className="category-header-divider" />
        </Box>
        <Stack className="category-cards-container" direction="row" spacing={0}>
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/products"
              className="category-card-link"
            >
              <Box className="category-card">
                <Box className="category-card-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-card-image"
                  />
                  <Box className="category-card-gradient-overlay" />
                </Box>
                <Box className="category-card-label">{category.name}</Box>
              </Box>
            </Link>
          ))}
        </Stack>
      </div>
    </div>
  );
}

