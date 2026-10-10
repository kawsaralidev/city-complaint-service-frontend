"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  FilePlus2,
  Loader2,
  MapPin,
  MessageSquareWarning,
  Plus,
  ReceiptText,
  Wrench,
} from "lucide-react";

import { useMyComplaints } from "@/hooks/complaint.hook";
import { useCurrentUser } from "@/hooks/auth.hook";
import { useMyServiceRequests } from "@/hooks/service-request.hook";

import type { ComplaintStatus } from "@/types/complaint";
import type { ServiceRequestStatus } from "@/types/service-request";
import RoleGuard from "../guard/role-guard";

/* ============================================================
   HELPERS
============================================================ */

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

/* ============================================================
   COMPLAINT STATUS STYLE
============================================================ */

const getComplaintStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "PENDING":
      return {
        className: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      };

    case "APPROVED":
      return {
        className: "border-blue-200 bg-blue-50 text-blue-700",
        dot: "bg-blue-500",
      };

    case "ASSIGNED":
      return {
        className: "border-indigo-200 bg-indigo-50 text-indigo-700",
        dot: "bg-indigo-500",
      };

    case "IN_PROGRESS":
      return {
        className: "border-primary/20 bg-primary/10 text-primary",
        dot: "bg-primary",
      };

    case "COMPLETED":
      return {
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      };

    case "REJECTED":
      return {
        className: "border-red-200 bg-red-50 text-red-700",
        dot: "bg-red-500",
      };

    case "CANCELED":
      return {
        className: "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-500",
      };

    default:
      return {
        className: "border-border bg-muted text-muted-foreground",
        dot: "bg-muted-foreground",
      };
  }
};

/* ============================================================
   SERVICE REQUEST STATUS STYLE
============================================================ */

const getServiceRequestStatusStyle = (status: ServiceRequestStatus) => {
  switch (status) {
    case "PENDING":
      return {
        className: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      };

    case "APPROVED":
      return {
        className: "border-blue-200 bg-blue-50 text-blue-700",
        dot: "bg-blue-500",
      };

    case "PAYMENT_PENDING":
      return {
        className: "border-orange-200 bg-orange-50 text-orange-700",
        dot: "bg-orange-500",
      };

    case "CONFIRMED":
      return {
        className: "border-cyan-200 bg-cyan-50 text-cyan-700",
        dot: "bg-cyan-500",
      };

    case "ASSIGNED":
      return {
        className: "border-indigo-200 bg-indigo-50 text-indigo-700",
        dot: "bg-indigo-500",
      };

    case "IN_PROGRESS":
      return {
        className: "border-primary/20 bg-primary/10 text-primary",
        dot: "bg-primary",
      };

    case "COMPLETED":
      return {
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      };

    case "REJECTED":
      return {
        className: "border-red-200 bg-red-50 text-red-700",
        dot: "bg-red-500",
      };

    case "CANCELED":
      return {
        className: "border-slate-200 bg-slate-100 text-slate-600",
        dot: "bg-slate-500",
      };

    default:
      return {
        className: "border-border bg-muted text-muted-foreground",
        dot: "bg-muted-foreground",
      };
  }
};

/* ============================================================
   LOADING SKELETON
============================================================ */

