import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  User,
} from "@/types/auth";

export const loginUser = async (
  data: LoginInput,
): Promise<ApiResponse<LoginResponse>> => {
  return api<ApiResponse<LoginResponse>>("/auth/login", {
    method: "POST",
    body: data,
  });
};

export const registerUser = async (
  data: RegisterInput,
): Promise<ApiResponse<RegisterResponse>> => {
  return api<ApiResponse<RegisterResponse>>("/auth/register", {
    method: "POST",
    body: data,
  });
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  return api<ApiResponse<User>>("/auth/me", {
    method: "GET",
  });
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
};

export const verifyRegisterEmail = async (data: {
  email: string;
  otp: string;
}): Promise<
  ApiResponse<{
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      emailVerified: boolean;
    };
    message: string;
  }>
> => {
  return api("/auth/verify-register-email", {
    method: "POST",
    body: data,
  });
};
