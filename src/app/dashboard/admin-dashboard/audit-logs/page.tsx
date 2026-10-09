"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";

import { useAuditLogs } from "@/hooks/audit-log.hook";
import type { AuditLog } from "@/types/audit-log";
import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

const ACTION_OPTIONS = [
  "ALL",
  "CREATE_COMPLAINT",
  "UPDATE_COMPLAINT",
  "ASSIGN_COMPLAINT",
  "UPDATE_COMPLAINT_STATUS",
  "CANCEL_COMPLAINT",
  "DELETE_COMPLAINT",
  "CREATE_SERVICE_REQUEST",
  "REVIEW_SERVICE_REQUEST",
  "ASSIGN_SERVICE_REQUEST",
  "UPDATE_SERVICE_REQUEST_STATUS",
  "DELETE_SERVICE_REQUEST",
  "CREATE_PAYMENT",
  "PAYMENT_COMPLETED",
  "CREATE_CATEGORY",
  "UPDATE_CATEGORY",
  "UPDATE_CATEGORY_STATUS",
  "UPDATE_USER_STATUS",
  "UPDATE_USER_ROLE",
  "UPDATE_PROFILE",
] as const;

const ENTITY_OPTIONS = [
  "ALL",
  "Complaint",
  "ServiceRequest",
  "Payment",
  "Category",
  "User",
  "Service",
] as const;

const getPositiveInteger = (value: string | null, fallback = 1) => {
  if (!value || !/^\d+$/.test(value)) return fallback;

  const number = Number(value);

  return Number.isSafeInteger(number) && number > 0 ? number : fallback;
};

const AuditLogsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const page = getPositiveInteger(searchParams.get("page"));
  const search = searchParams.get("search")?.trim() ?? "";
  const requestedAction = searchParams.get("action") ?? "ALL";
  const requestedEntity = searchParams.get("entity") ?? "ALL";
  const requestedSort = searchParams.get("sortOrder");

  const action = ACTION_OPTIONS.includes(
    requestedAction as (typeof ACTION_OPTIONS)[number],
  )
    ? requestedAction
    : "ALL";

  const entity = ENTITY_OPTIONS.includes(
    requestedEntity as (typeof ENTITY_OPTIONS)[number],
  )
    ? requestedEntity
    : "ALL";

  const sortOrder: "asc" | "desc" = requestedSort === "asc" ? "asc" : "desc";

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // URL update helper
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(queryString);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    if (nextUrl !== `${pathname}${queryString ? `?${queryString}` : ""}`) {
      router.replace(nextUrl, { scroll: false });
    }
  };

  // অপ্রয়োজনীয় বা invalid query parameters পরিষ্কার করা।
  useEffect(() => {
    const params = new URLSearchParams(queryString);
    let changed = false;

    const rawPage = params.get("page");

    if (rawPage !== null) {
      const validPage = getPositiveInteger(rawPage);

      if (String(validPage) !== rawPage) {
        if (validPage === 1) {
          params.delete("page");
        } else {
          params.set("page", String(validPage));
        }

        changed = true;
      }
    }

    if (
      params.has("action") &&
      !ACTION_OPTIONS.includes(
        params.get("action") as (typeof ACTION_OPTIONS)[number],
      )
    ) {
      params.delete("action");
      changed = true;
    }

    if (
      params.has("entity") &&
      !ENTITY_OPTIONS.includes(
        params.get("entity") as (typeof ENTITY_OPTIONS)[number],
      )
    ) {
      params.delete("entity");
      changed = true;
    }

    if (
      params.has("sortOrder") &&
      params.get("sortOrder") !== "asc" &&
      params.get("sortOrder") !== "desc"
    ) {
      params.delete("sortOrder");
      changed = true;
    }

    if (params.has("search") && !params.get("search")?.trim()) {
      params.delete("search");
      changed = true;
    }

    if (changed) {
      const nextQuery = params.toString();

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }
  }, [pathname, queryString, router]);

  const { data, isLoading, isError } = useAuditLogs({
    page,
    limit: PAGE_LIMIT,
    search: search || undefined,
    action: action === "ALL" ? undefined : action,
    entity: entity === "ALL" ? undefined : entity,
    sortOrder,
  });

  const auditLogs = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  useEffect(() => {
    if (!isLoading && page > totalPages) {
      const params = new URLSearchParams(queryString);

      if (totalPages > 1) {
        params.set("page", String(totalPages));
      } else {
        params.delete("page");
      }

      const nextQuery = params.toString();
      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      router.replace(nextUrl, { scroll: false });
    }
  }, [isLoading, page, totalPages, queryString, pathname, router]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) return [1, 2, 3, 4, 5];

    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  const handleSearch = () => {
    updateUrl({
      search: searchInput.trim() || null,
      page: null,
    });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    updateUrl({ search: null, page: null });
  };

  const handleActionChange = (value: string) => {
    updateUrl({
      action: value === "ALL" ? null : value,
      page: null,
    });
  };

  const handleEntityChange = (value: string) => {
    updateUrl({
      entity: value === "ALL" ? null : value,
      page: null,
    });
  };

  const handleSortChange = (value: "asc" | "desc") => {
    updateUrl({
      sortOrder: value === "desc" ? null : value,
      page: null,
    });
  };

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));

    updateUrl({
      page: safePage === 1 ? null : String(safePage),
    });
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatAction = (value: string) => {
    return value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatEntity = (value: string) => {
    return value.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const getActionStyle = (actionValue: string) => {
    if (
      actionValue.startsWith("CREATE") ||
      actionValue === "PAYMENT_COMPLETED"
    ) {
      return "bg-emerald-100 text-emerald-700";
    }

    if (
      actionValue.startsWith("UPDATE") ||
      actionValue.startsWith("ASSIGN") ||
      actionValue.startsWith("REVIEW")
    ) {
      return "bg-blue-100 text-blue-700";
    }

    if (actionValue.startsWith("DELETE") || actionValue.startsWith("CANCEL")) {
      return "bg-red-100 text-red-700";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <section>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Activity className="h-3.5 w-3.5" />
              System Activity
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Audit Logs
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Track important actions performed across the CityCare platform.
            </p>
          </section>

          {/* Filters */}
          <section className="rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Filters</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_1fr_1fr_180px]">
              {/* Search */}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSearch();
                }}
              >
                <label
                  htmlFor="audit-log-search"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Search
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="audit-log-search"
                      type="text"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Search user, email, action..."
                      className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                    {searchInput && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </form>

              {/* Action */}
              <div>
                <label
                  htmlFor="audit-action"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Action
                </label>

                <select
                  id="audit-action"
                  value={action}
                  onChange={(event) => handleActionChange(event.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {ACTION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option === "ALL" ? "All Actions" : formatAction(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entity */}
              <div>
                <label
                  htmlFor="audit-entity"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Entity
                </label>

                <select
                  id="audit-entity"
                  value={entity}
                  onChange={(event) => handleEntityChange(event.target.value)}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {ENTITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option === "ALL" ? "All Entities" : formatEntity(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label
                  htmlFor="audit-sort"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Sort by Date
                </label>

                <select
                  id="audit-sort"
                  value={sortOrder}
                  onChange={(event) =>
                    handleSortChange(event.target.value as "asc" | "desc")
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </section>

          {/* Audit Logs */}
          <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">Activity History</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {pagination?.total ?? 0} total log
                  {pagination?.total === 1 ? "" : "s"}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </div>
            </div>

            {isLoading && (
              <div className="divide-y divide-border">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="animate-pulse px-5 py-5">
                    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr_1.4fr]">
                      <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-muted" />
                        <div className="h-3 w-44 rounded bg-muted" />
                      </div>
                      <div className="h-6 w-28 rounded-full bg-muted" />
                      <div className="h-6 w-24 rounded-full bg-muted" />
                      <div className="h-4 w-40 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && isError && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Activity className="h-5 w-5" />
                </div>

                <h3 className="mt-4 font-semibold">
                  Failed to load audit logs
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Something went wrong while loading system activity.
                </p>
              </div>
            )}

            {!isLoading && !isError && auditLogs.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Activity className="h-5 w-5" />
                </div>

                <h3 className="mt-4 font-semibold">No audit logs found</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filter options.
                </p>
              </div>
            )}

            {!isLoading && !isError && auditLogs.length > 0 && (
              <>
                {/* Desktop table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30 text-left">
                        <th className="px-5 py-3 font-semibold">User</th>
                        <th className="px-5 py-3 font-semibold">Action</th>
                        <th className="px-5 py-3 font-semibold">Entity</th>
                        <th className="px-5 py-3 font-semibold">Entity ID</th>
                        <th className="px-5 py-3 font-semibold">Date</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {auditLogs.map((log: AuditLog) => (
                        <tr
                          key={log.id}
                          className="transition-colors hover:bg-muted/20"
                        >
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-medium">
                                {log.user?.name || "Unknown User"}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {log.user?.email || "—"}
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getActionStyle(log.action)}`}
                            >
                              {formatAction(log.action)}
                            </span>
                          </td>

                          <td className="px-5 py-4">
                            <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                              {formatEntity(log.entity)}
                            </span>
                          </td>

                          <td className="max-w-[220px] px-5 py-4">
                            <span className="block truncate font-mono text-xs text-muted-foreground">
                              {log.entityId || "—"}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-xs text-muted-foreground">
                            {formatDate(log.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="divide-y divide-border lg:hidden">
                  {auditLogs.map((log: AuditLog) => (
                    <div key={log.id} className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium">
                            {log.user?.name || "Unknown User"}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {log.user?.email || "—"}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getActionStyle(log.action)}`}
                        >
                          {formatAction(log.action)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Entity
                          </p>
                          <p className="mt-1 font-medium">
                            {formatEntity(log.entity)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="mt-1 text-xs">
                            {formatDate(log.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Entity ID
                        </p>
                        <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
                          {log.entityId || "—"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {!isLoading &&
              !isError &&
              auditLogs.length > 0 &&
              totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Showing {(page - 1) * PAGE_LIMIT + 1}–
                    {Math.min(page * PAGE_LIMIT, pagination?.total ?? 0)} of{" "}
                    {pagination?.total ?? 0}
                  </p>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() => handlePageChange(page - 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        aria-current={pageNumber === page ? "page" : undefined}
                        aria-label={`Go to page ${pageNumber}`}
                        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm transition ${
                          pageNumber === page
                            ? "bg-primary font-semibold text-primary-foreground"
                            : "border border-border hover:bg-muted"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={page >= totalPages}
                      onClick={() => handlePageChange(page + 1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-sm transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
          </section>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AuditLogsPage;
