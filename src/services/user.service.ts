import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User } from "@/types/auth";

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
