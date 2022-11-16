import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const confirmPayment = createAsyncThunk(
  "payment/confirmPayment",
  async (details, thunkAPI) => {
    try {
      const result = await axios
        .post("/payment/pay", details)
        .then((response) => {
          return response.data;
        });
      return result;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(confirmPayment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(confirmPayment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(confirmPayment.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetPayment } = checkoutSlice.actions;
export default checkoutSlice.reducer;
