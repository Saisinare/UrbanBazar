import { createSlice } from "@reduxjs/toolkit";
const initialvalute = { products: [],filter:'' };
const ProductSlice = createSlice({
  name: "products",
  initialState: initialvalute,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters:(state,action)=>{
      state.filter = action.payload;
    }
  },
});

export const { setProducts, setFilters } = ProductSlice.actions;
export default ProductSlice.reducer;
