import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { CreateAuthor } from "../../components/CourseForm/components/CreateAuthor/CreateAuthor";
import { createAuthorThunk } from "../../store/thunks/authorsThunk";

// Mock the thunk
jest.mock("../../store/thunks/authorsThunk", () => ({
  createAuthorThunk: jest.fn((author) => ({
    type: "authors/saveAuthor",
    payload: { ...author, id: "test-id" },
  })),
}));

const mockStore = configureMockStore();

describe("CreateAuthor component", () => {
  const store = mockStore({
    authors: [],
  });

  beforeEach(() => {
    store.clearActions();
    // Mock window.alert
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new author on CREATE AUTHOR button click", () => {
    render(
      <Provider store={store}>
        <CreateAuthor />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/enter author name/i);
    const button = screen.getByText(/create author/i);

    fireEvent.change(input, { target: { value: "Test Author" } });
    fireEvent.click(button);

    expect(createAuthorThunk).toHaveBeenCalledWith({
      name: "Test Author",
    });
  });
});
