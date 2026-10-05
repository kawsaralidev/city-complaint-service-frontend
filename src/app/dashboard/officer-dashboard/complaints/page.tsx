"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
  useAssignedComplaints,
  useUpdateComplaintStatus,
} from "@/hooks/complaint.hook";

import type { ComplaintStatus } from "@/types/complaint";

import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "PENDING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

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
  const [page, setPage] = useState(1);
  const [updatingComplaintId, setUpdatingComplaintId] = useState<string | null>(
    null,
  );

  /**
   * Get officer's assigned complaints.
   *
   * Backend returns all assignments.
   * Pagination is handled locally on this page.
   */
  const {
    data: complaintsResponse,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useAssignedComplaints();

  const updateStatusMutation = useUpdateComplaintStatus();

  /**
   * Backend returns assignment objects.
   *
   * Each assignment contains:
   * - officerId
   * - complaintId
   * - assignedBy
   * - assignedAt
   * - complaint
   */
  const assignments = complaintsResponse?.data ?? [];

  const totalComplaints = assignments.length;

  const totalPages = Math.ceil(totalComplaints / PAGE_LIMIT);

  const startIndex = (page - 1) * PAGE_LIMIT;

  /**
   * Only show 10 complaints on each page.
   */
  const currentAssignments = assignments.slice(
    startIndex,
    startIndex + PAGE_LIMIT,
  );

  /**
   * If the current page becomes invalid after an update,
   * move back to the last available page.
   */
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  /**
   * Update complaint status.
   *
   * ASSIGNED → IN_PROGRESS
   * IN_PROGRESS → COMPLETED
   */
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

  /**
   * Previous page
   */
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  /**
   * Next page
   */
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <RoleGuard requiredRole="OFFICER">
        <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-8 w-52 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
          </div>

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="animate-pulse p-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="h-32 w-full shrink-0 rounded-xl bg-muted sm:w-44" />

                  <div className="flex-1">
                    <div className="h-5 w-48 rounded bg-muted" />

                    <div className="mt-3 h-4 w-80 max-w-full rounded bg-muted" />

                    <div className="mt-3 h-4 w-56 rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RoleGuard>
    );
  }

  /**
   * Error state
   */
  if (isError) {
    return (
      <RoleGuard requiredRole="OFFICER">
        <div className="flex min-h-[500px] items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-card p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-foreground">
              Could not load complaints
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Something went wrong while loading your assigned complaints.
              Please try again.
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
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
        {/* Header */}
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
                Manage your assigned complaints and update their progress
                directly from here.
              </p>
            </div>

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

        {/* Fetching indicator */}
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Updating complaints...
          </div>
        )}

        {/* Empty state */}
        {totalComplaints === 0 && (
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

        {/* Complaint list */}
        {totalComplaints > 0 && (
          <div className="space-y-5">
            {currentAssignments.map((assignment) => {
              const complaint = assignment.complaint;

              const isUpdating = updatingComplaintId === complaint.id;

              const isAssigned = complaint.status === "ASSIGNED";

              const isInProgress = complaint.status === "IN_PROGRESS";

              const isCompleted = complaint.status === "COMPLETED";

              const isRejected = complaint.status === "REJECTED";

              const isCanceled = complaint.status === "CANCELED";

              return (
                <article
                  key={assignment.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Main content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {/* Image */}
                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-44">
                        {complaint.imageUrl ? (
                          <Image
                            src={complaint.imageUrl}
                            alt={complaint.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 176px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Complaint information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h2 className="text-base font-bold text-foreground sm:text-lg">
                              {complaint.title}
                            </h2>

                            {complaint.description && (
                              <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                {complaint.description}
                              </p>
                            )}
                          </div>

                          <span
                            className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              complaint.status,
                            )}`}
                          >
                            {formatStatus(complaint.status)}
                          </span>
                        </div>

                        {/* Information */}
                        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {/* Category */}
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Category
                            </p>

                            <p className="mt-1.5 truncate text-sm font-medium text-foreground">
                              {complaint.category?.name ?? "—"}
                            </p>
                          </div>

                          {/* Location */}
                          <div>
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
                          <div>
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

                          {/* Assigned */}
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Assigned
                            </p>

                            <div className="mt-1.5 flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4 shrink-0 text-primary" />

                              <p className="truncate text-sm font-medium text-foreground">
                                {formatDate(
                                  assignment.assignedAt ?? complaint.createdAt,
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action area */}
                  <div className="border-t border-border p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Complaint Progress
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Update the complaint when you start or finish the
                          work.
                        </p>
                      </div>

                      <div className="w-full sm:w-52">
                        {/* ASSIGNED → IN_PROGRESS */}
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

                        {/* IN_PROGRESS → COMPLETED */}
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

                            {isUpdating ? "Completing..." : "Mark as Completed"}
                          </button>
                        )}

                        {/* COMPLETED */}
                        {isCompleted && (
                          <div className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 text-sm font-semibold text-green-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                          </div>
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

                        {/* Other status */}
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
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {startIndex + 1}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(startIndex + PAGE_LIMIT, totalComplaints)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {totalComplaints}
                </span>{" "}
                complaints
              </p>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-secondary px-3 text-xs font-semibold text-primary-foreground">
                  {page}
                </div>

                <span className="text-xs text-muted-foreground">
                  of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
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
    </RoleGuard>
  );
};

export default ComplaintsPage;
