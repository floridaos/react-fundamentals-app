import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import coursesReducer from "./slices/coursesSlice";
import authorsReducer from "./slices/authorsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    authors: authorsReducer,
  },
});
