import { refreshToken as refreshTokenAPI } from "@services/auth/authService";

const refreshToken = async () => {
  const response = await refreshTokenAPI();
  if ("user" in response) localStorage.setItem("user", JSON.stringify(response.user));
};

export default refreshToken;
