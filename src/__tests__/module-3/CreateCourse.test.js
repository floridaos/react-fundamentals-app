import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { CourseForm } from "../../components/CourseForm";
import { createCourseThunk } from "../../store/thunks/coursesThunk";

// Mock the thunk
jest.mock("../../store/thunks/coursesThunk", () => ({
  createCourseThunk: jest.fn((course) => ({
    type: "courses/saveCourse",
    payload: course,
  })),
}));

const mockStore = configureMockStore();
const store = mockStore({
  authors: [
    { id: 1, name: "Author 1" },
    { id: 2, name: "Author 2" },
  ],
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: "/mock/path" }),
}));

describe("CourseForm", () => {
  beforeEach(() => {
    store.clearActions();
    // Mock window.alert
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should add new course to the store on "CREATE COURSE" button with data-testid="createCourseButton" click (saveCourse action from coursesSlice should be called with payload {title,description,duration,authors}', () => {
    render(
      <Provider store={store}>
        <Router>
          <CourseForm />
        </Router>
      </Provider>
    );

    const titleInput = screen.getByTestId("titleInput");
    const durationInput = screen.getByTestId("durationInput");
    const descriptionTextArea = screen.getByTestId("descriptionTextArea");
    const addAuthorButton = screen.getAllByTestId("addAuthor")[0];
    const createCourseButton = screen.getByTestId("createCourseButton");

    fireEvent.change(titleInput, { target: { value: "Course Title" } });
    fireEvent.change(durationInput, { target: { value: "20" } });
    fireEvent.click(addAuthorButton);
    fireEvent.change(descriptionTextArea, {
      target: { value: "Course Description" },
    });

    fireEvent.click(createCourseButton);

    expect(createCourseThunk).toHaveBeenCalledWith({
      title: "Course Title",
      description: "Course Description",
      duration: 20,
      authors: [1],
    });
  });
});
