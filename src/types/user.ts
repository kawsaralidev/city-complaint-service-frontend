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

export interface UserPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersResponse {
  data: AdminUser[];
  pagination: UserPagination;
}

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
