import React from "react";
import { Box, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { useSelector } from "react-redux";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** REDUX SELECTOR **/
const newProductsRetriever = createSelector(retrieveNewProducts, (newProducts) => ({
  newProducts,
}));

export default function NewDishes() {
  const { newProducts } = useSelector(newProductsRetriever);

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
    <div className={"new-products-frame"}>
      <div className="new-products-container">
        <Box className="new-products-section">
          <Box className="section-header">
            <Box className="section-eyebrow">JUST LAUNCHED</Box>
            <Box className="section-title">New Arrivals</Box>
            <Box className="section-divider" />
          </Box>
          <Stack className={"cards-frame"}>
            {newProducts.length !== 0 ? (
              newProducts.map((product: Product) => {
                const imagePath = product.productImages?.[0]
                  ? `${serverApi}/${product.productImages[0]}`
                  : undefined;
                const hasImage = !!imagePath;
                const sizeVolume =
                  product.productCollection === ProductCollection.RING
                    ? product.productWeightGram + " gram"
                    : product.productSize + " size";
                
                return (
                  <Box key={product._id} className="new-arrival-card">
                    <Box className="new-arrival-card-image-wrapper">
                      <Box className="new-arrival-badge">{sizeVolume}</Box>
                      {hasImage && imagePath ? (
                        <>
                          <img
                            src={imagePath}
                            alt={product.productName || "New Arrival"}
                            className="new-arrival-card-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = "flex";
                            }}
                          />
                          <Box className="new-arrival-card-fallback" style={{ display: "none" }}>
                            <span className="fallback-text">Facet & Gold</span>
                          </Box>
                        </>
                      ) : (
                        <Box className="new-arrival-card-fallback">
                          <span className="fallback-text">Facet & Gold</span>
                        </Box>
                      )}
                    </Box>
                    <Box className="new-arrival-card-content">
                      <Box className="new-arrival-card-name">
                        {product.productName || "New Arrival"}
                      </Box>
                      <Box className="new-arrival-card-meta">
                        {getCollectionName(product.productCollection || ProductCollection.OTHER)}
                        {product.productDesc && ` • ${product.productDesc.substring(0, 30)}${product.productDesc.length > 30 ? '...' : ''}`}
                      </Box>
                      <Box className="new-arrival-card-footer">
                        <Box className="new-arrival-card-price">
                          ${product.productPrice || "0"}
                        </Box>
                        <Box className="new-arrival-card-views">
                          <VisibilityIcon className="views-icon" />
                          <span>{product.productViews || 0}</span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">New arrivals are not available yet</Box>
            )}
          </Stack>
        </Box>
      </div>
    </div>
  );
}
