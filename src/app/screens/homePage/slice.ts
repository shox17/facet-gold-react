import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularProducts: [],
  newProducts: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularProducts(state, action) {
      state.popularProducts = action.payload;
    },
    setNewProducts(state, action) {
      state.newProducts = action.payload;
    },
    setTopUsers(state, action) {
      state.topUsers = action.payload;
    },
  },
});
export const { setPopularProducts, setNewProducts, setTopUsers } =
  homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
