"use client";

import { useEffect, useState } from "react";

import { useCreateCategory, useUpdateCategory } from "@/hooks/category.hook";

import type { Category } from "@/types/dashboard";

interface CategoryFormProps {
  category?: Category | null;
  onSuccess?: () => void;
}

const CategoryForm = ({ category, onSuccess }: CategoryFormProps) => {
  const [name, setName] = useState("");

  const isEditMode = Boolean(category);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const isPending =
    createCategoryMutation.isPending || updateCategoryMutation.isPending;

  const error = createCategoryMutation.error || updateCategoryMutation.error;

  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    if (isEditMode && category) {
      updateCategoryMutation.mutate(
        {
          categoryId: category.id,
          name: trimmedName,
        },
        {
          onSuccess: () => {
            setName("");
            onSuccess?.();
          },
        },
      );

      return;
    }

    createCategoryMutation.mutate(
      {
        name: trimmedName,
      },
      {
        onSuccess: () => {
          setName("");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter category name"
          disabled={isPending}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Show backend error */}
      {error && (
        <p className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/100 disabled:cursor-not-allowed disabled:opacity-50"
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
