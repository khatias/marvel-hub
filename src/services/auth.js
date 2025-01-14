export const loginUser = async (username, password) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, expiresInMins: 30 }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();
    localStorage.setItem("authTokenMarvel", data.accessToken);
    localStorage.setItem("username", data.username);

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
