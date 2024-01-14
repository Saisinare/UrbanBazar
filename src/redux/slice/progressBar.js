const { createSlice } = require("@reduxjs/toolkit");

const progressBarSlice = createSlice({
  name: "proessBar",
  initialState: { isCompleted: false, isWaiting: false },
  reducers: {
    setisComplete: (state, action) => {
      state.isCompleted = action.payload;
      state.isWaiting = false;
    },
    setisWaiting: (state, action) => {
      state.isWaiting = action.payload;
      state.isCompleted= false;
    },
  },
});
export const { setisComplete , setisWaiting } = progressBarSlice.actions;
export default progressBarSlice.reducer;
