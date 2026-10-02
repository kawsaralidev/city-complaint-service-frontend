"use client";

import { useEffect, useState } from "react";
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
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";

import { useCategories } from "@/hooks/category.hook";
import { useComplaints } from "@/hooks/complaint.hook";

import type { Complaint, ComplaintStatus } from "@/types/complaint";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";

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
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<ComplaintStatus | undefined>(undefined);

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(1);

  // Debounce search before sending request
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Get complaints from backend
  const {
    data: complaintsResponse,
    isLoading,
    isFetching,
    error,
  } = useComplaints({
    page,
    limit: PAGE_LIMIT,
    search: search || undefined,
    status,
    categoryId,
  });

  // Get categories for category filter
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  /*
   * Backend response can reach the frontend in two possible forms:
   *
   * 1. data = complaints[]
   *    meta = pagination
   *
   * 2. data = {
   *      complaints: [],
   *      pagination: {}
   *    }
   *
   * Handle both formats here.
   */
  const complaints = complaintsResponse?.data ?? [];

  const pagination = complaintsResponse?.meta;

  const totalComplaints = pagination?.total ?? 0;

  const totalPages = pagination?.totalPages ?? 1;

  const complaintCategories =
    categories?.filter((category) => category.type === "COMPLAINT") ?? [];

  const handleStatusChange = (value: string) => {
    setStatus(value ? (value as ComplaintStatus) : undefined);

    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryId(value || undefined);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  return (
    <div className="space-y-6 pb-8 p-7">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        {/* Decorative background */}
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

      {/* Filters */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search complaints..."
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            {isFetching && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
              </div>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={status ?? ""}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 lg:w-44"
          >
            <option value="">All Status</option>

            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryId ?? ""}
            onChange={(event) => handleCategoryChange(event.target.value)}
            disabled={categoriesLoading}
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 lg:w-48"
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
        </div>

        {/* Active Filters */}
        {(search || status || categoryId) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              Active filters:
            </span>

            {search && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Search: {search}
              </span>
            )}

            {status && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Status: {formatStatus(status)}
              </span>
            )}

            {categoryId && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Category
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error */}
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
      {/* Complaints Table */}
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
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[300px] items-center justify-center px-5">
            <EmptyState
              title="No complaints found"
              description={
                search || status || categoryId
                  ? "Try changing your search or filters to find what you are looking for."
                  : "There are currently no complaints to display."
              }
            />
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="w-full overflow-hidden">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
                    <TableHead className="w-[23%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Complaint
                    </TableHead>

                    <TableHead className="w-[14%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Category
                    </TableHead>

                    <TableHead className="w-[17%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Citizen
                    </TableHead>

                    <TableHead className="w-[16%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Location
                    </TableHead>

                    <TableHead className="w-[11%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Status
                    </TableHead>

                    <TableHead className="w-[11%] px-3 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
                      Created
                    </TableHead>

                    <TableHead className="w-[8%] px-3 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground lg:px-4">
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
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <div className="flex min-w-0 items-start gap-2">
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                            <ClipboardList className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {complaint.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-muted-foreground">
                              {complaint.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <span className="block truncate rounded-lg border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground">
                          {complaint.category?.name ?? "—"}
                        </span>
                      </TableCell>

                      {/* Citizen */}
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                            <UserRound className="h-3.5 w-3.5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground">
                              {complaint.citizen?.name ?? "—"}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                              {complaint.citizen?.email ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Location */}
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />

                          <span className="block truncate text-xs leading-5">
                            {complaint.location}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <span
                          className={`inline-flex max-w-full items-center rounded-full border px-2 py-1 text-xs font-semibold ${getStatusStyle(
                            complaint.status,
                          )}`}
                        >
                          <span className="truncate">
                            {formatStatus(complaint.status)}
                          </span>
                        </span>
                      </TableCell>

                      {/* Created */}
                      <TableCell className="overflow-hidden px-3 py-4 lg:px-4">
                        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0" />

                          <span className="truncate">
                            {formatDate(complaint.createdAt)}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-2 py-4 text-center lg:px-3">
                        <div className="flex justify-center">
                          <Link
                            href={`/complaints/${complaint.id}`}
                            className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View</span>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Page{" "}
                <span className="font-semibold text-foreground">{page}</span> of{" "}
                <span className="font-semibold text-foreground">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page === 1 || isFetching}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-secondary px-3 text-xs font-semibold text-primary-foreground">
                  {page}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page >= totalPages || isFetching}
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
  );
};

export default ComplaintsPage;
