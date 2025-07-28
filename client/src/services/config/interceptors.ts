import { refreshToken } from "@services/auth/authService";
import apiClient from "./axiosConfig";

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (error.response.status === 401) refreshToken();
    } catch (error) {
      console.error("Error in response interceptor:", error);
    }
  }
);
