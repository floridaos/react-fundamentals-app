import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    setCourses: (state, action) => action.payload,
    addCourse: (state, action) => {
      state.push(action.payload);
    },
    deleteCourse: (state, action) => {
      return state.filter((course) => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
