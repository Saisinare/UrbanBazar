import { createSlice } from "@reduxjs/toolkit";
const initialvalute = { products: [] };
const ProductSlice = createSlice({
  name: "products",
  initialState: initialvalute,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
