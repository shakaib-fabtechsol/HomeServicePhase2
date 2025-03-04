import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  refresh: null,
  isLoggedIn: false,

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.token = payload?.token;
      state.isLoggedIn = true;
      state.user = payload.user;

    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = null;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { login, logout,setUser } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
