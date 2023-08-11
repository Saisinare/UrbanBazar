import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './slice/signup'
import loginReducer from "./slice/login";
import userReducer from "./slice/user"
const store = configureStore({
    reducer:{
        signup:signupReducer,
        login:loginReducer,
        user:userReducer
    }
})

export default store