// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios"
import axios from "axios";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     authUser: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     isUpdatingPassword: false,
//     isRequestingForToken: false,
//     isCheckingAuth: true,
//   },
//   extraReducers: (builder) => {},
// });

// export default authSlice.reducer;




const initialState = {
  isLoggedIn: false,
  isLoggedOut: true,
  isCheckingAuth: true,
  user: [],
  authPopupOpen: false,
}


export const Register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);
      return res.data;
    } catch (error) {
      // Properly extract server message
      const message = error.response?.data?.message || error.message || "Failed to call API";
      console.log("Server Error Message:", message); // <- now you'll see it
      return rejectWithValue(message);
    }
  }
);

export const Login = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;

  }
)

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.get("/auth/me")
      return res.data;
    } catch (error) {
      const message = error.response.data?.message || error.message || "Failed to call API";
      console.log(message)
      return rejectWithValue(message);
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuthPopup: (state, action) => {
      state.authPopupOpen = !state.authPopupOpen
    }
  },

  extraReducers: (builder) => {
    builder.
      addCase(Register.pending, (state, action) => {
        state.isLoggedIn = false
        state.user = [];

      }).
      addCase(Register.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user;
        toast.success(action.payload?.message || "Registered Successfully");
      }).
      addCase(Register.rejected, (state, action) => {
        state.isLoggedIn = false
        state.user = []
        toast.success(action.payload?.message || "Registration Failed");
      }).
      addCase(Login.pending, (state, action) => {
        state.isLoggedIn = false
        state.user = []

      }).
      addCase(Login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
        toast.success(action.payload?.message || "Login Failed");
      }).
      addCase(Login.rejected, (state, action) => {
        state.isLoggedIn = false
        state.user = []
      }).
      addCase(getUser.pending, (state, action) => {
        state.isLoggedIn = false
    
      }).
      addCase(getUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.user = action.payload.user
        toast.success(action.payload?.message || "Get user Successfully");
      }).
      addCase(getUser.rejected, (state, action) => {
        state.isLoggedIn = false
        state.user = []
        toast.warning(action.payload?.message || "Get user failed");
      })
  }
})

export default authSlice.reducer;
export const { toggleAuthPopup } = authSlice.actions
// export const { } = authSlice.actions;