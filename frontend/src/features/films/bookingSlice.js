import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTickets = createAsyncThunk(
  "booking_list/fetchTickets",
  async (film, thunkAPI) => {
    try {
      const data = await axios
        .get("/booking", { params: { ...film } })
        .then((response) => {
          return response.data;
        });
      return data;
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
  isError: false,
  data: [],
  error: "",
};

export const bookingSlice = createSlice({
  name: "booking_list",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.data = [];
    });
  },
});

export default bookingSlice.reducer;
