import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// async function to fetch user from mongodb; automatically generates pending,
// fulfilled and rejected action types

export const registerUser = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

//async function to login
export const loginUser = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
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

// async function to logout
export const logoutUser = createAsyncThunk("users/logout",
async (user, thunkAPI) => {
  await authService.logout()
}
)

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

//state and reduce to control the login state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    //register cases
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    });
    //login cases
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    }); 
    // logout cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
    })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
