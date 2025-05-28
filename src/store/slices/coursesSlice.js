import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
    saveCourse: (state, action) => {
      state.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      return state.filter((course) => course.id !== action.payload);
    },
  },
});

// use these actions in your components / thunks
export const { setCourses, saveCourse, updateCourse, deleteCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
