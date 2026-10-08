"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  WalletCards,
  XCircle,
} from "lucide-react";

import { useMyPayments } from "@/hooks/payment.hook";
import type { PaymentStatus } from "@/types/payment";

const ITEMS_PER_PAGE = 10;

const getStatusStyle = (status: PaymentStatus) => {
  switch (status) {
    case "PAID":
      return {
        className: "border-secondary/20 bg-secondary/10 text-secondary",
        icon: CheckCircle2,
        label: "Paid",
      };

    case "PENDING":
      return {
        className: "border-accent/20 bg-accent/10 text-accent-foreground",
        icon: Clock3,
        label: "Pending",
      };

    case "FAILED":
      return {
        className: "border-destructive/20 bg-destructive/10 text-destructive",
        icon: XCircle,
        label: "Failed",
      };

    case "CANCELED":
      return {
        className: "border-border bg-muted text-muted-foreground",
        icon: XCircle,
        label: "Canceled",
      };

    default:
      return {
        className: "border-border bg-muted text-muted-foreground",
        icon: Clock3,
        label: status,
      };
  }
};

const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatAmount = (amount: number | string, currency: string) => {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return `${amount} ${currency}`;
  }

  return `${numericAmount.toLocaleString("en-BD")} ${currency}`;
};

export default function CitizenPaymentsPage() {
  const { data: payments, isLoading, isError } = useMyPayments();

  const paymentList = payments ?? [];

  /*
   * ============================================================
   * PAGINATION
   * ============================================================
   */

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(paymentList.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPayments = paymentList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  /*
   * ============================================================
   * SUMMARY DATA
   * ============================================================
   */

  const totalPayments = paymentList.length;

  const paidPayments = paymentList.filter(
    (payment) => payment.status === "PAID",
  ).length;

  const pendingPayments = paymentList.filter(
    (payment) => payment.status === "PENDING",
  ).length;

  const totalSpent = paymentList
    .filter((payment) => payment.status === "PAID")
    .reduce((total, payment) => {
      const amount = Number(payment.amount);

      return Number.isNaN(amount) ? total : total + amount;
    }, 0);

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (isLoading) {
    return (
      <main className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
          {/* Header Skeleton */}
          <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative space-y-4">
              <div className="h-7 w-40 animate-pulse rounded-lg bg-muted" />

              <div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" />

              <div className="mt-5 h-16 w-full max-w-xs animate-pulse rounded-xl bg-muted" />
            </div>
          </section>

          {/* Stats Skeleton */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </div>

                <div className="mt-5 h-8 w-24 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </section>

          {/* Payment History Skeleton */}
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border p-5 sm:p-6">
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />

              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
            </div>

            <div className="space-y-4 p-5 sm:p-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * ERROR
   * ============================================================
   */

  if (isError) {
    return (
      <main className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-7">
          <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-destructive/10 blur-3xl" />

            <div className="relative mx-auto max-w-md text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <CreditCard className="h-6 w-6" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-foreground">
                Unable to load payments
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Something went wrong while loading your payment history. Please
                try again later.
              </p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
        {/* =========================================================
            HERO / PAGE HEADER
        ========================================================= */}

        <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-8">
            {/* Heading */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                <WalletCards className="h-3.5 w-3.5" />
                Payment Center
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Payments
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                View your payment history, transaction status, and service
                payment details in one place.
              </p>
            </div>

            {/* Total Transactions */}
            <div className="flex w-full items-center gap-4 rounded-2xl border border-border bg-background/80 p-4 shadow-sm backdrop-blur-sm sm:w-fit sm:min-w-[230px]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Total Transactions
                </p>

                <p className="mt-1 text-2xl font-bold text-foreground">
                  {totalPayments}
                </p>
              </div>

              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* =========================================================
            SUMMARY CARDS
        ========================================================= */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Payments */}
          <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ReceiptText className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                All
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Payments
              </p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                {totalPayments}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                All transactions
              </p>
            </div>
          </div>

          {/* Paid */}
          <div className="group rounded-2xl border border-secondary/15 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-medium text-secondary">
                Successful
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-muted-foreground">Paid</p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-secondary">
                {paidPayments}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Completed payments
              </p>
            </div>
          </div>

          {/* Pending */}
          <div className="group rounded-2xl border border-accent/15 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-foreground">
                <Clock3 className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                Processing
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-muted-foreground">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold tracking-tight text-accent-foreground">
                {pendingPayments}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground">
                <CircleDollarSign className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                Paid only
              </span>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Spent
              </p>

              <p className="mt-1 truncate text-2xl font-bold tracking-tight text-foreground">
                {totalSpent.toLocaleString("en-BD")} BDT
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Successfully paid
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}

        {paymentList.length === 0 ? (
          <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative mx-auto max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ReceiptText className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-foreground">
                No payments yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your payment history will appear here after you make a payment
                for a service request.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure Stripe payments
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* =====================================================
                PAYMENT HISTORY
            ===================================================== */}

            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              {/* Payment History Header */}
              <div className="border-b border-border bg-gradient-to-r from-primary/5 via-card to-secondary/5 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ReceiptText className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-bold text-foreground">
                        Payment History
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Your recent service payment transactions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
                    Secure & Protected
                  </div>
                </div>
              </div>

              {/* =================================================
                  DESKTOP TABLE
              ================================================= */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Method
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Payment Date
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {currentPayments.map((payment) => {
                      const status = getStatusStyle(payment.status);
                      const StatusIcon = status.icon;

                      return (
                        <tr
                          key={payment.id}
                          className="group transition-colors hover:bg-muted/20"
                        >
                          {/* Service */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3.5">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
                                <ReceiptText className="h-5 w-5" />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">
                                  {payment.serviceRequest.service.name}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5">
                                  <CreditCard className="h-3 w-3 text-muted-foreground" />

                                  <p className="text-xs text-muted-foreground">
                                    Stripe payment
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-5">
                            <p className="text-sm font-bold text-foreground">
                              {formatAmount(payment.amount, payment.currency)}
                            </p>
                          </td>

                          {/* Method */}
                          <td className="px-6 py-5">
                            <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-2.5 py-1.5">
                              <CreditCard className="h-3.5 w-3.5 text-primary" />

                              <span className="text-xs font-medium text-foreground">
                                Stripe
                              </span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />

                              <span className="text-sm text-foreground">
                                {formatDate(
                                  payment.paidAt || payment.initiatedAt,
                                )}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                            >
                              <StatusIcon className="h-3.5 w-3.5" />

                              {status.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE PAYMENT CARDS
              ================================================= */}

              <div className="divide-y divide-border md:hidden">
                {currentPayments.map((payment) => {
                  const status = getStatusStyle(payment.status);
                  const StatusIcon = status.icon;

                  return (
                    <article
                      key={payment.id}
                      className="p-5 transition-colors hover:bg-muted/20"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ReceiptText className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-foreground">
                              {payment.serviceRequest.service.name}
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Stripe payment
                            </p>
                          </div>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                        >
                          <StatusIcon className="h-3 w-3" />

                          {status.label}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        {/* Amount */}
                        <div className="rounded-xl border border-border bg-muted/20 p-3">
                          <p className="text-[11px] font-medium text-muted-foreground">
                            Amount
                          </p>

                          <p className="mt-1 text-sm font-bold text-foreground">
                            {formatAmount(payment.amount, payment.currency)}
                          </p>
                        </div>

                        {/* Method */}
                        <div className="rounded-xl border border-border bg-muted/20 p-3">
                          <p className="text-[11px] font-medium text-muted-foreground">
                            Method
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">
                            <CreditCard className="h-3.5 w-3.5 text-primary" />

                            <p className="text-sm font-semibold text-foreground">
                              Stripe
                            </p>
                          </div>
                        </div>

                        {/* Payment Date */}
                        <div className="col-span-2 rounded-xl border border-border bg-muted/20 p-3">
                          <p className="text-[11px] font-medium text-muted-foreground">
                            Payment Date
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />

                            <p className="text-sm font-medium text-foreground">
                              {formatDate(
                                payment.paidAt || payment.initiatedAt,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* =================================================
                  PAGINATION
              ================================================= */}

              {totalPages > 1 && (
                <div className="border-t border-border bg-muted/10 px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Result Information */}
                    <p className="text-xs text-muted-foreground">
                      Showing{" "}
                      <span className="font-semibold text-foreground">
                        {startIndex + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-foreground">
                        {Math.min(
                          startIndex + ITEMS_PER_PAGE,
                          paymentList.length,
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-foreground">
                        {paymentList.length}
                      </span>{" "}
                      payments
                    </p>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-1">
                      {/* Previous */}
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((previousPage) =>
                            Math.max(previousPage - 1, 1),
                          )
                        }
                        disabled={currentPage === 1}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const pageNumber = index + 1;

                          return (
                            <button
                              key={pageNumber}
                              type="button"
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-semibold transition-colors ${
                                currentPage === pageNumber
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                              }`}
                              aria-label={`Go to page ${pageNumber}`}
                              aria-current={
                                currentPage === pageNumber ? "page" : undefined
                              }
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next */}
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((previousPage) =>
                            Math.min(previousPage + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  BOTTOM SECURITY BAR
              ================================================= */}

              <div className="border-t border-border bg-muted/20 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-secondary" />

                    <span>Payments are securely processed through Stripe.</span>
                  </div>

                  <span className="text-xs font-medium text-muted-foreground">
                    {totalPayments} transaction
                    {totalPayments !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
