import { createSlice } from "@reduxjs/toolkit";
const initialvalute = { products: [],filters:{category:'',maxPrice:'',minPrice:''},checkoutSessionId:''};
const ProductSlice = createSlice({
  name: "products",
  initialState: initialvalute,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters:(state,action)=>{
      state.filters = action.payload;
    },
    setcatfil:(state,action)=>{
      state.filters.category = action.payload
    },
    setminpFil:(state,action)=>{
      state.filters.minPrice = action.payload
    },
    setmaxpFil:(state,action)=>{
      state.filters.maxPrice = action.payload
    },
    clearfil:(state,action)=>{
      state.filters.minPrice = ''
      state.filters.maxPrice = ''
      state.filters.category = ''
    },
    setcheckoutsessionId:(state,action)=>{
      state.checkoutSessionId = action.payload
    }
  },
});

export const { setProducts, setFilters,setcatfil,setmaxpFil,setminpFil,clearfil,setcheckoutsessionId } = ProductSlice.actions;
export default ProductSlice.reducer;
