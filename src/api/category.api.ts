import { api } from "@/lib/api";
import type { ApiResponse } from "@/types/api";
import type { Category } from "@/types/dashboard";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/types/category";

// Get all active categories
export const getCategories = async (): Promise<Category[]> => {
  const response = await api<ApiResponse<Category[]>>("/categories");

  return response.data;
};

// Create category
export const createCategory = async (
  data: CreateCategoryInput,
): Promise<ApiResponse<Category>> => {
  return api<ApiResponse<Category>>("/categories", {
    method: "POST",
    body: {
      name: data.name,
      type: "COMPLAINT",
    },
  });
};

// Update category
export const updateCategory = async ({
  categoryId,
  name,
}: UpdateCategoryInput): Promise<ApiResponse<Category>> => {
  return api<ApiResponse<Category>>(`/categories/${categoryId}`, {
    method: "PATCH",
    body: {
      name,
      type: "COMPLAINT",
    },
  });
};

// Update category status
export const updateCategoryStatus = async ({
  categoryId,
  isActive,
}: {
  categoryId: string;
  isActive: boolean;
}): Promise<ApiResponse<Category>> => {
  return api<ApiResponse<Category>>(`/categories/${categoryId}/status`, {
    method: "PATCH",
    body: {
      isActive,
    },
  });
};