const CitizenDashboardSkeleton = () => {
  return (
    <main className="min-h-full overflow-hidden bg-muted/20">
      <div className="space-y-6 p-4 sm:p-6 lg:p-7">
        {/* Header */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="space-y-4">
            <div className="h-7 w-36 animate-pulse rounded-full bg-muted" />

            <div className="h-9 w-64 animate-pulse rounded-lg bg-muted" />

            <div className="h-5 w-full max-w-2xl animate-pulse rounded bg-muted" />

            <div className="h-5 w-3/4 max-w-xl animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />

                  <div className="h-9 w-16 animate-pulse rounded bg-muted" />

                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>

                <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-6 space-y-3">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />

              <div className="h-4 w-56 animate-pulse rounded bg-muted" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-6 space-y-3">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />

              <div className="h-4 w-52 animate-pulse rounded bg-muted" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   DASHBOARD
============================================================ */

const CitizenDashboardPage = () => {
  const { data: userResponse, isLoading: userLoading } = useCurrentUser();

  const {
    data: complaintsResponse,
    isLoading: complaintsLoading,
    isError: complaintsError,
  } = useMyComplaints();

  const {
    data: serviceRequests,
    isLoading: serviceRequestsLoading,
    isError: serviceRequestsError,
  } = useMyServiceRequests();

  /* ============================================================
     DATA
  ============================================================ */

  const complaints = complaintsResponse?.data ?? [];

  const requests = serviceRequests ?? [];

  const isLoading = userLoading || complaintsLoading || serviceRequestsLoading;

  const hasError = complaintsError || serviceRequestsError;

  /* ============================================================
     COMPLAINT STATISTICS
  ============================================================ */

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "PENDING",
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "IN_PROGRESS" || complaint.status === "ASSIGNED",
  ).length;

  const completedComplaints = complaints.filter(
    (complaint) => complaint.status === "COMPLETED",
  ).length;

  /* ============================================================
     SERVICE REQUEST STATISTICS
  ============================================================ */

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) =>
      request.status === "PENDING" ||
      request.status === "APPROVED" ||
      request.status === "PAYMENT_PENDING",
  ).length;

  const activeRequests = requests.filter(
    (request) =>
      request.status === "CONFIRMED" ||
      request.status === "ASSIGNED" ||
      request.status === "IN_PROGRESS",
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "COMPLETED",
  ).length;

  /* ============================================================
     RECENT DATA
  ============================================================ */

  const recentComplaints = [...complaints]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentRequests = [...requests]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  /* ============================================================
     USER NAME
  ============================================================ */

  const userName = userResponse?.data?.name?.trim() || "Citizen";

  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return <CitizenDashboardSkeleton />;
  }

  return (
    <RoleGuard requiredRole="CITIZEN">
      <main className="min-h-full overflow-hidden bg-muted/20">
        <div className="space-y-6 p-4 sm:p-6 lg:p-7">
          {/* ======================================================
            HERO
        ======================================================= */}

          <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="relative p-5 sm:p-7 lg:p-8">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                {/* Heading */}
                <div className="min-w-0">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                    <ClipboardList className="h-3.5 w-3.5" />
                    Citizen Dashboard
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    Welcome back, {userName.split(" ")[0]}!
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Manage your complaints, service requests and track
                    everything from one place.
                  </p>

                  {/* Mini overview */}
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {totalComplaints} Complaints
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {totalRequests} Service Requests
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {completedComplaints + completedRequests} Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================
            STATISTICS
        ======================================================= */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Complaints
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {totalComplaints}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your submitted complaints
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <ClipboardList className="h-5 w-5" />
                </div>
              </div>

              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full rounded-full bg-primary/60" />
              </div>
            </div>

            {/* Total Service Requests */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-500/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-100 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Service Requests
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {totalRequests}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your submitted service requests
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white">
                  <Wrench className="h-5 w-5" />
                </div>
              </div>

              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-full rounded-full bg-amber-400 transition-all duration-700" />
              </div>
            </div>

            {/* In Progress */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-100 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {inProgressComplaints}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently being handled
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white">
                  <Loader2 className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                </div>
              </div>

              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-700"
                  style={{
                    width:
                      totalComplaints > 0
                        ? `${Math.min(
                            (inProgressComplaints / totalComplaints) * 100,
                            100,
                          )}%`
                        : "0%",
                  }}
                />
              </div>
            </div>

            {/* Completed */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-100 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {completedComplaints}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Successfully resolved
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>

              <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width:
                      totalComplaints > 0
                        ? `${Math.min(
                            (completedComplaints / totalComplaints) * 100,
                            100,
                          )}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </section>

          {/* ======================================================
            MAIN CONTENT
        ======================================================= */}

          <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
            {/* ====================================================
              RECENT COMPLAINTS
          ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/5 via-card to-secondary/5 px-5 py-4 sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MessageSquareWarning className="h-4 w-4" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-foreground">
                        Recent Complaints
                      </h2>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Your latest submitted complaints
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard/citizen-dashboard/complaints"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {hasError ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    Unable to load your complaints
                  </h3>

                  <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                    Please refresh the page and try again.
                  </p>
                </div>
              ) : recentComplaints.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-5 py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ClipboardList className="h-7 w-7" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    No complaints yet
                  </h3>

                  <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                    Your submitted complaints will appear here. Create your
                    first complaint to get started.
                  </p>

                  <Link
                    href="/dashboard/citizen-dashboard/complaints"
                    className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Create Complaint
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentComplaints.map((complaint) => {
                    const statusStyle = getComplaintStatusStyle(
                      complaint.status,
                    );

                    return (
                      <Link
                        key={complaint.id}
                        href={`/complaints/${complaint.id}`}
                        className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/30 sm:px-6"
                      >
                        {/* Icon */}
                        <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-all group-hover:bg-primary/10 sm:flex">
                          <ClipboardList className="h-4.5 w-4.5" />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {complaint.title}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3 w-3" />

                              {complaint.location}
                            </span>

                            <span className="hidden items-center gap-1 sm:inline-flex">
                              <CalendarDays className="h-3 w-3" />

                              {formatDate(complaint.createdAt)}
                            </span>
                          </div>
                        </div>

                        {/* Status */}
                        <span
                          className={`hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold sm:inline-flex ${statusStyle.className}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                          />

                          {formatStatus(complaint.status)}
                        </span>

                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ====================================================
              SERVICE REQUESTS
          ===================================================== */}

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-gradient-to-r from-secondary/5 via-card to-primary/5 px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Wrench className="h-4 w-4" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-foreground">
                        Service Requests
                      </h2>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Your latest service requests
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/citizen-dashboard/service-request"
                    className="group inline-flex items-center gap-1 text-xs font-semibold text-primary"
                  >
                    View All
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Request summary */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-border bg-background/70 px-3 py-2.5">
                    <p className="text-[10px] font-medium text-muted-foreground">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-bold text-foreground">
                      {totalRequests}
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-200/70 bg-amber-50/50 px-3 py-2.5">
                    <p className="text-[10px] font-medium text-amber-700/70">
                      Pending
                    </p>

                    <p className="mt-1 text-lg font-bold text-amber-700">
                      {pendingRequests}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 px-3 py-2.5">
                    <p className="text-[10px] font-medium text-emerald-700/70">
                      Done
                    </p>

                    <p className="mt-1 text-lg font-bold text-emerald-700">
                      {completedRequests}
                    </p>
                  </div>
                </div>
              </div>

              {serviceRequestsError ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <AlertCircle className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    Unable to load service requests
                  </h3>

                  <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                    Please refresh the page and try again.
                  </p>
                </div>
              ) : recentRequests.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center px-5 py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <ReceiptText className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-foreground">
                    No service requests yet
                  </h3>

                  <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                    Request a city service and track its progress from here.
                  </p>

                  <Link
                    href="/dashboard/citizen-dashboard/services"
                    className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3.5 text-xs font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                  >
                    Browse Services
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentRequests.map((request) => {
                    const statusStyle = getServiceRequestStatusStyle(
                      request.status,
                    );

                    return (
                      <Link
                        key={request.id}
                        href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                        className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/30 sm:px-6"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-secondary/10 bg-secondary/5 text-secondary transition-all group-hover:bg-secondary/10">
                          <ReceiptText className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {request.service.name}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="inline-flex min-w-0 items-center gap-1">
                              <MapPin className="h-3 w-3 shrink-0" />

                              <span className="truncate">
                                {request.location}
                              </span>
                            </span>

                            <span className="hidden sm:inline">•</span>

                            <span className="hidden sm:inline">
                              ৳{request.amount}
                            </span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold md:inline-flex ${statusStyle.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                            />

                            {formatStatus(request.status)}
                          </span>

                          <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </RoleGuard>
  );
};

export default CitizenDashboardPage;
