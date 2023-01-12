import { configureStore } from "@reduxjs/toolkit";
import loginUserDataReducer from '../features/loginUserDataSlice';
import allUsersPostReducer from "../features/allUsersPostSlice";


const store = configureStore({
    reducer:{
        loginUserDataReducer,
        allUsersPostReducer,
    }
})

export default store