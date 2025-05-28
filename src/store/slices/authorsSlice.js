import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors: (state, action) => {
      return action.payload;
    },
    addAuthor: (state, action) => {
      state.push(action.payload);
    },
    saveAuthor: (state, action) => {
      state.push(action.payload);
    },
  },
});

// use these actions in your components / thunks
export const { setAuthors, addAuthor, saveAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;
