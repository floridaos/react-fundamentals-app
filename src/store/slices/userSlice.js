import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  name: "",
  email: "",
  token: localStorage.getItem("token") || "",
  role: localStorage.getItem("userRole") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, email, token, role } = action.payload;
      state.isAuth = true;
      state.name = name;
      state.email = email;
      state.token = token;
      state.role = role;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
    },
    removeUserData: (state) => {
      state.isAuth = false;
      state.name = "";
      state.email = "";
      state.token = "";
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
  },
});

// use these actions in your components / thunks
export const { setUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
