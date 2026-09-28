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

  // Set existing category name when editing
  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    // Update existing category
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

    // Create new category
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
      {/* Category Name */}
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

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
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
