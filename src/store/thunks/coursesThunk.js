// export const updateCourseThunk = () => {};

import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourse, deleteCourse } from "../../services";
import {
  saveCourse,
  deleteCourse as deleteCourseAction,
} from "../slices/coursesSlice";

export const createCourseThunk = createAsyncThunk(
  "courses/create",
  async (courseData, { dispatch }) => {
    try {
      const result = await createCourse(courseData);
      dispatch(saveCourse(result));
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCourseThunk = createAsyncThunk(
  "courses/delete",
  async (courseId, { dispatch }) => {
    try {
      await deleteCourse(courseId);
      dispatch(deleteCourseAction(courseId));
    } catch (error) {
      throw error;
    }
  }
);

// export const getCoursesThunk = () => {};
