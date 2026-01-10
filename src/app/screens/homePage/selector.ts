import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

export const retrievePopularProducts = createSelector(
  (state: AppRootState) => state.homePage,
  (homePage: HomePageState) => homePage.popularProducts
);

export const retrieveNewProducts = createSelector(
  (state: AppRootState) => state.homePage,
  (homePage: HomePageState) => homePage.newProducts
);

export const retrieveTopUsers = createSelector(
  (state: AppRootState) => state.homePage,
  (homePage: HomePageState) => homePage.topUsers
);
