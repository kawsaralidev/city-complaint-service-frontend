"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateCategory, useUpdateCategory } from "@/hooks/category.hook";
import {
  categorySchema,
  type CategoryFormValues,
} from "@/lib/validations/category.schema";
import type { Category } from "@/types/dashboard";

interface CategoryFormProps {
  category?: Category | null;
  onSuccess?: () => void;
}

const CategoryForm = ({ category, onSuccess }: CategoryFormProps) => {
  const isEditMode = Boolean(category);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const isPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  const error = createCategoryMutation.error || updateCategoryMutation.error;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: category?.name ?? "",
    });
  }, [category, reset]);

  const onSubmit = (values: CategoryFormValues) => {
    const name = values.name.trim();

    if (isEditMode && category) {
      updateCategoryMutation.mutate(
        {
          categoryId: category.id,
          name,
        },
        {
          onSuccess: () => {
            reset({ name: "" });
            onSuccess?.();
          },
        },
      );

      return;
    }

    createCategoryMutation.mutate(
      { name },
      {
        onSuccess: () => {
          reset({ name: "" });
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="category-name"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          Category Name
        </label>

        <input
          id="category-name"
          type="text"
          placeholder="Enter category name"
          disabled={isPending}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "category-name-error" : undefined}
          {...register("name")}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />

        {errors.name && (
          <p
            id="category-name-error"
            role="alert"
            className="mt-1 text-sm text-destructive"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? isEditMode
            ? "Updating..."
            : "Adding..."
          : isEditMode
            ? "Update Category"
            : "Add Category"}
      </button>
    </form>
  );
};

export default CategoryForm;
