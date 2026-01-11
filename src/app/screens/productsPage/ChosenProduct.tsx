import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Avatar, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setJewelleryShop, setChosenProduct } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveJewelleryShop } from "./selector";
import { Member } from "../../../lib/types/member";
import { Product } from "../../../lib/types/product";
import MemberService from "../../services/MemberService";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import Newsletter from "../homePage/Newsletter";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setJewelleryShop: (data: Member) => dispatch(setJewelleryShop(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const jewelleryShopRetriever = createSelector(
  retrieveJewelleryShop,
  (jewelleryShop) => ({
    jewelleryShop,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setJewelleryShop, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { jewelleryShop } = useSelector(jewelleryShopRetriever);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [tabValue, setTabValue] = useState("1");

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getJewelleryShop()
      .then((data) => setJewelleryShop(data))
      .catch((err) => console.log(err));
  }, [productId, setChosenProduct, setJewelleryShop]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2 weeks ago",
      rating: 5,
      comment: "Absolutely stunning piece! The craftsmanship is exceptional and it arrived beautifully packaged. Highly recommend!",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "1 month ago",
      rating: 5,
      comment: "Perfect quality and exactly as described. The attention to detail is remarkable. A true luxury piece.",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Williams",
      date: "2 months ago",
      rating: 4,
      comment: "Beautiful jewellery, very elegant. The service was excellent and delivery was prompt. Very satisfied!",
      avatar: "EW",
    },
    {
      id: 4,
      name: "David Thompson",
      date: "3 months ago",
      rating: 5,
      comment: "Exceeded expectations! The quality is outstanding and the design is timeless. Will definitely purchase again.",
      avatar: "DT",
    },
  ];

  const averageRating = 4.9;
  const totalReviews = 245;
  const ratingDistribution = { 5: 85, 4: 12, 3: 2, 2: 1, 1: 0 };
  
  // Get product collection/category
  const getProductCategory = () => {
    if (!chosenProduct?.productCollection) return "Jewellery";
    return chosenProduct.productCollection.charAt(0) + chosenProduct.productCollection.slice(1).toLowerCase();
  };
  
  // Calculate compare at price (20% more)
  const compareAtPrice = chosenProduct ? (chosenProduct.productPrice * 1.2).toFixed(2) : "0.00";

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      {/* Breadcrumbs */}
      <Container className={"product-breadcrumbs-container"} maxWidth="lg">
        <Box className={"product-breadcrumbs"}>
          <Typography className={"breadcrumb-item"}>Home</Typography>
          <NavigateNextIcon className={"breadcrumb-separator"} />
          <Typography className={"breadcrumb-item"}>Shop</Typography>
          <NavigateNextIcon className={"breadcrumb-separator"} />
          <Typography className={"breadcrumb-item"}>{getProductCategory()}</Typography>
          <NavigateNextIcon className={"breadcrumb-separator"} />
          <Typography className={"breadcrumb-item active"}>Shop Details</Typography>
        </Box>
      </Container>

      {/* Jewellery Details Title */}
      <Container className={"jewellery-details-header-container"} maxWidth="lg">
        <Box className={"jewellery-details-header"}>
          <Typography className={"jewellery-details-title"}>
            Jewellery Details
          </Typography>
        </Box>
      </Container>

      {/* Main Product Section */}
      <Container className={"product-container"} maxWidth="lg">
        <Box className={"product-main-grid"} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
          {/* Left Column - Image Gallery */}
          <Box className={"product-image-column"} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box className={"product-image-gallery"}>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product-main-swiper"
              >
                {chosenProduct?.productImages.map((ele: string, index: number) => {
                  const imagePath = `${serverApi}/${ele}`;
                  return (
                    <SwiperSlide key={index}>
                      <img className="product-main-image" src={imagePath} alt={chosenProduct?.productName} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              
              {/* Thumbnail Strip */}
              {chosenProduct?.productImages.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="product-thumbnails-swiper"
                >
                  {chosenProduct?.productImages.map((ele: string, index: number) => {
                    const imagePath = `${serverApi}/${ele}`;
                    return (
                      <SwiperSlide key={index}>
                        <img className="product-thumbnail" src={imagePath} alt={`Thumbnail ${index + 1}`} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </Box>
          </Box>

          {/* Right Column - Product Info */}
          <Box className={"product-info-column"} sx={{ width: { xs: '100%', md: '50%' } }}>
            <Box className={"product-info-box"}>
              {/* Product Category */}
              <Typography className={"product-category"}>
                {getProductCategory()}
              </Typography>
              
              {/* Product Name with In Stock Badge */}
              <Box className={"product-name-row"}>
                <Typography className={"product-name"}>
                  {chosenProduct?.productName}
                </Typography>
                <Chip 
                  label="In Stock" 
                  className={"product-stock-badge"}
                  size="small"
                />
              </Box>
              
              {/* Rating with Review Count */}
              <Box className={"product-rating-section"}>
                <Rating 
                  name="product-rating" 
                  value={averageRating} 
                  precision={0.1} 
                  readOnly
                  className={"product-rating"}
                />
                <Typography className={"product-rating-text"}>
                  {averageRating.toFixed(1)} ({totalReviews} Reviews)
                </Typography>
              </Box>

              {/* Price Section */}
              <Box className={"product-price-section"}>
                <Typography className={"product-price-value"}>
                  ${chosenProduct?.productPrice}
                </Typography>
                <Typography className={"product-price-original"}>
                  ${compareAtPrice}
                </Typography>
              </Box>

              {/* Short Description - One Line Highlight */}
              <Typography className={"product-short-desc"}>
                {chosenProduct?.productDesc
                  ? chosenProduct?.productDesc.length > 120
                    ? `${chosenProduct?.productDesc.substring(0, 120).trim()}...`
                    : chosenProduct?.productDesc
                  : "Exquisite craftsmanship meets timeless elegance. This premium piece embodies luxury and sophistication."}
              </Typography>
              
              {/* View Count - Subtle */}
              <Box className={"product-view-section"}>
                <RemoveRedEyeIcon className={"view-icon"} />
                <Typography className={"view-count-text"}>
                  {chosenProduct?.productViews || 0} views
                </Typography>
              </Box>

              {/* Add to Cart Button */}
              <Button
                variant="contained"
                className={"product-add-to-cart-btn"}
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Tabbed Information Section */}
      <Container className={"product-tabs-section"} maxWidth="lg">
        <Box className={"product-tabs-container"}>
          <TabContext value={tabValue}>
            <Box className={"product-tabs-wrapper"}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                className={"product-tabs"}
              >
                <Tab label="Description" value="1" />
                <Tab label="Additional Information" value="2" />
                <Tab label="Review" value="3" />
              </Tabs>
            </Box>

            <TabPanel value="1">
              <Box className={"product-tab-panel"}>
                <Box className={"product-description-content"}>
                  {chosenProduct?.productDesc ? (
                    <>
                      <Typography className={"product-description-text"}>
                        {chosenProduct.productDesc}
                      </Typography>
                      <Box className={"product-description-features"}>
                        <Box className={"feature-item"}>
                          <Box className={"feature-icon"}>✓</Box>
                          <Typography className={"feature-text"}>
                            Handcrafted with precision and exceptional attention to detail
                          </Typography>
                        </Box>
                        <Box className={"feature-item"}>
                          <Box className={"feature-icon"}>✓</Box>
                          <Typography className={"feature-text"}>
                            Premium materials sourced from trusted suppliers worldwide
                          </Typography>
                        </Box>
                        <Box className={"feature-item"}>
                          <Box className={"feature-icon"}>✓</Box>
                          <Typography className={"feature-text"}>
                            Certified authenticity and quality guarantee included
                          </Typography>
                        </Box>
                        <Box className={"feature-item"}>
                          <Box className={"feature-icon"}>✓</Box>
                          <Typography className={"feature-text"}>
                            Elegant luxury packaging included with every purchase
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Typography className={"product-description-text"}>
                      This exquisite piece embodies the timeless elegance and superior craftsmanship that defines our collection. 
                      Each detail has been carefully considered to create a piece that will be treasured for generations.
                    </Typography>
                  )}
                </Box>
              </Box>
            </TabPanel>

          <TabPanel value="2">
            <Box className={"product-tab-panel"}>
              <Box className={"product-additional-info"}>
                <Box className={"info-table-grid"}>
                  <Box className={"info-table-cell"}>
                    <Typography className={"info-label"}>Material</Typography>
                    <Typography className={"info-value"}>18K Gold</Typography>
                  </Box>
                  <Box className={"info-table-cell"}>
                    <Typography className={"info-label"}>Gemstones</Typography>
                    <Typography className={"info-value"}>Diamond</Typography>
                  </Box>
                  <Box className={"info-table-cell"}>
                    <Typography className={"info-label"}>Weight</Typography>
                    <Typography className={"info-value"}>
                      {chosenProduct?.productWeightGram || "N/A"}g
                    </Typography>
                  </Box>
                  <Box className={"info-table-cell"}>
                    <Typography className={"info-label"}>Brand</Typography>
                    <Typography className={"info-value"}>
                      {jewelleryShop?.memberNick || "Facet & Gold"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value="3">
            <Box className={"product-tab-panel"}>
              <Box className={"product-reviews-content"}>
                {/* Reviews Summary Row */}
                <Box className={"reviews-header-row"}>
                  <Box className={"reviews-summary-left"}>
                    <Typography className={"reviews-average-rating"}>
                      {averageRating.toFixed(1)} out of 5
                    </Typography>
                    <Rating 
                      value={averageRating} 
                      precision={0.1} 
                      readOnly 
                      className={"reviews-rating-stars"}
                    />
                  </Box>
                  
                  <Box className={"reviews-distribution-right"}>
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Box key={star} className={"review-bar-row"}>
                        <Typography className={"review-star-label"}>{star}★</Typography>
                        <Box className={"review-bar-container"}>
                          <Box 
                            className={"review-bar-fill"} 
                            sx={{ width: `${ratingDistribution[star as keyof typeof ratingDistribution]}%` }}
                          />
                        </Box>
                        <Typography className={"review-bar-percentage"}>
                          {ratingDistribution[star as keyof typeof ratingDistribution]}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Reviews List */}
                <Box className={"reviews-list"}>
                  {mockReviews.map((review) => (
                    <Box key={review.id} className={"review-item"}>
                      <Box className={"review-header"}>
                        <Avatar className={"review-avatar"}>{review.avatar}</Avatar>
                        <Box className={"review-meta"}>
                          <Typography className={"review-name"}>{review.name}</Typography>
                          <Typography className={"review-date"}>{review.date}</Typography>
                        </Box>
                        <Rating value={review.rating} readOnly size="small" className={"review-rating"} />
                      </Box>
                      <Typography className={"review-comment"}>{review.comment}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
        </Box>
      </Container>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
