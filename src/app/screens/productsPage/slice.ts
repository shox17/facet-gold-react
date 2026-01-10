import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  jewelleryShop: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setJewelleryShop: (state, action) => {
      state.jewelleryShop = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setJewelleryShop, setChosenProduct, setProducts } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
