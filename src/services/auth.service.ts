import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { LoginInput, LoginResponse, User } from "@/types/auth";

export const loginUser = async (
  data: LoginInput,
): Promise<ApiResponse<LoginResponse>> => {
  return api<ApiResponse<LoginResponse>>("/auth/login", {
    method: "POST",
    body: data,
  });
};

// Refresh access token
export const refreshAccessToken = async (): Promise<
  ApiResponse<{ accessToken: string }>
> => {
  return api<ApiResponse<{ accessToken: string }>>("/auth/refresh-token", {
    method: "POST",
  });
};
// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return api<ApiResponse<User>>("/auth/me", {
    method: "GET",
  });
};

// Logout current user
export const logoutUser = async (): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
};
