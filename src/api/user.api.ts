import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/auth";
import type {
  AdminUsersResponse,
  ChangePasswordInput,
  GetAdminUsersParams,
  UpdateProfileInput,
  UpdateUserStatusInput,
} from "@/types/user";

// Update logged-in user's profile
export const updateMyProfile = async (
  data: UpdateProfileInput,
): Promise<ApiResponse<User>> => {
  const formData = new FormData();

  formData.append("name", data.name);

  if (data.image) {
    formData.append("image", data.image);
  }

  return api<ApiResponse<User>>("/users/me", {
    method: "PATCH",
    body: formData,
  });
};

// Get all users for admin
export const getAdminUsers = async (
  params: GetAdminUsersParams = {},
): Promise<AdminUsersResponse> => {
  const searchParams = new URLSearchParams();

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.role) {
    searchParams.set("role", params.role);
  }

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  const query = searchParams.toString();

  const response = await api<ApiResponse<AdminUsersResponse>>(
    `/users${query ? `?${query}` : ""}`,
  );

  return response.data;
};

// Update user status
export const updateUserStatus = async ({
  userId,
  status,
}: UpdateUserStatusInput): Promise<ApiResponse<unknown>> => {
  return api<ApiResponse<unknown>>(`/users/${userId}/status`, {
    method: "PATCH",
    body: {
      status,
    },
  });
};

// Update user role
export const updateUserRole = async (
  userId: string,
): Promise<ApiResponse<User>> => {
  return api<ApiResponse<User>>(`/users/${userId}/role`, {
    method: "PATCH",
    body: {
      role: "OFFICER",
    },
  });
};

// Change current user's password
export const changePassword = async (
  data: ChangePasswordInput,
): Promise<ApiResponse<null>> => {
  return api<ApiResponse<null>>("/users/change-password", {
    method: "PATCH",
    body: data,
  });
};
