import apiClient from "@services/config/axiosConfig";

export const refreshToken = async () => {
  const response = await apiClient.post("/auth/refresh-access-token");
  return response.data;
};
