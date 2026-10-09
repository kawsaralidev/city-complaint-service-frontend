"use client";

import { Pencil, Plus, Power, X } from "lucide-react";
import { useState } from "react";

import CategoryForm from "@/components/form/CategoryForm";
import { useCategories, useUpdateCategoryStatus } from "@/hooks/category.hook";

import type { Category } from "@/types/dashboard";
import RoleGuard from "../../guard/role-guard";

const AdminCategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updatingCategoryId, setUpdatingCategoryId] = useState<string | null>(
    null,
  );

  const { data: categories = [], isLoading, isError } = useCategories();

  const updateCategoryStatusMutation = useUpdateCategoryStatus();

  // Open dialog for adding a new category
  const handleAdd = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing category
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
  };

  // Close dialog after successful add/update
  const handleFormSuccess = () => {
    handleCloseDialog();
  };

  // Activate or deactivate category
  const handleStatusChange = (category: Category) => {
    const action = category.isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this category?`,
    );

    if (!confirmed) return;

    setUpdatingCategoryId(category.id);

    updateCategoryStatusMutation.mutate(
      {
        categoryId: category.id,
        isActive: !category.isActive,
      },
      {
        onSettled: () => {
          setUpdatingCategoryId(null);
        },
      },
    );
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Categories
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage complaint categories.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-secondary/90"
          >
            <Plus className="h-4 w-4 text-white" />
            Add Category
          </button>
        </div>

        {/* Category List */}
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Category List
            </h2>
          </div>

          {isLoading && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Loading categories...
              </p>
            </div>
          )}

          {isError && !isLoading && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Failed to load categories.
              </p>
            </div>
          )}

          {!isLoading && !isError && categories.length === 0 && (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No categories found.
              </p>
            </div>
          )}

          {!isLoading && !isError && categories.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-5 py-4 text-left text-sm font-medium text-foreground">
                      Category Name
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-medium text-foreground">
                      Type
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-medium text-foreground">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-foreground">
                          {category.name}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-muted-foreground">
                          {category.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            category.isActive
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-destructive "
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => handleEdit(category)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label={`Edit ${category.name}`}
                            title="Edit category"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          {/* Activate / Deactivate */}
                          <button
                            type="button"
                            disabled={updatingCategoryId === category.id}
                            onClick={() => handleStatusChange(category)}
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                              category.isActive
                                ? "border border-destructive/30 text-destructive hover:bg-destructive/10"
                                : "border border-secondary/30 text-secondary hover:bg-secondary/10"
                            }`}
                            aria-label={
                              category.isActive
                                ? `Deactivate ${category.name}`
                                : `Activate ${category.name}`
                            }
                            title={
                              category.isActive
                                ? "Deactivate category"
                                : "Activate category"
                            }
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add / Edit Category Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-xl">
              {/* Dialog Header */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {selectedCategory ? "Edit Category" : "Add Category"}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedCategory
                      ? "Update the category name below."
                      : "Create a new category by entering a name."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Same Form for Add and Edit */}
              <CategoryForm
                category={selectedCategory}
                onSuccess={handleFormSuccess}
              />

              {/* Cancel */}
              <button
                type="button"
                onClick={handleCloseDialog}
                className="mt-3 h-10 w-full rounded-lg border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

export default AdminCategoriesPage;
