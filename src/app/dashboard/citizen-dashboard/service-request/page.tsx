"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ClipboardList,
  CreditCard,
  MapPin,
  ReceiptText,
  Sparkles,
  WalletCards,
  XCircle,
} from "lucide-react";

import RoleGuard from "../../guard/role-guard";
import { useMyServiceRequests } from "@/hooks/service-request.hook";
import { useCreatePayment } from "@/hooks/payment.hook";

const ITEMS_PER_PAGE = 10;

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        className: "border-accent/20 bg-accent/10 text-accent-foreground",
        icon: Clock3,
      };

    case "APPROVED":
      return {
        className: "border-primary/20 bg-primary/10 text-primary",
        icon: CheckCircle2,
      };

    case "PAYMENT_PENDING":
      return {
        className: "border-accent/20 bg-accent/10 text-accent-foreground",
        icon: CreditCard,
      };

    case "CONFIRMED":
      return {
        className: "border-secondary/20 bg-secondary/10 text-secondary",
        icon: CheckCircle2,
      };

    case "ASSIGNED":
      return {
        className: "border-primary/20 bg-primary/10 text-primary",
        icon: ClipboardList,
      };

    case "IN_PROGRESS":
      return {
        className: "border-primary/20 bg-primary/10 text-primary",
        icon: Clock3,
      };

    case "COMPLETED":
      return {
        className: "border-secondary/20 bg-secondary/10 text-secondary",
        icon: CheckCircle2,
      };

    case "REJECTED":
      return {
        className: "border-destructive/20 bg-destructive/10 text-destructive",
        icon: XCircle,
      };

    case "CANCELED":
      return {
        className: "border-border bg-muted text-muted-foreground",
        icon: XCircle,
      };

    default:
      return {
        className: "border-border bg-muted text-muted-foreground",
        icon: Clock3,
      };
  }
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CitizenServiceRequestsPage = () => {
  const { data: serviceRequests, isLoading, isError } = useMyServiceRequests();

  const paymentMutation = useCreatePayment();

  const [currentPage, setCurrentPage] = useState(1);

  const requestList = serviceRequests ?? [];

  /*
   * ============================================================
   * PAGINATION
   * ============================================================
   */

  const totalRequests = requestList.length;

  const totalPages = Math.ceil(totalRequests / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentRequests = requestList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  /*
   * ============================================================
   * SUMMARY DATA
   * ============================================================
   */

  const pendingRequests = requestList.filter(
    (request) =>
      request.status === "PENDING" || request.status === "PAYMENT_PENDING",
  ).length;

  const completedRequests = requestList.filter(
    (request) => request.status === "COMPLETED",
  ).length;

  const paidRequests = requestList.filter(
    (request) =>
      request.payment?.status === "PAID" ||
      request.status === "CONFIRMED" ||
      request.status === "ASSIGNED" ||
      request.status === "IN_PROGRESS" ||
      request.status === "COMPLETED",
  ).length;

  /*
   * ============================================================
   * PAYMENT
   * ============================================================
   */

  const handlePayment = (serviceRequestId: string) => {
    paymentMutation.mutate(
      {
        serviceRequestId,
      },
      {
        onSuccess: (data) => {
          window.location.href = data.checkoutUrl;
        },
      },
    );
  };

  /*
   * ============================================================
   * PAYMENT ACTION
   * ============================================================
   */

  const getPaymentAction = (
    request: NonNullable<typeof serviceRequests>[number],
  ) => {
    const paymentStatus = request.payment?.status;

    /*
     * Payment already completed
     */
    if (
      paymentStatus === "PAID" ||
      request.status === "CONFIRMED" ||
      request.status === "COMPLETED"
    ) {
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1.5 text-xs font-semibold text-secondary">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Completed
        </div>
      );
    }

    /*
     * Admin has approved the request
     * OR user previously opened Stripe checkout
     * but did not complete payment.
     */
    if (request.status === "APPROVED" || request.status === "PAYMENT_PENDING") {
      const isCurrentPayment =
        paymentMutation.isPending &&
        paymentMutation.variables?.serviceRequestId === request.id;

      return (
        <button
          type="button"
          onClick={() => handlePayment(request.id)}
          disabled={paymentMutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCurrentPayment ? "Processing..." : "Pay Now"}

          {!isCurrentPayment && <ArrowRight className="h-4 w-4" />}
        </button>
      );
    }

    /*
     * Request is still waiting for admin approval
     */
    if (request.status === "PENDING") {
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          Pending
        </div>
      );
    }

    /*
     * Rejected / canceled / other states
     */
    return <span className="text-sm font-medium text-muted-foreground">—</span>;
  };

  /*
   * ============================================================
   * LOADING STATE
   * ============================================================
   */

  if (isLoading) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <main className="min-h-full bg-muted/20">
          <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
            {/* Hero Skeleton */}
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <div className="h-7 w-48 animate-pulse rounded-lg bg-muted" />

                  <div className="h-9 w-72 animate-pulse rounded-lg bg-muted" />

                  <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
                </div>

                <div className="h-11 w-40 animate-pulse rounded-xl bg-muted" />
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
                    <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />

                    <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  </div>

                  <div className="mt-5 h-8 w-20 animate-pulse rounded bg-muted" />

                  <div className="mt-2 h-3 w-28 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </section>

            {/* Table Skeleton */}
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
      </RoleGuard>
    );
  }

  /*
   * ============================================================
   * ERROR STATE
   * ============================================================
   */

  if (isError) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <main className="min-h-full bg-muted/20">
          <div className="mx-auto w-full max-w-[1500px] p-4 sm:p-6 lg:p-7">
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm sm:p-12">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-destructive/10 blur-3xl" />

              <div className="relative mx-auto max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                  <ClipboardList className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-foreground">
                  Failed to load service requests
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Something went wrong while loading your service requests.
                  Please try again.
                </p>
              </div>
            </section>
          </div>
        </main>
      </RoleGuard>
    );
  }

  /*
   * ============================================================
   * EMPTY STATE
   * ============================================================
   */

  if (requestList.length === 0) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <main className="min-h-full bg-muted/20">
          <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
            {/* Header */}
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex flex-col gap-5 p-6 sm:p-7 lg:p-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                    <ClipboardList className="h-3.5 w-3.5" />
                    Service Requests
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    My Service Requests
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    View your requested services, track their progress, and
                    complete payments when your request is approved.
                  </p>
                </div>

                <Link
                  href="/dashboard/citizen-dashboard/services"
                  className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  Browse Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Empty */}
            <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 shadow-sm sm:p-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

              <div className="relative mx-auto max-w-md text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ReceiptText className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-foreground">
                  No Service Requests Yet
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  You have not submitted any service requests yet. Browse
                  available city services and submit your first request.
                </p>

                <Link
                  href="/dashboard/citizen-dashboard/services"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                >
                  Browse Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </div>
        </main>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="CITIZEN">
      <main className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
          {/* =====================================================
              HERO / PAGE HEADER
          ===================================================== */}

          <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-8">
              {/* Heading */}
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <ClipboardList className="h-3.5 w-3.5" />
                  Service Request Center
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  My Service Requests
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  View your requested services, track their progress, and
                  complete payments when your request is approved.
                </p>
              </div>

              {/* Browse Services */}
              <Link
                href="/dashboard/citizen-dashboard/services"
                className="group inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background/80 px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
              >
                Browse Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>

          {/* =====================================================
              SUMMARY CARDS
          ===================================================== */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Requests */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <ClipboardList className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  All
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Requests
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  {totalRequests}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Submitted service requests
                </p>
              </div>
            </div>

            {/* Pending */}
            <div className="group rounded-2xl border border-accent/15 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-foreground transition-transform duration-300 group-hover:scale-105">
                  <Clock3 className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent-foreground">
                  Waiting
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-accent-foreground">
                  {pendingRequests}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Approval or payment pending
                </p>
              </div>
            </div>

            {/* Completed */}
            <div className="group rounded-2xl border border-secondary/15 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-105">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-medium text-secondary">
                  Completed
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-secondary">
                  {completedRequests}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Successfully completed
                </p>
              </div>
            </div>

            {/* Paid */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground transition-transform duration-300 group-hover:scale-105">
                  <WalletCards className="h-5 w-5" />
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                  Payment
                </span>
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Paid Requests
                </p>

                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  {paidRequests}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Payment completed
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              REQUEST TABLE
          ===================================================== */}

          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Table Header */}
            <div className="border-b border-border bg-gradient-to-r from-primary/5 via-card to-secondary/5 px-5 py-5 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ReceiptText className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-bold text-foreground">Your Requests</h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Track your submitted city service requests
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  {totalRequests} total request
                  {totalRequests !== 1 ? "s" : ""}
                </div>
              </div>
            </div>

            {/* =================================================
                DESKTOP TABLE
            ================================================= */}

            {/* =================================================
    DESKTOP TABLE
================================================= */}

            <div className="hidden overflow-hidden md:block">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[13%]" />
                  <col className="w-[10%]" />
                  <col className="w-[13%]" />
                  <col className="w-[14%]" />
                  <col className="w-[15%]" />
                  <col className="w-[10%]" />
                </colgroup>

                <thead>
                  <tr className="border-b border-border bg-muted/30 text-left">
                    <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-5">
                      Service
                    </th>

                    <th className="px-3 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Location
                    </th>

                    <th className="px-3 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Amount
                    </th>

                    <th className="px-3 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Submitted
                    </th>

                    <th className="px-3 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Status
                    </th>

                    <th className="px-3 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Payment
                    </th>

                    <th className="px-3 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:px-4">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {currentRequests.map((request) => {
                    const statusStyle = getStatusStyle(request.status);

                    const StatusIcon = statusStyle.icon;

                    return (
                      <tr
                        key={request.id}
                        className="group transition-colors hover:bg-muted/20"
                      >
                        {/* =================================================
                SERVICE
            ================================================= */}

                        <td className="px-4 py-5 lg:px-5">
                          <div className="flex min-w-0 items-center gap-2.5 lg:gap-3">
                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-colors group-hover:bg-primary/10 lg:h-11 lg:w-11">
                              <ReceiptText className="h-4.5 w-4.5 lg:h-5 lg:w-5" />
                            </div>

                            {/* Service Name */}
                            <div className="min-w-0 flex-1">
                              <p className="break-words text-sm font-semibold leading-5 text-foreground">
                                {request.service.name}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                Service Request
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* =================================================
                LOCATION
            ================================================= */}

                        <td className="px-3 py-5 lg:px-4">
                          <div className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0 text-secondary" />

                            <span className="min-w-0 break-words">
                              {request.location}
                            </span>
                          </div>
                        </td>

                        {/* =================================================
                AMOUNT
            ================================================= */}

                        <td className="px-3 py-5 lg:px-4">
                          <div className="flex items-center gap-1">
                            <CircleDollarSign className="h-4 w-4 shrink-0 text-primary" />

                            <span className="whitespace-nowrap text-sm font-bold text-foreground">
                              ৳{request.amount}
                            </span>
                          </div>
                        </td>

                        {/* =================================================
                SUBMITTED
            ================================================= */}

                        <td className="px-3 py-5 lg:px-4">
                          <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />

                            <span className="leading-5">
                              {formatDate(request.createdAt)}
                            </span>
                          </div>
                        </td>

                        {/* =================================================
                STATUS
            ================================================= */}

                        <td className="px-3 py-5 lg:px-4">
                          <span
                            className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${statusStyle.className}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5 shrink-0" />

                            <span className="break-words">
                              {formatStatus(request.status)}
                            </span>
                          </span>
                        </td>

                        {/* =================================================
                PAYMENT
            ================================================= */}

                        <td className="px-3 py-5 lg:px-4">
                          <div className="max-w-full">
                            {getPaymentAction(request)}
                          </div>
                        </td>

                        {/* =================================================
                DETAILS
            ================================================= */}

                        <td className="px-3 py-5 text-right lg:px-4">
                          <Link
                            href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                            className="group/view inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                          >
                            View
                            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover/view:translate-x-0.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE CARDS
            ================================================= */}

            <div className="divide-y divide-border md:hidden">
              {currentRequests.map((request) => {
                const statusStyle = getStatusStyle(request.status);

                const StatusIcon = statusStyle.icon;

                return (
                  <article
                    key={request.id}
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
                            {request.service.name}
                          </h3>

                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {request.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyle.className}`}
                      >
                        <StatusIcon className="h-3 w-3" />

                        {formatStatus(request.status)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      {/* Location */}
                      <div className="rounded-xl border border-border bg-muted/20 p-3">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Location
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" />

                          <p className="truncate text-sm font-medium text-foreground">
                            {request.location}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="rounded-xl border border-border bg-muted/20 p-3">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Amount
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <CircleDollarSign className="h-3.5 w-3.5 text-primary" />

                          <p className="text-sm font-bold text-foreground">
                            ৳{request.amount}
                          </p>
                        </div>
                      </div>

                      {/* Submitted */}
                      <div className="rounded-xl border border-border bg-muted/20 p-3">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Submitted
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />

                          <p className="text-sm font-medium text-foreground">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="rounded-xl border border-border bg-muted/20 p-3">
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Payment
                        </p>

                        <div className="mt-1">{getPaymentAction(request)}</div>
                      </div>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
                      {Math.min(startIndex + ITEMS_PER_PAGE, totalRequests)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {totalRequests}
                    </span>{" "}
                    service requests
                  </p>

                  {/* Pagination */}
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
                BOTTOM SECURITY / INFO BAR
            ================================================= */}

            <div className="border-t border-border bg-muted/20 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <WalletCards className="h-4 w-4 text-secondary" />

                  <span>
                    Payments become available after your service request is
                    approved.
                  </span>
                </div>

                <Link
                  href="/dashboard/citizen-dashboard/services"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Browse Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </RoleGuard>
  );
};

export default CitizenServiceRequestsPage;
