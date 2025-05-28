import { getCourses, getAuthors } from "../../services";

describe("services", () => {
  describe("getCourses", () => {
    const mockCourses = [
      { id: 1, title: "Course 1" },
      { id: 2, title: "Course 2" },
    ];

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('should return the courses when the response is successful (call fetch with path - "http://localhost:4000/courses/all" method - "GET", headers - "Content-Type": "application/json")', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ successful: true, result: mockCourses }),
      });

      const courses = await getCourses();
      expect(courses).toEqual(mockCourses);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/courses/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      await expect(getCourses()).rejects.toThrow("Failed to fetch courses");
    });
  });

  describe("getAuthors", () => {
    const mockAuthors = [
      { id: 1, name: "Author 1" },
      { id: 2, name: "Author 2" },
    ];

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('should return the authors when the response is successful (call fetch with path - "http://localhost:4000/authors/all" method - "GET", headers - "Content-Type": "application/json")', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ successful: true, result: mockAuthors }),
      });

      const authors = await getAuthors();
      expect(authors).toEqual(mockAuthors);

      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/authors/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw an error when the response is not successful (response.ok = false)", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
      });

      await expect(getAuthors()).rejects.toThrow("Failed to fetch authors");
    });
  });
});
