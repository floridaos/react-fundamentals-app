import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAuthor } from "../../services";
import { addAuthor } from "../slices/authorsSlice";

export const createAuthorThunk = createAsyncThunk(
  "authors/create",
  async (authorData, { dispatch }) => {
    try {
      const result = await createAuthor(authorData);
      dispatch(addAuthor(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
);

// export const getAuthorsThunk = () => {};
