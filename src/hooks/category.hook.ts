import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createCategory,
  getCategories,
  updateCategory,
  updateCategoryStatus,
} from "@/services/category.service";

import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "@/services/category.service";

const categoriesQueryKey = ["categories"];

export function useCategories() {
  return useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryInput) => createCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey,
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryInput) => updateCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey,
      });
    },
  });
}

export function useUpdateCategoryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { categoryId: string; isActive: boolean }) =>
      updateCategoryStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesQueryKey,
      });
    },
  });
}
