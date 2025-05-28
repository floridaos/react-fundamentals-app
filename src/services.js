export const createUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message =
        result?.result || "Не удалось зарегистрировать пользователя";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result?.result || "Неверный логин или пароль";
      throw new Error(message);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch("http://localhost:4000/courses/all", {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const result = await response.json();
    console.log("Fetched courses:", result);
    return result.result;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getAuthors = async () => {
  try {
    const response = await fetch("http://localhost:4000/authors/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch authors");
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Creating course with:", {
      token,
      courseData,
    });

    const response = await fetch("http://localhost:4000/courses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    const result = await response.json();
    console.log("Create course response:", result);

    if (!response.ok) {
      const message = result?.result || "Не удалось создать курс";
      throw new Error(message);
    }

    return result.result;
  } catch (error) {
    console.error("Create course error:", error);
    throw error;
  }
};

export const createAuthor = async (authorData) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Creating author with:", {
      token,
      authorData,
    });

    const response = await fetch("http://localhost:4000/authors/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(authorData),
    });

    const result = await response.json();
    console.log("Create author response:", result);

    if (!response.ok) {
      const message = result?.result || "Не удалось создать автора";
      throw new Error(message);
    }

    return result.result;
  } catch (error) {
    console.error("Create author error:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete course");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
