"use client";

import {
  CheckCircle2,
  ChevronRight,
  FolderKanban,
  Layers3,
  Pencil,
  Plus,
  Power,
  Tags,
  X,
  XCircle,
} from "lucide-react";
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

  const activeCategories = categories.filter(
    (category) => category.isActive,
  ).length;

  const inactiveCategories = categories.length - activeCategories;

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleFormSuccess = () => {
    handleCloseDialog();
  };

  const handleStatusChange = (category: Category) => {
    const action = category.isActive ? "deactivate" : "activate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} "${category.name}"?`,
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
      <main className="min-h-full w-full bg-muted/20 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-[1600px]">
          {/* Page Header — styled like Users page */}
          <section className="relative overflow-hidden   shadow-sm  rounded-2xl border mb-8 border-border bg-card  ">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                    Category Management
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Categories
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    Manage complaint categories, organize service types, and
                    control category availability from one place.
                  </p>
                </div>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-primary shadow-sm ring-1 ring-border">
                  <Tags className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Total categories
                  </p>

                  <p className="text-xl font-bold tracking-tight text-foreground">
                    {isLoading || isError ? "—" : categories.length}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Statistics — same card style as Users page */}
          <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Categories */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Categories
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading || isError ? "—" : categories.length}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    All registered categories
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Active Categories */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading || isError ? "—" : activeCategories}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently enabled
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Inactive Categories */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Inactive
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading || isError ? "—" : inactiveCategories}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently disabled
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <XCircle className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Category Management */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-500/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Management
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading || isError ? "—" : "Ready"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Manage category settings
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <FolderKanban className="h-5 w-5" />
                </div>
              </div>
            </div>
          </section>

          {/* Category List */}
          <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderKanban className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    All Categories
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    View and manage your complaint categories.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="space-y-4 p-5 sm:p-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex animate-pulse items-center gap-4"
                  >
                    <div className="h-11 w-11 rounded-xl bg-muted" />

                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-40 rounded bg-muted" />
                      <div className="h-2.5 w-24 rounded bg-muted" />
                    </div>

                    <div className="h-7 w-20 rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {isError && !isLoading && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <XCircle className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-foreground">
                  Unable to load categories
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                  Something went wrong while fetching categories. Please try
                  again later.
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && categories.length === 0 && (
              <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Tags className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-foreground">
                  No categories found
                </h3>

                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Create your first category to organize city complaints.
                </p>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Create Category
                </button>
              </div>
            )}

            {/* Table */}
            {!isLoading && !isError && categories.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                        Category
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Type
                      </th>

                      <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {categories.map((category, index) => (
                      <tr
                        key={category.id}
                        className="group transition-colors hover:bg-muted/20"
                      >
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/10">
                              <span className="text-xs font-bold">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {category.name}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                Complaint category
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5 text-xs font-medium text-foreground">
                            <Tags className="h-3.5 w-3.5 text-primary" />
                            {category.type}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                              category.isActive
                                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                category.isActive
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />

                            {category.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(category)}
                              aria-label={`Edit ${category.name}`}
                              title="Edit category"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              disabled={updatingCategoryId === category.id}
                              onClick={() => handleStatusChange(category)}
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
                              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                category.isActive
                                  ? "border-destructive/20 bg-background text-destructive hover:bg-destructive/10"
                                  : "border-emerald-500/20 bg-background text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
                              }`}
                            >
                              {updatingCategoryId === category.id ? (
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              ) : (
                                <Power className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            {!isLoading && !isError && categories.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-border bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {categories.length}
                  </span>{" "}
                  categories
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Category management
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Add / Edit Category Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="category-dialog-title"
              className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
            >
              <div className="relative overflow-hidden border-b border-border bg-muted/30 px-6 py-5">
                <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {selectedCategory ? (
                        <Pencil className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </div>

                    <h2
                      id="category-dialog-title"
                      className="text-xl font-bold tracking-tight text-foreground"
                    >
                      {selectedCategory
                        ? "Edit Category"
                        : "Create New Category"}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedCategory
                        ? "Update the details of this category."
                        : "Add a category to organize city complaints."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseDialog}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Close dialog"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <CategoryForm
                  category={selectedCategory}
                  onSuccess={handleFormSuccess}
                />

                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="mt-3 h-11 w-full rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </RoleGuard>
  );
};

export default AdminCategoriesPage;
