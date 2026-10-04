import type { ApiPaginatedData } from "./api";

export type UserRole = "CITIZEN" | "OFFICER" | "ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type UserAuthProvider = "LOCAL" | "GOOGLE";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  authProvider: UserAuthProvider;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type AdminUsersResponse = ApiPaginatedData<AdminUser>;

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortOrder?: "asc" | "desc";
}

export interface UpdateUserStatusInput {
  userId: string;
  status: "ACTIVE" | "BLOCKED";
}

export interface UpdateProfileInput {
  name: string;
  image?: File;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
