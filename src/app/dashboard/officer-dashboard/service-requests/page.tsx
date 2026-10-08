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
  useAssignedServiceRequests,
  useUpdateServiceRequestStatus,
} from "@/hooks/service-request.hook";

import type { ServiceRequestStatus } from "@/types/service-request";

import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

/* ============================================================
   STATUS STYLE
============================================================ */

const getStatusStyle = (status: ServiceRequestStatus) => {
  switch (status) {
    case "PENDING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "PAYMENT_PENDING":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "CONFIRMED":
      return "border-cyan-200 bg-cyan-50 text-cyan-700";

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

/* ============================================================
   FORMAT STATUS
============================================================ */

const formatStatus = (status: ServiceRequestStatus) => {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

/* ============================================================
   FORMAT DATE
============================================================ */

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

/* ============================================================
   PAGE
============================================================ */

const ServiceRequestsPage = () => {
  const [page, setPage] = useState(1);

  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(
    null,
  );

  /*
   * ============================================================
   * GET OFFICER'S ASSIGNED SERVICE REQUESTS
   *
   * Backend returns all assigned service requests.
   * Pagination is handled locally on this page.
   * ============================================================
   */

  const {
    data: serviceRequestsResponse,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useAssignedServiceRequests();

  const updateStatusMutation = useUpdateServiceRequestStatus();

  /*
   * ============================================================
   * RESPONSE DATA
   * ============================================================
   */

  const serviceRequests = serviceRequestsResponse ?? [];

  const totalRequests = serviceRequests.length;

  const totalPages = Math.ceil(totalRequests / PAGE_LIMIT);

  const startIndex = (page - 1) * PAGE_LIMIT;

  /*
   * Show only 10 service requests on each page.
   */

  const currentRequests = serviceRequests.slice(
    startIndex,
    startIndex + PAGE_LIMIT,
  );

  /*
   * ============================================================
   * KEEP PAGE VALID
   *
   * Example:
   * Page 2 had 1 request and that request is updated/removed.
   * Then automatically return to page 1.
   * ============================================================
   */

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  /*
   * ============================================================
   * UPDATE SERVICE REQUEST STATUS
   *
   * ASSIGNED → IN_PROGRESS
   * IN_PROGRESS → COMPLETED
   * ============================================================
   */

  const handleStatusUpdate = (
    requestId: string,
    status: "IN_PROGRESS" | "COMPLETED",
  ) => {
    setUpdatingRequestId(requestId);

    updateStatusMutation.mutate(
      {
        id: requestId,
        data: {
          status,
        },
      },
      {
        onSettled: () => {
          setUpdatingRequestId(null);
        },
      },
    );
  };

  /*
   * ============================================================
   * PREVIOUS PAGE
   * ============================================================
   */

  const handlePreviousPage = () => {
    if (page > 1 && !isFetching) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  /*
   * ============================================================
   * NEXT PAGE
   * ============================================================
   */

  const handleNextPage = () => {
    if (page < totalPages && !isFetching) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (isLoading) {
    return (
      <RoleGuard requiredRole="OFFICER">
        <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
          {/* Header skeleton */}

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-8 w-60 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-muted" />
          </div>

          {/* Card skeleton */}

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="animate-pulse p-5 sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="h-48 w-full shrink-0 rounded-xl bg-muted sm:h-32 sm:w-44" />

                  <div className="flex-1">
                    <div className="h-6 w-52 rounded bg-muted" />

                    <div className="mt-3 h-4 w-full max-w-xl rounded bg-muted" />

                    <div className="mt-3 h-4 w-4/5 rounded bg-muted" />

                    <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                      {[1, 2, 3, 4].map((info) => (
                        <div key={info}>
                          <div className="h-3 w-16 rounded bg-muted" />
                          <div className="mt-2 h-5 w-24 rounded bg-muted" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border p-4 sm:p-5">
                <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </RoleGuard>
    );
  }

  /*
   * ============================================================
   * ERROR
   * ============================================================
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
              Could not load service requests
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Something went wrong while loading your assigned service requests.
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

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
        {/* ======================================================
            HEADER
        ======================================================= */}

        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <ClipboardList className="h-3.5 w-3.5" />
                Officer Workspace
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Service Requests
              </h1>

              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Manage your assigned service requests and update their progress
                directly from here.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Assigned Requests
                </p>

                <p className="text-xl font-bold text-foreground">
                  {totalRequests}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            FETCHING INDICATOR
        ======================================================= */}

        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Updating service requests...
          </div>
        )}

        {/* ======================================================
            EMPTY STATE
        ======================================================= */}

        {totalRequests === 0 && (
          <section className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-foreground">
              No service requests assigned
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              You currently do not have any service requests assigned to you.
              Assigned service requests will appear here.
            </p>
          </section>
        )}

        {/* ======================================================
            SERVICE REQUEST LIST
        ======================================================= */}

        {totalRequests > 0 && (
          <div className="space-y-5">
            {currentRequests.map((request) => {
              const isUpdating = updatingRequestId === request.id;

              const isAssigned = request.status === "ASSIGNED";

              const isInProgress = request.status === "IN_PROGRESS";

              const isCompleted = request.status === "COMPLETED";

              const isRejected = request.status === "REJECTED";

              const isCanceled = request.status === "CANCELED";

              return (
                <article
                  key={request.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* ==================================================
                      MAIN CONTENT
                  =================================================== */}

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row">
                      {/* ==================================================
                          IMAGE
                      =================================================== */}

                      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-44">
                        {request.imageUrl ? (
                          <Image
                            src={request.imageUrl}
                            alt={request.service?.name ?? "Service request"}
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

                      {/* ==================================================
                          SERVICE REQUEST INFORMATION
                      =================================================== */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h2 className="text-base font-bold text-foreground sm:text-lg">
                              {request.service?.name ?? "Service Request"}
                            </h2>

                            {request.description && (
                              <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                {request.description}
                              </p>
                            )}
                          </div>

                          {/* STATUS */}

                          <span
                            className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              request.status,
                            )}`}
                          >
                            {formatStatus(request.status)}
                          </span>
                        </div>

                        {/* ==================================================
                            INFORMATION
                        =================================================== */}

                        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                          {/* SERVICE */}

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Service
                            </p>

                            <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                              <ClipboardList className="h-4 w-4 shrink-0 text-primary" />

                              <p className="truncate text-sm font-medium text-foreground">
                                {request.service?.name ?? "—"}
                              </p>
                            </div>
                          </div>

                          {/* LOCATION */}

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Location
                            </p>

                            <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                              <MapPin className="h-4 w-4 shrink-0 text-primary" />

                              <p className="truncate text-sm font-medium text-foreground">
                                {request.location ?? "—"}
                              </p>
                            </div>
                          </div>

                          {/* CITIZEN */}

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Citizen
                            </p>

                            <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                              <UserRound className="h-4 w-4 shrink-0 text-secondary" />

                              <p className="truncate text-sm font-medium text-foreground">
                                {request.citizen?.name ?? "—"}
                              </p>
                            </div>
                          </div>

                          {/* ASSIGNED */}

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Assigned
                            </p>

                            <div className="mt-1.5 flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4 shrink-0 text-primary" />

                              <p className="truncate text-sm font-medium text-foreground">
                                {formatDate(
                                  request.assignment?.assignedAt ??
                                    request.assignedAt ??
                                    request.createdAt,
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==================================================
                      ACTION AREA
                  =================================================== */}

                  <div className="border-t border-border p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Service Request Progress
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Update the service request when you start or finish
                          the work.
                        </p>
                      </div>

                      <div className="w-full sm:w-52">
                        {/* ASSIGNED → IN_PROGRESS */}

                        {isAssigned && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(request.id, "IN_PROGRESS")
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
                              handleStatusUpdate(request.id, "COMPLETED")
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

                        {/* OTHER STATUS */}

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

        {/* ======================================================
            PAGINATION
        ======================================================= */}

        {totalPages > 1 && (
          <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:px-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {startIndex + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-semibold text-foreground">
                    {Math.min(startIndex + PAGE_LIMIT, totalRequests)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {totalRequests}
                  </span>{" "}
                  service requests
                </p>

                {isFetching && !isLoading && (
                  <p className="mt-1 text-xs text-primary">
                    Updating results...
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
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

                <span className="text-xs text-muted-foreground">
                  of {totalPages}
                </span>

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
    </RoleGuard>
  );
};

export default ServiceRequestsPage;
