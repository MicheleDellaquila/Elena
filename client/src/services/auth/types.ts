import type { User } from "@/types/data";

export interface RefreshTokenResponse {
  ok: boolean;
}

export interface SignUpResponse {
  user: User;
}

export interface SignInResponse {
  user: User;
}

export interface ErrorResponse {
  error: string;
}
