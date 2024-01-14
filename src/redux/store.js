import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './slice/signup'
import loginReducer from "./slice/login";
import userReducer from "./slice/user"
import productsReducer from "./slice/products";
import progressBar from "./slice/progressBar";

const store = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer,
        user:userReducer,
        products:productsReducer,
        progressBar:progressBar
    }
})

export default store
