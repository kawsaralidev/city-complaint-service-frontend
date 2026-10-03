"use client";

import { useState } from "react";

import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MapPin,
  PlayCircle,
  UserRound,
} from "lucide-react";

import {
  useComplaints,
  useUpdateComplaintStatus,
} from "@/hooks/complaint.hook";

import type { Complaint, ComplaintStatus } from "@/types/complaint";

const PAGE_LIMIT = 10;

const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "ASSIGNED":
      return "border-purple-200 bg-purple-50 text-purple-600";

    case "IN_PROGRESS":
      return "border-primary/20 bg-primary/10 text-primary";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-600";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-600";

    case "CANCELED":
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

const formatDate = (date?: string | null) => {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const ComplaintsPage = () => {
  const [updatingComplaintId, setUpdatingComplaintId] = useState<string | null>(
    null,
  );

  // =========================================
  // PAGINATION
  // =========================================

  const [page, setPage] = useState(1);

  // =========================================
  // GET COMPLAINTS
  // =========================================

  const {
    data: complaintsResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useComplaints({
    page,
    limit: PAGE_LIMIT,
  });

  const updateStatusMutation = useUpdateComplaintStatus();

  const complaints = complaintsResponse?.data ?? [];

  // Backend pagination data
  const pagination = complaintsResponse?.meta;

  const totalComplaints = pagination?.total ?? 0;

  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  // =========================================
  // STATUS UPDATE
  // ASSIGNED → IN_PROGRESS
  // IN_PROGRESS → COMPLETED
  // =========================================

  const handleStatusUpdate = (
    complaintId: string,
    status: "IN_PROGRESS" | "COMPLETED",
  ) => {
    setUpdatingComplaintId(complaintId);

    updateStatusMutation.mutate(
      {
        complaintId,
        status,
      },
      {
        onSettled: () => {
          setUpdatingComplaintId(null);
        },
      },
    );
  };

  // =========================================
  // PAGINATION HANDLERS
  // =========================================

  const handlePreviousPage = () => {
    if (page > 1 && !isFetching) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages && !isFetching) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  // =========================================
  // LOADING
  // =========================================

  if (isLoading) {
    return (
      <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
        {/* Header Skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-8 w-52 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>

        {/* Complaint Skeletons */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          >
            <div className="animate-pulse p-6">
              <div className="flex gap-3">
                <div className="h-11 w-11 rounded-xl bg-muted" />

                <div className="flex-1">
                  <div className="h-5 w-48 rounded bg-muted" />

                  <div className="mt-2 h-4 w-80 max-w-full rounded bg-muted" />
                </div>
              </div>
            </div>

            <div className="grid animate-pulse gap-5 border-t border-border p-6 sm:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((column) => (
                <div key={column}>
                  <div className="h-3 w-16 rounded bg-muted" />

                  <div className="mt-2 h-4 w-28 rounded bg-muted" />
                </div>
              ))}
            </div>

            <div className="h-16 animate-pulse border-t border-border bg-muted/20" />
          </div>
        ))}
      </div>
    );
  }

  // =========================================
  // ERROR
  // =========================================

  if (error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <ClipboardList className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-foreground">
            Could not load complaints
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Something went wrong while loading your assigned complaints. Please
            try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <ClipboardList className="h-3.5 w-3.5" />
              Officer Workspace
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              My Complaints
            </h1>

            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              Manage your assigned complaints and update their progress directly
              from here.
            </p>
          </div>

          {/* Total Complaints */}

          <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Assigned Complaints
              </p>

              <p className="text-xl font-bold text-foreground">
                {totalComplaints}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refresh indicator */}

      {isFetching && !isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          Updating complaints...
        </div>
      )}

      {/* =========================================
          EMPTY STATE
      ========================================= */}

      {complaints.length === 0 && (
        <section className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <ClipboardList className="h-6 w-6" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-foreground">
            No complaints assigned
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            You currently do not have any complaints assigned to you. Assigned
            complaints will appear here.
          </p>
        </section>
      )}

      {/* =========================================
          COMPLAINT LIST
      ========================================= */}

      <div className="space-y-5">
        {complaints.map((complaint: Complaint) => {
          const isUpdating = updatingComplaintId === complaint.id;

          const isAssigned = complaint.status === "ASSIGNED";

          const isInProgress = complaint.status === "IN_PROGRESS";

          const isCompleted = complaint.status === "COMPLETED";

          const isRejected = complaint.status === "REJECTED";

          const isCanceled = complaint.status === "CANCELED";

          return (
            <article
              key={complaint.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              {/* =======================================
                  TITLE + STATUS
              ======================================= */}

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  {/* Complaint Icon */}

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <ClipboardList className="h-5 w-5" />
                  </div>

                  {/* Title */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h2 className="text-base font-bold text-foreground sm:text-lg">
                          {complaint.title}
                        </h2>

                        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
                          {complaint.description}
                        </p>
                      </div>

                      {/* Current Status */}

                      <span
                        className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          complaint.status,
                        )}`}
                      >
                        {formatStatus(complaint.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =======================================
                  INFORMATION + ACTION COLUMN
              ======================================= */}

              <div className="grid border-t border-border lg:grid-cols-[1fr_1fr_1fr_1fr_190px]">
                {/* Category */}

                <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </p>

                  <p className="mt-1.5 truncate text-sm font-medium text-foreground">
                    {complaint.category?.name ?? "—"}
                  </p>
                </div>

                {/* Location */}

                <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>

                  <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />

                    <p className="truncate text-sm font-medium text-foreground">
                      {complaint.location}
                    </p>
                  </div>
                </div>

                {/* Citizen */}

                <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Citizen
                  </p>

                  <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                    <UserRound className="h-4 w-4 shrink-0 text-secondary" />

                    <p className="truncate text-sm font-medium text-foreground">
                      {complaint.citizen?.name ?? "—"}
                    </p>
                  </div>
                </div>

                {/* Assigned Date */}

                <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Assigned
                  </p>

                  <div className="mt-1.5 flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4 shrink-0 text-primary" />

                    <p className="truncate text-sm font-medium text-foreground">
                      {formatDate(
                        complaint.assignment?.assignedAt ?? complaint.createdAt,
                      )}
                    </p>
                  </div>
                </div>

                {/* ===================================
                    ACTION COLUMN
                =================================== */}

                <div className="flex items-center p-4 sm:p-5">
                  {/* ASSIGNED → START WORK */}

                  {isAssigned && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusUpdate(complaint.id, "IN_PROGRESS")
                      }
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <PlayCircle className="h-4 w-4" />

                      {isUpdating ? "Starting..." : "Start Work"}
                    </button>
                  )}

                  {/* IN PROGRESS → MARK COMPLETED */}

                  {isInProgress && (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() =>
                        handleStatusUpdate(complaint.id, "COMPLETED")
                      }
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />

                      {isUpdating ? "Completing..." : "Completed"}
                    </button>
                  )}

                  {/* COMPLETED → DISABLED */}

                  {isCompleted && (
                    <button
                      type="button"
                      disabled
                      className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 text-sm font-semibold text-green-600 opacity-60"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </button>
                  )}

                  {/* REJECTED */}

                  {isRejected && (
                    <div className="flex h-11 w-full items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600">
                      Rejected
                    </div>
                  )}

                  {/* CANCELED */}

                  {isCanceled && (
                    <div className="flex h-11 w-full items-center justify-center rounded-lg border border-border bg-muted px-4 text-sm font-semibold text-muted-foreground">
                      Canceled
                    </div>
                  )}

                  {/* ANY OTHER STATUS */}

                  {!isAssigned &&
                    !isInProgress &&
                    !isCompleted &&
                    !isRejected &&
                    !isCanceled && (
                      <div className="flex h-11 w-full items-center justify-center rounded-lg border border-border bg-muted px-4 text-xs font-medium text-muted-foreground">
                        No action
                      </div>
                    )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* =========================================
          PAGINATION
      ========================================= */}

      {totalPages > 1 && (
        <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Page Information */}

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

            {/* Pagination Controls */}

            <div className="flex items-center justify-between gap-2 sm:justify-end">
              {/* Previous */}

              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1 || isFetching}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {/* Current Page */}

              <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-secondary px-3 text-xs font-semibold text-primary-foreground">
                {page}
              </div>

              {/* Page Text */}

              <span className="text-xs text-muted-foreground">
                of {totalPages}
              </span>

              {/* Next */}

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
        </div>
      )}
    </div>
  );
};

export default ComplaintsPage;
