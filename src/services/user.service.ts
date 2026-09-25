import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/auth";
import {
  AdminUsersResponse,
  GetAdminUsersParams,
  UpdateUserStatusInput,
} from "@/types/user";

export interface UpdateProfileInput {
  name: string;
  image?: File;
}

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
