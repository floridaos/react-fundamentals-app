export const getCourses = async () => {
  const response = await fetch("http://localhost:4000/courses/all");
  const data = await response.json();

  if (!response.ok) throw new Error("Failed to fetch courses");

  return data.result;
};

export const getAuthors = async () => {
  const response = await fetch("http://localhost:4000/authors/all");
  const data = await response.json();

  if (!response.ok) throw new Error("Failed to fetch authors");

  return data.result;
};

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

export const deleteCourseApi = async (id) => {
  const rawToken = localStorage.getItem("token");

  if (!rawToken) {
    throw new Error("Нет токена в localStorage");
  }

  const token = rawToken.startsWith("Bearer ")
    ? rawToken
    : `Bearer ${rawToken}`;

  const response = await fetch(`http://localhost:4000/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Ошибка удаления:", response.status, text);
    throw new Error(`Failed to delete course: ${response.status} - ${text}`);
  }
};
