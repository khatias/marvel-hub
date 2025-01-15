import { getAuthToken } from "../utils/authUtils";
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

export const fetchProfile  = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    throw new Error("No authentication token found.");
  }

  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile data");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch profile error:", error);
    throw error;
  }
};