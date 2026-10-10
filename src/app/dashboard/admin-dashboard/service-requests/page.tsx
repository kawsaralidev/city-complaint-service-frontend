"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Search,
  UserRound,
  X,
} from "lucide-react";

import RoleGuard from "../../guard/role-guard";

import { useActiveOfficers } from "@/hooks/complaint.hook";

import {
  useAllServiceRequests,
  useAssignServiceRequest,
  useReviewServiceRequest,
} from "@/hooks/service-request.hook";

import { useActiveServices } from "@/hooks/service.hook";

import type { ServiceRequestStatus } from "@/types/service-request";

import Link from "next/link";

const PAGE_LIMIT = 10;

const statusOptions: {
  value: ServiceRequestStatus;
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
    value: "PAYMENT_PENDING",
    label: "Payment Pending",
  },
  {
    value: "CONFIRMED",
    label: "Confirmed",
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

const getStatusStyle = (status: ServiceRequestStatus) => {
  switch (status) {
    case "PENDING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "PAYMENT_PENDING":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "CONFIRMED":
      return "border-cyan-200 bg-cyan-50 text-cyan-700";

    case "ASSIGNED":
      return "border-purple-200 bg-purple-50 text-purple-700";

    case "IN_PROGRESS":
      return "border-indigo-200 bg-indigo-50 text-indigo-700";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "CANCELED":
      return "border-gray-200 bg-gray-100 text-gray-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatStatus = (status: ServiceRequestStatus) => {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const isValidStatus = (value: string): value is ServiceRequestStatus => {
  return statusOptions.some((option) => option.value === value);
};

const AdminServiceRequestsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /*
   * ============================================================
   * URL STATE
   * ============================================================
   */

  const searchFromUrl = searchParams.get("search") ?? "";

  const statusFromUrl = searchParams.get("status") ?? "";

  const serviceIdFromUrl = searchParams.get("serviceId") ?? "";

  const sortFromUrl = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const currentStatus: ServiceRequestStatus | undefined = isValidStatus(
    statusFromUrl,
  )
    ? statusFromUrl
    : undefined;

  const currentServiceId = serviceIdFromUrl || undefined;

  /*
   * Search input is local while typing.
   * It becomes URL state after submit.
   */
  const [searchInput, setSearchInput] = useState(searchFromUrl);

  /*
   * Officer selection is UI state.
   * It should NOT be stored in URL.
   */
  const [selectedOfficer, setSelectedOfficer] = useState<
    Record<string, string>
  >({});

  /*
   * ============================================================
   * SYNC SEARCH INPUT WITH URL
   * ============================================================
   */

  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  /*
   * ============================================================
   * UPDATE URL
   * ============================================================
   */

  const updateUrl = (values: {
    search?: string;
    status?: ServiceRequestStatus;
    serviceId?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    /*
     * Search
     */
    if (values.search !== undefined) {
      const trimmedSearch = values.search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      /*
       * Whenever search changes,
       * go back to page 1.
       */
      params.delete("page");
    }

    /*
     * Status
     */
    if (values.status !== undefined) {
      params.set("status", values.status);

      /*
       * Filter change = page 1
       */
      params.delete("page");
    }

    /*
     * Service
     */
    if (values.serviceId !== undefined) {
      if (values.serviceId) {
        params.set("serviceId", values.serviceId);
      } else {
        params.delete("serviceId");
      }

      /*
       * Filter change = page 1
       */
      params.delete("page");
    }

    /*
     * Sort
     */
    if (values.sortOrder !== undefined) {
      params.set("sortOrder", values.sortOrder);

      /*
       * Sort change = page 1
       */
      params.delete("page");
    }

    /*
     * Page
     */
    if (values.page !== undefined) {
      if (values.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", values.page.toString());
      }
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  /*
   * ============================================================
   * SEARCH
   * ============================================================
   */

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
    });
  };

  /*
   * ============================================================
   * CLEAR SEARCH
   * ============================================================
   */

  const handleClearSearch = () => {
    setSearchInput("");

    updateUrl({
      search: "",
    });
  };

  /*
   * ============================================================
   * STATUS
   * ============================================================
   */

  const handleStatusChange = (value: string) => {
    if (!value) {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("status");
      params.delete("page");

      const queryString = params.toString();

      router.push(queryString ? `${pathname}?${queryString}` : pathname);

      return;
    }

    if (!isValidStatus(value)) {
      return;
    }

    updateUrl({
      status: value,
    });
  };

  /*
   * ============================================================
   * SERVICE
   * ============================================================
   */

  const handleServiceChange = (value: string) => {
    updateUrl({
      serviceId: value,
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
   * PAGINATION
   * ============================================================
   */

  const handlePreviousPage = () => {
    if (currentPage <= 1 || isFetching) {
      return;
    }

    updateUrl({
      page: currentPage - 1,
    });
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages || isFetching) {
      return;
    }

    updateUrl({
      page: currentPage + 1,
    });
  };

  /*
   * ============================================================
   * API
   * ============================================================
   */

  const {
    data: requestsResponse,
    isLoading,
    isFetching,
    isError,
  } = useAllServiceRequests({
    page: currentPage,
    limit: PAGE_LIMIT,
    search: searchFromUrl || undefined,
    status: currentStatus,
    serviceId: currentServiceId,
    sortOrder: sortFromUrl,
  });

  const { data: servicesResponse } = useActiveServices({
    page: 1,
    limit: 100,
    sortOrder: "asc",
  });

  const { data: officersResponse } = useActiveOfficers();

  const reviewMutation = useReviewServiceRequest();

  const assignMutation = useAssignServiceRequest();

  /*
   * ============================================================
   * RESPONSE DATA
   * ============================================================
   */

  const serviceRequests = requestsResponse?.data ?? [];

  const pagination = requestsResponse?.pagination;

  const totalRequests = pagination?.total ?? 0;

  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  const services = servicesResponse?.data ?? [];

  const officers = officersResponse?.data ?? [];

  /*
   * ============================================================
   * REVIEW
   * ============================================================
   */

  const handleReview = (id: string, reviewStatus: "APPROVED" | "REJECTED") => {
    const confirmed = window.confirm(
      reviewStatus === "APPROVED"
        ? "Are you sure you want to approve this service request?"
        : "Are you sure you want to reject this service request?",
    );

    if (!confirmed) {
      return;
    }

    reviewMutation.mutate({
      id,
      data: {
        status: reviewStatus,
      },
    });
  };

  /*
   * ============================================================
   * ASSIGN OFFICER
   * ============================================================
   */

  const handleAssign = (id: string) => {
    const officerId = selectedOfficer[id];

    if (!officerId) {
      window.alert("Please select an officer first.");

      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to assign this service request to this officer?",
    );

    if (!confirmed) {
      return;
    }

    assignMutation.mutate({
      id,
      data: {
        officerId,
      },
    });
  };

  const handleSearchs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
    });
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6 p-7 pb-8">
        {/* ======================================================
            HEADER
        ======================================================= */}

        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                <ClipboardList className="h-3.5 w-3.5" />
                Service Request Management
              </div>

              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Service Requests
              </h1>

              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                Review citizen service requests, monitor payments and assign
                confirmed requests to available officers.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-background/80 px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Requests
                </p>

                <p className="text-xl font-bold">
                  {isLoading ? "—" : totalRequests}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================
            FILTERS
        ======================================================= */}

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Search */}

            {/* Search */}
            <form
              onSubmit={handleSearchs}
              className="relative flex h-10 w-full items-center overflow-hidden rounded-xl border border-border bg-background transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15"
            >
              <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search requests..."
                aria-label="Search service requests"
                className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  title="Clear search"
                  className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                aria-label="Search service requests"
                title="Search"
                disabled={isFetching}
                className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Status */}
            <select
              value={currentStatus ?? ""}
              onChange={(event) => handleStatusChange(event.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="">All statuses</option>

              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Service */}
            <select
              value={currentServiceId ?? ""}
              onChange={(event) => handleServiceChange(event.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="">All services</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortFromUrl}
              onChange={(event) =>
                handleSortChange(event.target.value === "asc" ? "asc" : "desc")
              }
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
              <option value="desc">Newest first</option>

              <option value="asc">Oldest first</option>
            </select>
          </div>

          {/* Active Filters */}
          {(searchFromUrl ||
            currentStatus ||
            currentServiceId ||
            sortFromUrl === "asc") && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="text-xs font-medium text-muted-foreground">
                Active filters:
              </span>

              {searchFromUrl && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Search: {searchFromUrl}
                </span>
              )}

              {currentStatus && (
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
                  Status: {formatStatus(currentStatus)}
                </span>
              )}

              {currentServiceId && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  Service selected
                </span>
              )}

              {sortFromUrl === "asc" && (
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                  Oldest first
                </span>
              )}
            </div>
          )}
        </div>

        {/* ======================================================
            LOADING
        ======================================================= */}

        {isLoading && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            Loading service requests...
          </div>
        )}

        {/* ======================================================
            ERROR
        ======================================================= */}

        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-700">
              Failed to load service requests.
            </p>

            <p className="mt-1 text-sm text-red-600">Please try again.</p>
          </div>
        )}

        {/* ======================================================
            EMPTY
        ======================================================= */}

        {!isLoading && !isError && serviceRequests.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold">No Service Requests</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              No service requests match the current filters.
            </p>
          </div>
        )}

        {/* ======================================================
            TABLE
        ======================================================= */}

        {!isLoading && !isError && serviceRequests.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              {/* Desktop / Tablet Table */}
              <div className="hidden overflow-hidden rounded-xl border border-border md:block">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border bg-muted/40">
                      <tr>
                        <th className="px-4 py-4 text-left font-semibold">
                          Citizen
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Service
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Location
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Amount
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Status
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Created
                        </th>

                        <th className="px-4 py-4 text-left font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {serviceRequests.map((request) => (
                        <tr
                          key={request.id}
                          className="border-b border-border last:border-0 hover:bg-muted/20"
                        >
                          {/* Citizen */}
                          <td className="px-4 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                <UserRound className="h-4 w-4" />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-medium">
                                  {request.citizen?.name ?? "Unknown Citizen"}
                                </p>

                                <p className="max-w-[150px] truncate text-xs text-muted-foreground">
                                  {request.citizen?.email ?? "—"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Service */}
                          <td className="max-w-[220px] px-4 py-4">
                            <p className="truncate font-medium">
                              {request.service.name}
                            </p>

                            <p className="mt-1 truncate text-xs text-muted-foreground">
                              {request.service.description ?? "No description"}
                            </p>
                          </td>

                          {/* Location */}
                          <td className="max-w-[150px] px-4 py-4">
                            <p className="truncate">{request.location}</p>
                          </td>

                          {/* Amount */}
                          <td className="whitespace-nowrap px-4 py-4 font-semibold">
                            ৳{request.amount}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                request.status,
                              )}`}
                            >
                              {formatStatus(request.status)}
                            </span>
                          </td>

                          {/* Created */}
                          <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                            {formatDate(request.createdAt)}
                          </td>

                          {/* Action */}
                          <td className="px-4 py-4">
                            <Link
                              href={`/dashboard/admin-dashboard/service-requests/${request.id}`}
                              className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 md:hidden">
                {serviceRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    {/* Citizen */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                          <UserRound className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">
                            {request.citizen?.name ?? "Unknown Citizen"}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {request.citizen?.email ?? "—"}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {formatStatus(request.status)}
                      </span>
                    </div>

                    {/* Service */}
                    <div className="mt-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        Service
                      </p>

                      <p className="mt-1 font-medium">{request.service.name}</p>

                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {request.service.description ?? "No description"}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Location
                        </p>

                        <p className="mt-1 truncate text-sm">
                          {request.location}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Amount
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          ৳{request.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-muted-foreground">
                          Created
                        </p>

                        <p className="mt-1 text-sm">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-4 border-t border-border pt-4">
                      <Link
                        href={`/dashboard/admin-dashboard/service-requests/${request.id}`}
                        className="flex w-full items-center justify-center rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==================================================
                  PAGINATION
              =================================================== */}

            <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>

                {isFetching && !isLoading && (
                  <p className="mt-1 text-xs text-primary">
                    Updating results...
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1 || isFetching}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages || isFetching}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
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

export default AdminServiceRequestsPage;
