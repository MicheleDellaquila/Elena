import { refreshToken } from "@services/auth/authService";
import apiClient from "./axiosConfig";

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshToken();
        // Retry the original request with the new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login or handle auth failure
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
