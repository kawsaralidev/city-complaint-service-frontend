"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  Trash2,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCategories } from "@/hooks/category.hook";
import { useComplaints, useDeleteComplaint } from "@/hooks/complaint.hook";

import type { Complaint, ComplaintStatus } from "@/types/complaint";

import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { Category } from "@/types/dashboard";
import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

const statusOptions: {
  value: ComplaintStatus;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
  {
    value: "CANCELED",
    label: "Canceled",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return "border-[#fdba2d]/30 bg-[#fdba2d]/10 text-[#b77900]";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "ASSIGNED":
      return "border-purple-200 bg-purple-50 text-purple-600";

    case "IN_PROGRESS":
      return "border-primary/20 bg-primary/10 text-primary";

    case "COMPLETED":
      return "border-[#08a85b]/20 bg-[#08a85b]/10 text-[#07834a]";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-600";

    case "CANCELED":
      return "border-gray-200 bg-gray-100 text-gray-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const ComplaintsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * ============================================================
   * URL STATE
   * ============================================================
   */

  const searchFromUrl = searchParams.get("search") ?? "";

  const statusFromUrl = searchParams.get("status");

  const categoryFromUrl = searchParams.get("categoryId") ?? "";

  const sortFromUrl = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const currentStatus =
    statusFromUrl &&
    statusOptions.some((option) => option.value === statusFromUrl)
      ? (statusFromUrl as ComplaintStatus)
      : undefined;

  const [searchInput, setSearchInput] = useState(searchFromUrl);

  const [deletingComplaintId, setDeletingComplaintId] = useState<string | null>(
    null,
  );

  /*
   * Keep search input synchronized with browser
   * back / forward navigation.
   */
  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  /*
   * ============================================================
   * UPDATE URL
   * ============================================================
   */

  const updateUrl = (updates: {
    search?: string;
    status?: string;
    categoryId?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    /*
     * Search
     */
    if (updates.search !== undefined) {
      const trimmedSearch = updates.search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.delete("page");
    }

    /*
     * Status
     */
    if (updates.status !== undefined) {
      if (updates.status) {
        params.set("status", updates.status);
      } else {
        params.delete("status");
      }

      params.delete("page");
    }

    /*
     * Category
     */
    if (updates.categoryId !== undefined) {
      if (updates.categoryId) {
        params.set("categoryId", updates.categoryId);
      } else {
        params.delete("categoryId");
      }

      params.delete("page");
    }

    /*
     * Sort
     */
    if (updates.sortOrder !== undefined) {
      params.set("sortOrder", updates.sortOrder);

      params.delete("page");
    }

    /*
     * Page
     */
    if (updates.page !== undefined) {
      if (updates.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(updates.page));
      }
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  /*
   * ============================================================
   * GET COMPLAINTS
   * ============================================================
   */

  const {
    data: complaintsResponse,
    isLoading,
    isFetching,
    error,
  } = useComplaints({
    page: currentPage,
    limit: PAGE_LIMIT,
    search: searchFromUrl || undefined,
    status: currentStatus,
    categoryId: categoryFromUrl || undefined,
    sortOrder: sortFromUrl,
  });

  /*
   * ============================================================
   * GET CATEGORIES
   * ============================================================
   */

  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useCategories();

  /*
   * ============================================================
   * DELETE MUTATION
   * ============================================================
   */

  const deleteComplaintMutation = useDeleteComplaint();

  /*
   * ============================================================
   * DATA
   * ============================================================
   */

  const complaints = complaintsResponse?.data ?? [];

  const pagination = complaintsResponse?.meta;

  const totalComplaints = pagination?.total ?? 0;

  const totalPages = pagination?.totalPages ?? 1;

  /*
   * Categories returned from API
   */
  const categories: Category[] = Array.isArray(categoriesResponse)
    ? categoriesResponse
    : [];

  const complaintCategories: Category[] = categories.filter(
    (category) => category.type === "COMPLAINT",
  );

  /*
   * ============================================================
   * SEARCH
   * ============================================================
   */

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
    });
  };

  /*
   * ============================================================
   * STATUS FILTER
   * ============================================================
   */

  const handleStatusChange = (value: string) => {
    updateUrl({
      status: value,
    });
  };

  /*
   * ============================================================
   * CATEGORY FILTER
   * ============================================================
   */

  const handleCategoryChange = (value: string) => {
    updateUrl({
      categoryId: value,
    });
  };

  /*
   * ============================================================
   * SORT
   * ============================================================
   */

  const handleSortChange = (value: "asc" | "desc") => {
    updateUrl({
      sortOrder: value,
    });
  };

  /*
   * ============================================================
   * CLEAR ALL FILTERS
   * ============================================================
   */

  const handleClearFilters = () => {
    setSearchInput("");

    router.push(pathname);
  };

  /*
   * ============================================================
   * DELETE COMPLAINT
   * ============================================================
   */

  const handleDeleteComplaint = (complaintId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingComplaintId(complaintId);

    deleteComplaintMutation.mutate(complaintId, {
      onSettled: () => {
        setDeletingComplaintId(null);
      },
    });
  };

  /*
   * ============================================================
   * PAGINATION
   * ============================================================
   */

  const handlePreviousPage = () => {
    if (currentPage <= 1) {
      return;
    }

    updateUrl({
      page: currentPage - 1,
    });
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) {
      return;
    }

    updateUrl({
      page: currentPage + 1,
    });
  };

  /*
   * Active filter check
   */
  const hasActiveFilters =
    Boolean(searchFromUrl) ||
    Boolean(currentStatus) ||
    Boolean(categoryFromUrl) ||
    sortFromUrl === "asc";

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6 pb-8 p-7">
        {/* ======================================================
            PAGE HEADER
        ======================================================= */}

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                <ClipboardList className="h-3.5 w-3.5" />
                Complaint Management
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Complaints
              </h1>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                Review, monitor and manage citizen complaints from one place.
              </p>
            </div>

            {/* Total Complaints */}
            <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-background/80 px-4 py-3 shadow-sm backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Complaints
                </p>

                <p className="text-xl font-bold text-foreground">
                  {isLoading ? "—" : totalComplaints}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            FILTERS
        ======================================================= */}

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search complaints..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-24 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              {isFetching ? (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 inline-flex h-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Search
                </button>
              )}
            </form>

            {/* Status */}
            <select
              value={currentStatus ?? ""}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 xl:w-44"
            >
              <option value="">All Status</option>

              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Category */}
            <select
              value={categoryFromUrl}
              onChange={(event) => handleCategoryChange(event.target.value)}
              disabled={categoriesLoading}
              className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 xl:w-48"
            >
              <option value="">
                {categoriesLoading ? "Loading categories..." : "All Categories"}
              </option>

              {complaintCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <select
                value={sortFromUrl}
                onChange={(event) =>
                  handleSortChange(
                    event.target.value === "asc" ? "asc" : "desc",
                  )
                }
                className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-8 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 xl:w-44"
              >
                <option value="desc">Newest First</option>

                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Active filters:
              </span>

              {searchFromUrl && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Search: {searchFromUrl}
                </span>
              )}

              {currentStatus && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Status: {formatStatus(currentStatus)}
                </span>
              )}

              {categoryFromUrl && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Category selected
                </span>
              )}

              {sortFromUrl === "asc" && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  Oldest first
                </span>
              )}

              <button
                type="button"
                onClick={handleClearFilters}
                className="ml-auto text-xs font-semibold text-destructive transition-colors hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* ======================================================
            ERROR
        ======================================================= */}

        {error && (
          <div className="flex justify-center">
            <ErrorState
              title="Failed to load complaints"
              description={
                error instanceof Error
                  ? error.message
                  : "Something went wrong. Please try again."
              }
            />
          </div>
        )}

        {/* ======================================================
            COMPLAINT TABLE
        ======================================================= */}

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Complaint List
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Showing {complaints.length} of {totalComplaints} complaints
              </p>
            </div>

            {isFetching && !isLoading && (
              <span className="text-xs font-medium text-primary">
                Updating...
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="space-y-3 p-5">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : complaints.length === 0 ? (
            /* Empty */
            <div className="flex min-h-[300px] items-center justify-center px-5">
              <EmptyState
                title="No complaints found"
                description={
                  searchFromUrl || currentStatus || categoryFromUrl
                    ? "Try changing your search or filters to find what you are looking for."
                    : "There are currently no complaints to display."
                }
              />
            </div>
          ) : (
            <>
              {/* Responsive Table */}
              <div className="w-full min-w-0 overflow-x-auto">
                <Table className="min-w-[1000px] w-full table-fixed">
                  <TableHeader>
                    <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[22%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Complaint
                      </TableHead>

                      <TableHead className="w-[13%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Category
                      </TableHead>

                      <TableHead className="w-[15%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Citizen
                      </TableHead>

                      <TableHead className="w-[14%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Location
                      </TableHead>

                      <TableHead className="w-[10%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Status
                      </TableHead>

                      <TableHead className="w-[10%] px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 lg:px-4">
                        Created
                      </TableHead>

                      <TableHead className="w-[16%] px-1 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:px-2 lg:px-3">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {complaints.map((complaint: Complaint) => (
                      <TableRow
                        key={complaint.id}
                        className="group border-b border-border transition-colors hover:bg-muted/20"
                      >
                        {/* Complaint */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                            <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary sm:flex">
                              <ClipboardList className="h-4 w-4" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                                {complaint.title}
                              </p>

                              <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                                {complaint.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <span className="block truncate rounded-md border border-border bg-background px-1.5 py-1 text-[10px] font-medium text-foreground sm:px-2 sm:text-xs">
                            {complaint.category?.name ?? "—"}
                          </span>
                        </TableCell>

                        {/* Citizen */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                            <div className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary sm:flex">
                              <UserRound className="h-3.5 w-3.5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-foreground">
                                {complaint.citizen?.name ?? "—"}
                              </p>

                              <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                                {complaint.citizen?.email ?? "—"}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Location */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <div className="flex min-w-0 items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0 text-primary" />

                            <span className="truncate text-[10px] leading-5 sm:text-xs">
                              {complaint.location}
                            </span>
                          </div>
                        </TableCell>

                        {/* Status */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <span
                            className={`inline-flex max-w-full items-center rounded-full border px-1.5 py-1 text-[10px] font-semibold sm:px-2 sm:text-xs ${getStatusStyle(
                              complaint.status,
                            )}`}
                          >
                            <span className="truncate">
                              {formatStatus(complaint.status)}
                            </span>
                          </span>
                        </TableCell>

                        {/* Created */}
                        <TableCell className="min-w-0 overflow-hidden px-2 py-3 sm:px-3 lg:px-4">
                          <div className="flex min-w-0 items-center gap-1 text-muted-foreground">
                            <CalendarDays className="h-3 w-3 shrink-0" />

                            <span className="truncate text-[10px] sm:text-xs">
                              {formatDate(complaint.createdAt)}
                            </span>
                          </div>
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="min-w-0 px-1 py-3 text-center sm:px-2 lg:px-3">
                          <div className="flex items-center justify-center gap-1">
                            {/* View */}
                            <Link
                              href={`/dashboard/admin-dashboard/complaints/${complaint.id}`}
                              title="View complaint"
                              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary lg:h-9 lg:w-auto lg:gap-1 lg:px-2.5"
                            >
                              <Eye className="h-3.5 w-3.5" />

                              <span className="hidden text-xs lg:inline">
                                View
                              </span>
                            </Link>

                            {/* Delete */}
                            {(() => {
                              const canDelete =
                                complaint.status === "REJECTED" ||
                                complaint.status === "CANCELED";

                              const isDeleting =
                                deletingComplaintId === complaint.id;

                              return (
                                <button
                                  type="button"
                                  title={
                                    canDelete
                                      ? "Delete complaint"
                                      : "Only rejected or canceled complaints can be deleted"
                                  }
                                  disabled={!canDelete || isDeleting}
                                  onClick={() => {
                                    if (!canDelete) {
                                      return;
                                    }

                                    handleDeleteComplaint(complaint.id);
                                  }}
                                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors lg:h-9 lg:w-auto lg:gap-1 lg:px-2.5 ${
                                    canDelete
                                      ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                                      : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
                                  }`}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />

                                  <span className="hidden text-xs lg:inline">
                                    {isDeleting ? "Deleting..." : "Delete"}
                                  </span>
                                </button>
                              );
                            })()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* ====================================================
                  PAGINATION
              ===================================================== */}

              <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {complaints.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {totalComplaints}
                    </span>{" "}
                    complaints
                  </p>

                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Page{" "}
                    <span className="font-semibold text-foreground">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {totalPages}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || isFetching}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-secondary px-3 text-xs font-semibold text-primary-foreground">
                    {currentPage}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages || isFetching}
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default ComplaintsPage;
