"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ChevronLeft, ChevronRight, CreditCard, Search, X } from "lucide-react";

import { useAllPayments } from "@/hooks/payment.hook";
import type { PaymentStatus } from "@/types/payment";

import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

type PaymentFilterStatus = "ALL" | PaymentStatus;

const AdminPaymentsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // =========================================================
  // URL STATE
  // =========================================================

  const searchFromUrl = searchParams.get("search") ?? "";

  const statusFromUrl = searchParams.get("status") ?? "ALL";

  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const currentStatus: PaymentFilterStatus =
    statusFromUrl === "PAID" ||
    statusFromUrl === "PENDING" ||
    statusFromUrl === "FAILED" ||
    statusFromUrl === "CANCELED"
      ? statusFromUrl
      : "ALL";

  // =========================================================
  // LOCAL SEARCH INPUT
  // =========================================================

  const [searchInput, setSearchInput] = useState(searchFromUrl);

  // =========================================================
  // API
  // =========================================================

  const { data: payments = [], isLoading, isError } = useAllPayments();

  // =========================================================
  // SYNC SEARCH INPUT WITH URL
  // =========================================================

  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  // =========================================================
  // UPDATE URL
  // =========================================================

  const updateUrl = (values: {
    search?: string;
    status?: PaymentFilterStatus;
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    // -------------------------------------------------------
    // Search
    // -------------------------------------------------------

    if (values.search !== undefined) {
      const trimmedSearch = values.search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      // Search change = page 1
      params.delete("page");
    }

    // -------------------------------------------------------
    // Status
    // -------------------------------------------------------

    if (values.status !== undefined) {
      if (values.status === "ALL") {
        params.delete("status");
      } else {
        params.set("status", values.status);
      }

      // Filter change = page 1
      params.delete("page");
    }

    // -------------------------------------------------------
    // Page
    // -------------------------------------------------------

    if (values.page !== undefined) {
      if (values.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(values.page));
      }
    }

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
    });
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const handleClearSearch = () => {
    setSearchInput("");

    updateUrl({
      search: "",
    });
  };

  // =========================================================
  // STATUS
  // =========================================================

  const handleStatusChange = (value: PaymentFilterStatus) => {
    updateUrl({
      status: value,
    });
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const handleClearFilters = () => {
    setSearchInput("");

    router.push(pathname);
  };

  // =========================================================
  // FILTER PAYMENTS
  // =========================================================

  const filteredPayments = useMemo(() => {
    const normalizedSearch = searchFromUrl.trim().toLowerCase();

    return payments.filter((payment) => {
      const citizenName = payment.citizen?.name?.toLowerCase() ?? "";

      const citizenEmail = payment.citizen?.email?.toLowerCase() ?? "";

      const serviceName =
        payment.serviceRequest?.service?.name?.toLowerCase() ?? "";

      const matchesSearch =
        !normalizedSearch ||
        citizenName.includes(normalizedSearch) ||
        citizenEmail.includes(normalizedSearch) ||
        serviceName.includes(normalizedSearch);

      const matchesStatus =
        currentStatus === "ALL" || payment.status === currentStatus;

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchFromUrl, currentStatus]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(filteredPayments.length / PAGE_LIMIT);

  const safeTotalPages = Math.max(totalPages, 1);

  const safeCurrentPage = Math.min(currentPage, safeTotalPages);

  const currentPayments = filteredPayments.slice(
    (safeCurrentPage - 1) * PAGE_LIMIT,
    safeCurrentPage * PAGE_LIMIT,
  );

  // =========================================================
  // PAGINATION HANDLERS
  // =========================================================

  const handlePreviousPage = () => {
    if (safeCurrentPage <= 1) {
      return;
    }

    updateUrl({
      page: safeCurrentPage - 1,
    });
  };

  const handleNextPage = () => {
    if (safeCurrentPage >= safeTotalPages) {
      return;
    }

    updateUrl({
      page: safeCurrentPage + 1,
    });
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date: string | null | undefined) => {
    if (!date) {
      return "—";
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================

  const getStatusStyle = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return "bg-secondary/10 text-secondary";

      case "PENDING":
        return "bg-accent/10 text-accent-foreground";

      case "FAILED":
        return "bg-destructive/10 text-destructive";

      case "CANCELED":
        return "bg-muted text-muted-foreground";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const hasActiveFilters = Boolean(searchFromUrl) || currentStatus !== "ALL";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-background">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-7">
          {/* =================================================
              HEADER
          ================================================= */}

          <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                  <CreditCard className="h-3.5 w-3.5" />
                  Payment Management
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  Payments
                </h1>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Monitor citizen payments and payment status.
                </p>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-xl border border-border bg-background/80 px-4 py-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Total Payments
                  </p>

                  <p className="text-xl font-bold text-foreground">
                    {payments.length}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              FILTERS
          ================================================= */}

          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <Search className="h-4 w-4" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Search & Filters
                  </h2>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Find payments by citizen or service
                  </p>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear all
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              {/* Search */}

              <form onSubmit={handleSearchSubmit}>
                <label
                  htmlFor="payment-search"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Search
                </label>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      id="payment-search"
                      type="text"
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Search by citizen or service..."
                      className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                    />

                    {searchInput && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </form>

              {/* Status */}

              <div>
                <label
                  htmlFor="payment-status"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Status
                </label>

                <select
                  id="payment-status"
                  value={currentStatus}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value as PaymentFilterStatus,
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                >
                  <option value="ALL">All Statuses</option>

                  <option value="PAID">Paid</option>

                  <option value="PENDING">Pending</option>

                  <option value="FAILED">Failed</option>

                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
            </div>

            {/* Active filters */}

            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchFromUrl && (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    Search: {searchFromUrl}
                  </span>
                )}

                {currentStatus !== "ALL" && (
                  <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    Status: {currentStatus}
                  </span>
                )}
              </div>
            )}
          </section>

          {/* =================================================
              LOADING
          ================================================= */}

          {isLoading && (
            <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-16 animate-pulse rounded-xl bg-muted"
                  />
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!isLoading && isError && (
            <section className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <CreditCard className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Failed to load payments
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Something went wrong while loading payment data. Please try
                again later.
              </p>
            </section>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!isLoading && !isError && payments.length === 0 && (
            <section className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <CreditCard className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-foreground">
                No payments found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no payment records available yet.
              </p>
            </section>
          )}

          {/* =================================================
              NO FILTER RESULT
          ================================================= */}

          {!isLoading &&
            !isError &&
            payments.length > 0 &&
            filteredPayments.length === 0 && (
              <section className="rounded-2xl border border-border bg-card p-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <Search className="h-6 w-6" />
                </div>

                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  No matching payments
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your search or status filter.
                </p>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 hover:shadow-md"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              </section>
            )}

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          {!isLoading && !isError && currentPayments.length > 0 && (
            <section className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-sm">
                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Citizen
                      </th>

                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Service
                      </th>

                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Amount
                      </th>

                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Currency
                      </th>

                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Status
                      </th>

                      <th className="px-6 py-4 font-semibold text-muted-foreground">
                        Paid At
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {currentPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="transition-colors hover:bg-muted/30"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">
                              {payment.citizen?.name ?? "Unknown Citizen"}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {payment.citizen?.email ?? "—"}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-foreground">
                            {payment.serviceRequest.service.name}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-medium text-foreground">
                          {payment.amount}
                        </td>

                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {payment.currency}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                              payment.status,
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {formatDate(payment.paidAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}

              <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {(safeCurrentPage - 1) * PAGE_LIMIT + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">
                    {Math.min(
                      safeCurrentPage * PAGE_LIMIT,
                      filteredPayments.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {filteredPayments.length}
                  </span>{" "}
                  payments
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={handlePreviousPage}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground">
                    {safeCurrentPage} / {safeTotalPages}
                  </div>

                  <button
                    type="button"
                    disabled={safeCurrentPage === safeTotalPages}
                    onClick={handleNextPage}
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              MOBILE / TABLET CARDS
          ================================================= */}

          {!isLoading && !isError && currentPayments.length > 0 && (
            <section className="grid gap-4 lg:hidden">
              {currentPayments.map((payment) => (
                <article
                  key={payment.id}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        {payment.citizen?.name ?? "Unknown Citizen"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {payment.citizen?.email ?? "—"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                        payment.status,
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Service</p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {payment.serviceRequest.service.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>

                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {payment.amount} {payment.currency}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Paid At</p>

                      <p className="mt-1 text-sm text-foreground">
                        {formatDate(payment.paidAt)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Payment ID
                      </p>

                      <p className="mt-1 break-all text-xs text-muted-foreground">
                        {payment.id}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )}

          {/* =================================================
              MOBILE PAGINATION
          ================================================= */}

          {!isLoading && !isError && filteredPayments.length > PAGE_LIMIT && (
            <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:hidden">
              <p className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-medium text-foreground">
                  {safeCurrentPage}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {safeTotalPages}
                </span>
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={handlePreviousPage}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <button
                  type="button"
                  disabled={safeCurrentPage === safeTotalPages}
                  onClick={handleNextPage}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminPaymentsPage;
