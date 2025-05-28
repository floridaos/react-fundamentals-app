import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CourseInfo } from "../../components";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ courseId: "1" }),
}));

const mockStore = configureMockStore();
const courses = [
  {
    title: "Test Title 1",
    description: "Test Description 1",
    authors: [1, 2],
    duration: 60,
    creationDate: "20/03/2012",
    id: "1",
  },
];

const authors = [
  {
    id: 1,
    name: "Test Name 1",
  },
  {
    id: 2,
    name: "Test Name 2",
  },
];

const store = mockStore({
  courses,
  authors,
});

describe("CourseInfo", () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={store}>
          <CourseInfo />
        </Provider>
      </Router>
    );
  });

  it("should display course title", () => {
    expect(screen.getByText("Test Title 1")).toBeInTheDocument();
  });

  it("should display course description", () => {
    expect(screen.getByText("Test Description 1")).toBeInTheDocument();
  });

  it("should display course duration", () => {
    expect(screen.getByText(/01:00 hour/)).toBeInTheDocument();
  });

  it("should display course authors", () => {
    expect(screen.getByText("Test Name 1")).toBeInTheDocument();
    expect(screen.getByText("Test Name 2")).toBeInTheDocument();
  });

  it("should display back button as a Link with to='/courses'", () => {
    const backLink = screen.getByText("← BACK").closest("a");
    expect(backLink).toHaveAttribute("href", "/courses");
  });
});
