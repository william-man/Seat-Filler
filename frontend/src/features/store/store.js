import { configureStore } from "@reduxjs/toolkit";
import filmReducer from "../films/filmSlice";
import authReducer from "../auth/authSlice";
import bookingReducer from "../films/bookingSlice";
import checkoutReducer from "../checkout/checkoutSlice";

//the store for the state of films and reducers
export default configureStore({
  reducer: {
    film: filmReducer,
    auth: authReducer,
    booking: bookingReducer,
    payment: checkoutReducer,
  },
});
