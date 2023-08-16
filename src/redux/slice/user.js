import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
  SellerMode:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSellerMode:(state,action)=>{
      state.SellerMode = action.payload
    }
  }
});
export const {setLogin,setUser,setSellerMode} = userSlice.actions
export default userSlice.reducer;