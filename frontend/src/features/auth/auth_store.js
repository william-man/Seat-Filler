import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'

//the store for the state of user and reducers
export default configureStore({
    reducer: {
        authReducer
    }
})