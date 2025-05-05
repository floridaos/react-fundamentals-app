import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authors: [],
};

const authorsSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setAuthors(state, action) {
      state.authors = action.payload;
    },
    addAuthor(state, action) {
      state.authors.push(action.payload);
    },
    removeAuthor(state, action) {
      state.authors = state.authors.filter(
        (author) => author.id !== action.payload
      );
    },
  },
});

export const { setAuthors, addAuthor, removeAuthor } = authorsSlice.actions;
export default authorsSlice.reducer;
