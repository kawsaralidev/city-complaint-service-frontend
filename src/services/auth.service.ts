import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type {
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

export const demoLogin = async (
  role: "CITIZEN" | "OFFICER" | "ADMIN",
): Promise<ApiResponse<LoginResponse>> => {
  return api<ApiResponse<LoginResponse>>("/auth/demo-login", {
    method: "POST",
    body: {
      role,
    },
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

export const getCurrentUser = async (): Promise<ApiResponse<User | null>> => {
  return api<ApiResponse<User | null>>("/auth/me", {
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
}): Promise<ApiResponse<User>> => {
  return api<ApiResponse<User>>("/auth/verify-register-email", {
    method: "POST",
    body: data,
  });
};

export const forgotPassword = async (
  email: string,
): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body: {
      email,
    },
  });
};

export const resetPassword = async (
  token: string,
  data: {
    newPassword: string;
    confirmPassword: string;
  },
): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: {
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    },
  });
};
