"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MapPin,
  Search,
  UserRound,
} from "lucide-react";

import { useCategories } from "@/hooks/category.hook";
import { useComplaints } from "@/hooks/complaint.hook";

import type { ComplaintStatus } from "@/types/complaint";

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
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    value: "RESOLVED",
    label: "Resolved",
  },
  {
    value: "CLOSED",
    label: "Closed",
  },
];

const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "PENDING":
      return "border-[#fdba2d]/30 bg-[#fdba2d]/10 text-[#b77900]";

    case "ASSIGNED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "IN_PROGRESS":
      return "border-secondary/20 bg-secondary/10 text-secondary";

    case "RESOLVED":
      return "border-[#08a85b]/20 bg-[#08a85b]/10 text-[#07834a]";

    case "CLOSED":
      return "border-gray-200 bg-gray-100 text-gray-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatStatus = (status: ComplaintStatus) => {
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

  // Backend returns complaints in data and pagination in meta
  const complaints = complaintsResponse?.data ?? [];

  const pagination = complaintsResponse?.meta;

  const totalComplaints = pagination?.total ?? 0;

  const totalPages = pagination?.totalPages ?? 1;

  const complaintCategories =
    categories?.filter((category) => category.type === "COMPLAINT") ?? [];

  const selectedCategory = complaintCategories.find(
    (category) => category.id === categoryId,
  );

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
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/5 px-3 py-1.5 text-xs font-medium text-secondary">
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

          {/* Total complaints */}
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
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-secondary focus:ring-4 focus:ring-secondary/10"
            />

            {isFetching && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-secondary/20 border-t-secondary" />
              </div>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={status ?? ""}
            onChange={(event) => handleStatusChange(event.target.value)}
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-secondary focus:ring-4 focus:ring-secondary/10 lg:w-44"
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
            className="h-11 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition-all focus:border-secondary focus:ring-4 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60 lg:w-48"
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

        {/* Active filter information */}
        {(search || status || categoryId) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              Active filters:
            </span>

            {search && (
              <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                Search: {search}
              </span>
            )}

            {status && (
              <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                Status: {formatStatus(status)}
              </span>
            )}

            {categoryId && (
              <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                Category: {selectedCategory?.name ?? "Selected"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

          <div>
            <p className="text-sm font-semibold text-destructive">
              Failed to load complaints
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>
          </div>
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
            <span className="text-xs font-medium text-secondary">
              Updating...
            </span>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 6 }).map((_, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Loading skeleton items are static
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : complaints.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h3 className="text-base font-semibold text-foreground">
              No complaints found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {search || status || categoryId
                ? "Try changing your search or filters to find what you are looking for."
                : "There are currently no complaints to display."}
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Complaint
                    </th>

                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </th>

                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Citizen
                    </th>

                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Location
                    </th>

                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>

                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {complaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      className="group border-b border-border last:border-b-0 transition-colors hover:bg-muted/20"
                    >
                      {/* Complaint */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[280px] items-start gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                            <ClipboardList className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {complaint.title}
                            </p>

                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {complaint.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground">
                          {complaint.category.name}
                        </span>
                      </td>

                      {/* Citizen */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                            <UserRound className="h-3.5 w-3.5" />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[160px] truncate text-sm font-medium text-foreground">
                              {complaint.citizen.name}
                            </p>

                            <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                              {complaint.citizen.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        <div className="flex max-w-[180px] items-start gap-1.5 text-muted-foreground">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />

                          <span className="line-clamp-2 text-xs leading-5">
                            {complaint.location}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                            complaint.status,
                          )}`}
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                          {formatStatus(complaint.status)}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />

                          {formatDate(complaint.createdAt)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-secondary px-3 text-xs font-semibold text-secondary-foreground">
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
