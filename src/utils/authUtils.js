export const getAuthToken = () => localStorage.getItem("authTokenMarvel");
export const getUserName = () => localStorage.getItem("username");
export const removeAuthToken = () => localStorage.removeItem("authTokenMarvel");
export const removeUserName = () => localStorage.removeItem("username");
