import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { name, email, token } = action.payload;
      state.isAuth = true;
      state.name = name;
      state.email = email;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logoutUser: (state) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
