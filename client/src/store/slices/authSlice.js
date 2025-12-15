// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../../lib/axios";
// import { toast } from "react-toastify";

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
}


export const Register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/register", data);
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


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.
      addCase(Register.pending, (state) => {
        state.isLoggedIn = false
      }).
      addCase(Register.fulfilled, (state) => {
        state.isLoggedIn = true
      }).
      addCase(Register.rejected, (state) => {
        state.isLoggedIn = false
      });
    builder.
      addCase(Login.pending, (state) => {
        state.isLoggedIn = false
      }).
      addCase(Login.fulfilled, (state) => {
        state.isLoggedIn = true
      }).
      addCase(Login.rejected, (state) => {
        state.isLoggedIn = false
      });
  }
})

export default authSlice.reducer;
// export const { } = authSlice.actions;