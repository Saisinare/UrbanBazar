import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './slice/signup'
import loginReducer from "./slice/login";
import userReducer from "./slice/user"
import productsReducer from "./slice/products";


const store = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer,
        user:userReducer,
        products:productsReducer

    }
})

export default store
