const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const signup =  createAsyncThunk('signup', async (user)=>{
    const response = await fetch('http://localhost:8000/user/signup', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
        const result = await response.json()
        return result;
})
const initialState= { isLoading: false, data: null , isError:false}
const signupSlice = createSlice({
    name:'signup',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        });
        builder.addCase(signup.pending,(state,action)=>{
            state.isLoading = true
        });
    }
})


export default signupSlice.reducer
