import { refreshToken as refreshTokenAPI } from "@services/auth/authService";

const refreshToken = async () => {
  try {
    const user = await refreshTokenAPI();
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    localStorage.removeItem("user");
    throw error;
  }
};

export default refreshToken;