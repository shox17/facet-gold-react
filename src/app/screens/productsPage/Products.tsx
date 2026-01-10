import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Stack, Select, MenuItem, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Newsletter from "../homePage/Newsletter";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.RING,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const getCollectionLabel = (collection: ProductCollection): string => {
    switch (collection) {
      case ProductCollection.RING:
        return "Rings";
      case ProductCollection.NECKLACE:
        return "Necklaces";
      case ProductCollection.BRACELET:
        return "Bracelets";
      case ProductCollection.EARRING:
        return "Earrings";
      case ProductCollection.OTHER:
        return "Other";
      default:
        return "All";
    }
  };

  const collections = [
    ProductCollection.RING,
    ProductCollection.NECKLACE,
    ProductCollection.BRACELET,
    ProductCollection.EARRING,
    ProductCollection.OTHER,
  ];

  const brands = [
    { name: "Aurora", slug: "aurora", image: "aurora_brand.jpg" },
    { name: "Luna", slug: "luna", image: "luna_brand.jpg" },
    { name: "Celeste", slug: "celeste", image: "celeste_brand.jpg" },
    { name: "Eclipse", slug: "eclipse", image: "eclipse_brand.jpg" },
    { name: "Stella", slug: "stella", image: "stella_brand.jpg" },
    { name: "Valora", slug: "valora", image: "valora_brand.jpg" },
    { name: "Nova", slug: "nova", image: "nova_brand.jpg" },
    { name: "Solstice", slug: "solstice", image: "solstice_brand.jpg" },
  ];


  return (
    <div className="products">
      {/* Premium Header Section */}
      <div className="products-header-section">
        <div className="products-header-container">
          <Box className="products-header-title">Jewellery Shop</Box>
          <Box className="products-header-subtitle">Discover our collection</Box>
        </div>
      </div>

      <div className="products-main-container">
        {/* Toolbar Row */}
        <div className="products-toolbar">
          <div className="products-toolbar-left">
            {products.length > 0 && (
              <Box className="products-results-count">
                <span className="products-results-number">{products.length}</span>
                <span className="products-results-label">
                  {products.length === 1 ? "product" : "products"}
                </span>
              </Box>
            )}
            <FormControl className="products-sort-select" size="small">
              <Select
                value={productSearch.order}
                onChange={(e) => searchOrderHandler(e.target.value as string)}
                displayEmpty
              >
                <MenuItem value="createdAt">Newest First</MenuItem>
                <MenuItem value="productPrice">Price: Low to High</MenuItem>
                <MenuItem value="productViews">Most Viewed</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="products-toolbar-right">
            <Stack className="products-search-group" direction="row" spacing={0}>
              <SearchIcon className="products-search-icon" />
              <input
                type="search"
                className="products-search-input"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                variant="contained"
                className="products-search-button"
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </div>
        </div>

        {/* Main Content: Sidebar + Grid */}
        <div className="products-content-wrapper">
          {/* Sidebar Categories */}
          <div className="products-sidebar">
            <Box className="products-sidebar-title">Collections</Box>
            <div className="products-sidebar-list">
              {collections.map((collection) => (
                <button
                  key={collection}
                  className={`products-sidebar-item ${
                    productSearch.productCollection === collection
                      ? "active"
                      : ""
                  }`}
                  onClick={() => searchCollectionHandler(collection)}
                >
                  {getCollectionLabel(collection)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="products-grid-wrapper">
            <div className="products-grid">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = product.productImages[0]
                    ? `${serverApi}/${product.productImages[0]}`
                    : undefined;
                  const weightGram =
                    product.productCollection === ProductCollection.OTHER
                      ? product.productWeightGram + " gram"
                      : product.productSize + " size";
                  const collectionLabel = getCollectionLabel(
                    product.productCollection
                  );
                  return (
                    <div
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseProductHandler(product._id)}
                    >
                      <div className="product-card-image-wrapper">
                        {imagePath ? (
                          <img
                            src={imagePath}
                            alt={product.productName}
                            className="product-card-image"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="product-card-image-fallback">
                            <span>Facet & Gold</span>
                          </div>
                        )}
                        <div className="product-card-badge">{weightGram}</div>
                        <div className="product-card-overlay">
                          <Button
                            className="product-card-cart-btn"
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });
                              e.stopPropagation();
                            }}
                          >
                            <ShoppingCartIcon />
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                      <Box className="product-card-content">
                        <Box className="product-card-collection">
                          {collectionLabel}
                        </Box>
                        <Box className="product-card-title">
                          {product.productName}
                        </Box>
                        {product.productDesc && (
                          <Box className="product-card-description">
                            {product.productDesc}
                          </Box>
                        )}
                        <Box className="product-card-footer">
                          <Box className="product-card-price">
                            <MonetizationOnIcon className="price-icon" />
                            <span>{product.productPrice}</span>
                          </Box>
                          <Box className="product-card-views">
                            <RemoveRedEyeIcon className="views-icon" />
                            <span>{product.productViews}</span>
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  );
                })
              ) : (
                <Box className="products-no-data">
                  Products are not available!
                </Box>
              )}
            </div>

            {/* Pagination */}
            <div className="products-pagination">
              <Pagination
                count={
                  products.length === productSearch.limit
                    ? productSearch.page + 1
                    : Math.max(productSearch.page + 1, 2)
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
                onChange={paginationHandler}
                shape="rounded"
                size="large"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Partner Brands Section */}
      <div className="brands-section">
        <div className="brands-container">
          <div className="brands-header">
            <Box className="brands-microtitle">OUR PARTNER BRANDS</Box>
            <Box className="brands-title">Brands We Love</Box>
            <Box className="brands-subtext">
              Curated designers and ateliers selected for quality and craft.
            </Box>
          </div>
          <div className="brand-marquee">
            <div className="brand-track">
              {/* First set of brands */}
              {brands.map((brand) => (
                <div
                  key={`brand-1-${brand.slug}`}
                  className="brand-pill"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${brand.image}`}
                    alt={brand.name}
                    className="brand-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="brand-logo-fallback" style={{ display: "none" }}>
                    {brand.name}
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {brands.map((brand) => (
                <div
                  key={`brand-2-${brand.slug}`}
                  className="brand-pill"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${brand.image}`}
                    alt={brand.name}
                    className="brand-logo"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="brand-logo-fallback" style={{ display: "none" }}>
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visit Our Boutique Section */}
      <div className="address-section">
        <div className="address-container">
          <div className="address-header">
            <Box className="address-microtitle">VISIT US</Box>
            <Box className="address-title">Our Boutique</Box>
            <Box className="address-subtitle">
              Find us in the heart of the city.
            </Box>
          </div>
          <div className="address-wrapper">
            {/* Info Card */}
            <div className="address-card">
              <div className="address-info-item">
                <LocationOnIcon className="address-icon" />
                <div className="address-info-content">
                  <Box className="address-info-label">Address</Box>
                  <Box className="address-info-text">
                    Tiffany & Co.<br />
                    Gangnam-gu, Seoul, South Korea
                  </Box>
                </div>
              </div>
              <div className="address-info-item">
                <ScheduleIcon className="address-icon" />
                <div className="address-info-content">
                  <Box className="address-info-label">Hours</Box>
                  <Box className="address-info-text">
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: 12:00 PM - 5:00 PM
                  </Box>
                </div>
              </div>
              <div className="address-info-item">
                <PhoneIcon className="address-icon" />
                <div className="address-info-content">
                  <Box className="address-info-label">Phone</Box>
                  <Box className="address-info-text">
                    <a href="tel:+82212345678">+82 2 1234 5678</a>
                  </Box>
                </div>
              </div>
              <div className="address-info-item">
                <EmailIcon className="address-icon" />
                <div className="address-info-content">
                  <Box className="address-info-label">Email</Box>
                  <Box className="address-info-text">
                    <a href="mailto:info@facetandgold.com">info@facetandgold.com</a>
                  </Box>
                </div>
              </div>
              <Button
                className="address-directions-btn"
                variant="contained"
                startIcon={<DirectionsIcon />}
                onClick={() => {
                  window.open(
                    "https://www.google.com/maps/dir/?api=1&destination=37.50518697205449,127.00147907550128",
                    "_blank"
                  );
                }}
              >
                Get Directions
              </Button>
              <Box className="address-trust-line">
                Secure payments • Certified materials
              </Box>
            </div>
            {/* Map Panel */}
            <div className="address-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.1157956945285!2d127.00147907550128!3d37.50518697205449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca17b9151635d%3A0xcb143e3ba25deff0!2sTiffany%20%26%20Co.!5e0!3m2!1sen!2skr!4v1767944829358!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                className="address-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </div>
  );
}
