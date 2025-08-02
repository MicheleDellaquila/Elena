import type { SignUpSchemaType } from "@schemas/auth/signUpSchema";
import type { SignInSchemaType } from "@schemas/auth/signInSchema";
import apiClient from "@services/config/axiosConfig";
import type {
  RefreshTokenResponse,
  SignUpResponse,
  SignInResponse,
  ErrorResponse,
} from "./types";

export const refreshToken = async () => {
  const URL = "/auth/refresh-access-token";
  const response = await apiClient.post<RefreshTokenResponse | ErrorResponse>(URL);
  return response.data;
};

export const signUp = async (userData: SignUpSchemaType) => {
  const URL = "/auth/register";
  const response = await apiClient.post<SignUpResponse | ErrorResponse>(URL, userData);
  return response.data;
};

export const signIn = async (userData: SignInSchemaType) => {
  const URL = "/auth/login";
  const response = await apiClient.post<SignInResponse | ErrorResponse>(URL, userData);

  return response.data;
};

export const autoLogin = async () => {
  const URL = "auth/auto-login";
  const response = await apiClient.post<SignInResponse | ErrorResponse>(URL);
  return response.data;
};
