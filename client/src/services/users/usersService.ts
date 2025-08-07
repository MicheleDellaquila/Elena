import apiClient from "@services/config/axiosConfig";
import type { UserEnrolledCourses } from "./types";
import type { ErrorAPIResponse } from "@/types/data";

export const userEnrolledCourses = async () => {
  const URL = '/users/enrolled-courses';
  const response = await apiClient.get<UserEnrolledCourses | ErrorAPIResponse>(URL);
  return response.data;
};
