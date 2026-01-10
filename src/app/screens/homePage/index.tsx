import React, { useEffect } from "react";
import ShopByCategory from "./ShopByCategory";
import BrandStory from "./BrandStory";
import WhyFacetGold from "./WhyFacetGold";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import "../../../css/home.css";

/** REDUX SLICE **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
});

export default function HomePage() {
  const { setPopularProducts, setNewProducts } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    //Backend server data  fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
      })
      .then((data) => {
        console.log("Data passed  here:", data);
        setPopularProducts(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        console.log("Data passed  here:", data);
        setNewProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <ShopByCategory />
      <PopularProducts />
      <NewProducts />
      <BrandStory />
      <WhyFacetGold />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
