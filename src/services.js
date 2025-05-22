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
