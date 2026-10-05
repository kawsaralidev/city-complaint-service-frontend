"use client";

import { useMemo, useState } from "react";
import { CreditCard, Search } from "lucide-react";

import { useAllPayments } from "@/hooks/payment.hook";
import type { Payment, PaymentStatus } from "@/types/payment";

import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

const AdminPaymentsPage = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | PaymentStatus>("ALL");
  const [page, setPage] = useState(1);

  const { data: payments = [], isLoading, isError } = useAllPayments();

  /*
   * Payment summary
   */
  const paymentSummary = useMemo(() => {
    const totalCollected = payments
      .filter((payment) => payment.status === "PAID")
      .reduce((total, payment) => total + Number(payment.amount), 0);

    const pendingAmount = payments
      .filter((payment) => payment.status === "PENDING")
      .reduce((total, payment) => total + Number(payment.amount), 0);

    const failedAndCanceledAmount = payments
      .filter(
        (payment) =>
          payment.status === "FAILED" || payment.status === "CANCELED",
      )
      .reduce((total, payment) => total + Number(payment.amount), 0);

    return {
      totalPayments: payments.length,
      totalCollected,
      pendingAmount,
      failedAndCanceledAmount,
    };
  }, [payments]);

  /*
   * Search and status filtering
   */
  const filteredPayments = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const citizenName = payment.citizen?.name?.toLowerCase() ?? "";

      const citizenEmail = payment.citizen?.email?.toLowerCase() ?? "";

      const serviceName = payment.serviceRequest.service.name.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        citizenName.includes(normalizedSearch) ||
        citizenEmail.includes(normalizedSearch) ||
        serviceName.includes(normalizedSearch);

      const matchesStatus = status === "ALL" || payment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, status]);

  /*
   * Pagination
   */
  const totalPages = Math.ceil(filteredPayments.length / PAGE_LIMIT);

  const currentPage = Math.min(page, Math.max(totalPages, 1));

  const currentPayments = filteredPayments.slice(
    (currentPage - 1) * PAGE_LIMIT,
    currentPage * PAGE_LIMIT,
  );

  /*
   * Search change
   */
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  /*
   * Status change
   */
  const handleStatusChange = (value: "ALL" | PaymentStatus) => {
    setStatus(value);
    setPage(1);
  };

  /*
   * Format date
   */
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

  /*
   * Payment status style
   */
  const getStatusStyle = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "CANCELED":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* ==================== HEADER ==================== */}
          <section>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <CreditCard className="h-3.5 w-3.5" />
              Payment Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Payments
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Monitor citizen payments and payment status.
            </p>
          </section>

          {/* ==================== PAYMENT SUMMARY ==================== */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Payments */}
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Payments</p>

              <p className="mt-2 text-2xl font-bold">
                {paymentSummary.totalPayments}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                All payment records
              </p>
            </div>

            {/* Total Collected */}
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Collected</p>

              <p className="mt-2 text-2xl font-bold">
                ৳{paymentSummary.totalCollected.toLocaleString("en-BD")}
              </p>

              <p className="mt-1 text-xs text-green-600">Successfully paid</p>
            </div>

            {/* Pending Amount */}
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Pending Amount</p>

              <p className="mt-2 text-2xl font-bold">
                ৳{paymentSummary.pendingAmount.toLocaleString("en-BD")}
              </p>

              <p className="mt-1 text-xs text-yellow-600">Awaiting payment</p>
            </div>

            {/* Failed / Canceled */}
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">Failed / Canceled</p>

              <p className="mt-2 text-2xl font-bold">
                ৳
                {paymentSummary.failedAndCanceledAmount.toLocaleString("en-BD")}
              </p>

              <p className="mt-1 text-xs text-red-600">Unsuccessful payments</p>
            </div>
          </section>

          {/* ==================== FILTERS ==================== */}
          <section className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              {/* Search */}
              <div>
                <label
                  htmlFor="payment-search"
                  className="mb-2 block text-sm font-medium"
                >
                  Search
                </label>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="payment-search"
                    type="text"
                    value={search}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder="Search by citizen or service..."
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="payment-status"
                  className="mb-2 block text-sm font-medium"
                >
                  Status
                </label>

                <select
                  id="payment-status"
                  value={status}
                  onChange={(event) =>
                    handleStatusChange(
                      event.target.value as "ALL" | PaymentStatus,
                    )
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                >
                  <option value="ALL">All Statuses</option>

                  <option value="PAID">Paid</option>

                  <option value="PENDING">Pending</option>

                  <option value="FAILED">Failed</option>

                  <option value="CANCELED">Canceled</option>
                </select>
              </div>
            </div>
          </section>

          {/* ==================== LOADING ==================== */}
          {isLoading && (
            <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-16 animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            </section>
          )}

          {/* ==================== ERROR ==================== */}
          {!isLoading && isError && (
            <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-lg font-semibold text-red-700">
                Failed to load payments
              </h2>

              <p className="mt-2 text-sm text-red-600">
                Something went wrong while loading payment data. Please try
                again later.
              </p>
            </section>
          )}

          {/* ==================== NO PAYMENTS ==================== */}
          {!isLoading && !isError && payments.length === 0 && (
            <section className="rounded-2xl border border-border bg-background p-12 text-center shadow-sm">
              <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />

              <h2 className="mt-4 text-lg font-semibold">No payments found</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no payment records available yet.
              </p>
            </section>
          )}

          {/* ==================== NO FILTER RESULT ==================== */}
          {!isLoading &&
            !isError &&
            payments.length > 0 &&
            filteredPayments.length === 0 && (
              <section className="rounded-2xl border border-border bg-background p-12 text-center shadow-sm">
                <Search className="mx-auto h-10 w-10 text-muted-foreground" />

                <h2 className="mt-4 text-lg font-semibold">
                  No matching payments
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your search or status filter.
                </p>
              </section>
            )}

          {/* ==================== DESKTOP TABLE ==================== */}
          {!isLoading && !isError && currentPayments.length > 0 && (
            <section className="hidden overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px]">
                  <thead>
                    <tr className="border-b bg-muted/30 text-left text-sm">
                      <th className="px-6 py-4 font-semibold">Citizen</th>

                      <th className="px-6 py-4 font-semibold">Service</th>

                      <th className="px-6 py-4 font-semibold">Amount</th>

                      <th className="px-6 py-4 font-semibold">Currency</th>

                      <th className="px-6 py-4 font-semibold">Status</th>

                      <th className="px-6 py-4 font-semibold">Paid At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentPayments.map((payment) => (
                      <tr key={payment.id} className="border-b last:border-b-0">
                        {/* Citizen */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">
                              {payment.citizen?.name ?? "Unknown Citizen"}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {payment.citizen?.email ?? "—"}
                            </p>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium">
                            {payment.serviceRequest.service.name}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4 font-medium">
                          {payment.amount}
                        </td>

                        {/* Currency */}
                        <td className="px-6 py-4 text-sm">
                          {payment.currency}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                              payment.status,
                            )}`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        {/* Paid At */}
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {formatDate(payment.paidAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ==================== MOBILE / TABLET ==================== */}
          {!isLoading && !isError && currentPayments.length > 0 && (
            <section className="grid gap-4 lg:hidden">
              {currentPayments.map((payment) => (
                <article
                  key={payment.id}
                  className="rounded-2xl border border-border bg-background p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">
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
                    {/* Service */}
                    <div>
                      <p className="text-xs text-muted-foreground">Service</p>

                      <p className="mt-1 text-sm font-medium">
                        {payment.serviceRequest.service.name}
                      </p>
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>

                      <p className="mt-1 text-sm font-semibold">
                        {payment.amount} {payment.currency}
                      </p>
                    </div>

                    {/* Paid At */}
                    <div>
                      <p className="text-xs text-muted-foreground">Paid At</p>

                      <p className="mt-1 text-sm">
                        {formatDate(payment.paidAt)}
                      </p>
                    </div>

                    {/* Payment ID */}
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

          {/* ==================== PAGINATION ==================== */}
          {!isLoading && !isError && filteredPayments.length > PAGE_LIMIT && (
            <section className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(currentPage - 1) * PAGE_LIMIT + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(currentPage * PAGE_LIMIT, filteredPayments.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filteredPayments.length}
                </span>{" "}
                payments
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center rounded-lg border px-4 py-2 text-sm font-medium">
                  {currentPage} / {totalPages}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
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
