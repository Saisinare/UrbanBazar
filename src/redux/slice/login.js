import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk('login',async(user)=>{
    const response = await fetch('http://localhost:8000/user/login', {
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

const loginSlice = createSlice({
    name:'login',
    initialState,
    extraReducers:(builder) => {
        builder.addCase(login.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
        });
        builder.addCase(login.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        })
    }
})

export default loginSlice.reducer;