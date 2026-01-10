import React from "react";
import { Box, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SELECTOR **/
const popularProductsRetriever = createSelector(
  retrievePopularProducts,
  (popularProducts) => ({ popularProducts })
);

export default function PopularDishes() {
  const { popularProducts } = useSelector(popularProductsRetriever);

  const getCollectionName = (collection: ProductCollection): string => {
    switch (collection) {
      case ProductCollection.RING:
        return "Ring";
      case ProductCollection.NECKLACE:
        return "Necklace";
      case ProductCollection.BRACELET:
        return "Bracelet";
      case ProductCollection.EARRING:
        return "Earring";
      default:
        return "Jewellery";
    }
  };

  return (
    <div className="popular-dishes-frame">
      <div className="popular-section-container">
        <Box className="popular-section">
          <Box className="section-header">
            <Box className="section-eyebrow">MOST LOVED • CURATED</Box>
            <Box className="section-title">Signature Pieces</Box>
            <Box className="section-divider" />
          </Box>
          <Stack className="cards-frame">
            {popularProducts.length !== 0 ? (
              popularProducts.map((product: Product) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : undefined;
                const hasImage = !!imagePath;
                
                return (
                  <Box key={product._id} className="signature-card">
                    <Box className="signature-card-image-wrapper">
                      {hasImage && imagePath ? (
                        <>
                          <img
                            src={imagePath}
                            alt={product.productName || "Signature Piece"}
                            className="signature-card-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <Box className="signature-card-fallback" style={{ display: "none" }}>
                            <span className="fallback-text">Facet & Gold</span>
                          </Box>
                        </>
                      ) : (
                        <Box className="signature-card-fallback">
                          <span className="fallback-text">Facet & Gold</span>
                        </Box>
                      )}
                    </Box>
                    <Box className="signature-card-content">
                      <Box className="signature-card-category">
                        {getCollectionName(product.productCollection || ProductCollection.OTHER)}
                      </Box>
                      <Box className="signature-card-name">
                        {product.productName || "Signature Piece"}
                      </Box>
                      {product.productDesc && (
                        <Box className="signature-card-description">
                          {product.productDesc}
                        </Box>
                      )}
                      <Box className="signature-card-footer">
                        <Box className="signature-card-price">
                          ${product.productPrice || "0"}
                        </Box>
                        <Box className="signature-card-views">
                          <VisibilityIcon className="views-icon" />
                          <span>{product.productViews || 0}</span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">Signature pieces are not available</Box>
            )}
          </Stack>
        </Box>
      </div>
    </div>
  );
}
