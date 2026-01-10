import { createSelector } from "reselect";
import { AppRootState, ProductsPageState } from "../../../lib/types/screen";

export const retrieveJewelleryShop = createSelector(
  (state: AppRootState) => state.productsPage,
  (productsPage: ProductsPageState) => productsPage.jewelleryShop
);

export const retrieveChosenProduct = createSelector(
  (state: AppRootState) => state.productsPage,
  (productsPage: ProductsPageState) => productsPage.chosenProduct
);

export const retrieveProducts = createSelector(
  (state: AppRootState) => state.productsPage,
  (productsPage: ProductsPageState) => productsPage.products
);
