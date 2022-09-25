import { configureStore } from "@reduxjs/toolkit";
import filmReducer from './filmSlice'

//the store for the state of films and reducers
export default configureStore({
    reducer: {
        film: filmReducer
    }
})