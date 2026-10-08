"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileWarning,
  ListTodo,
  PlayCircle,
  TrendingUp,
} from "lucide-react";

import RoleGuard from "../guard/role-guard";

import { useAssignedComplaints } from "@/hooks/complaint.hook";
import { useAssignedServiceRequests } from "@/hooks/service-request.hook";

import type { ComplaintStatus } from "@/types/complaint";
import type { ServiceRequestStatus } from "@/types/service-request";

const serviceRequestStatusStyles: Record<string, string> = {
  ASSIGNED: "border-blue-200 bg-blue-50 text-blue-700",
  IN_PROGRESS: "border-amber-200 bg-amber-50 text-amber-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const complaintStatusStyles: Record<string, string> = {
  ASSIGNED: "border-purple-200 bg-purple-50 text-purple-700",
  IN_PROGRESS: "border-indigo-200 bg-indigo-50 text-indigo-700",
  COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
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

const getServiceRequestStatusStyle = (status: ServiceRequestStatus) => {
  return (
    serviceRequestStatusStyles[status] ??
    "border-border bg-muted text-muted-foreground"
  );
};

const getComplaintStatusStyle = (status: ComplaintStatus) => {
  return (
    complaintStatusStyles[status] ??
    "border-border bg-muted text-muted-foreground"
  );
};

export default function OfficerDashboardPage() {
  const {
    data: serviceRequests = [],
    isLoading: isServiceRequestsLoading,
    isError: isServiceRequestsError,
  } = useAssignedServiceRequests();

  const {
    data: complaintsResponse,
    isLoading: isComplaintsLoading,
    isError: isComplaintsError,
  } = useAssignedComplaints();

  const complaints = complaintsResponse?.data ?? [];

  const isLoading = isServiceRequestsLoading || isComplaintsLoading;

  const hasError = isServiceRequestsError || isComplaintsError;

  /* ============================================================
     SERVICE REQUEST COUNTS
  ============================================================ */

  const assignedServiceRequests = serviceRequests.filter(
    (request) => request.status === "ASSIGNED",
  );

  const inProgressServiceRequests = serviceRequests.filter(
    (request) => request.status === "IN_PROGRESS",
  );

  const completedServiceRequests = serviceRequests.filter(
    (request) => request.status === "COMPLETED",
  );

  /* ============================================================
     COMPLAINT COUNTS
  ============================================================ */

  const assignedComplaints = complaints.filter(
    (assignment) => assignment.complaint?.status === "ASSIGNED",
  );

  const inProgressComplaints = complaints.filter(
    (assignment) => assignment.complaint?.status === "IN_PROGRESS",
  );

  const completedComplaints = complaints.filter(
    (assignment) => assignment.complaint?.status === "COMPLETED",
  );

  /* ============================================================
     OVERALL WORKLOAD
  ============================================================ */

  const totalAssignedWork = serviceRequests.length + complaints.length;

  const totalInProgressWork =
    inProgressServiceRequests.length + inProgressComplaints.length;

  const totalCompletedWork =
    completedServiceRequests.length + completedComplaints.length;

  const completionRate =
    totalAssignedWork > 0
      ? Math.round((totalCompletedWork / totalAssignedWork) * 100)
      : 0;

  const recentServiceRequests = serviceRequests.slice(0, 5);

  const recentComplaints = complaints.slice(0, 5);

  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="min-h-full bg-muted/20">
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          {/* ======================================================
              PAGE HEADER
          ======================================================= */}

          <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <ListTodo className="h-3.5 w-3.5" />
                  Officer Workspace
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Officer Dashboard
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                  Keep track of your assigned complaints and service requests,
                  manage active work, and monitor your completed tasks.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">
                <Link
                  href="/dashboard/officer-dashboard/service-requests"
                  className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <ClipboardList className="h-4 w-4" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-foreground">
                    Service Requests
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    View assigned work
                  </p>
                </Link>

                <Link
                  href="/dashboard/officer-dashboard/complaints"
                  className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-secondary/5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <FileWarning className="h-4 w-4" />
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-foreground">
                    Complaints
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Manage assigned complaints
                  </p>
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-secondary/5 blur-3xl" />
          </section>

          {/* ======================================================
              ERROR
          ======================================================= */}

          {hasError && (
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
              <p className="text-sm font-medium text-destructive">
                Some dashboard data could not be loaded.
              </p>

              <p className="mt-1 text-xs text-destructive/80">
                Please refresh the page and try again.
              </p>
            </div>
          )}

          {/* ======================================================
              KPI CARDS
          ======================================================= */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Assigned Work */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Assigned Work
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading ? "—" : totalAssignedWork}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ListTodo className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Complaints and service requests assigned to you
              </p>
            </div>

            {/* In Progress */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading ? "—" : totalInProgressWork}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                  <PlayCircle className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Tasks currently being worked on
              </p>
            </div>

            {/* Completed */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading ? "—" : totalCompletedWork}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Tasks successfully completed by you
              </p>
            </div>

            {/* Completion Rate */}
            <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completion Rate
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {isLoading ? "—" : `${completionRate}%`}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-muted-foreground">
                Based on your assigned workload
              </p>
            </div>
          </section>

          {/* ======================================================
              WORK OVERVIEW
          ======================================================= */}

          <section className="grid gap-5 lg:grid-cols-2">
            {/* Service Request Overview */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                  <h2 className="font-semibold text-foreground">
                    Service Request Overview
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your current service request workload
                  </p>
                </div>

                <Link
                  href="/dashboard/officer-dashboard/service-requests"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Assigned
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : assignedServiceRequests.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-blue-500"
                      style={{
                        width: `${
                          serviceRequests.length
                            ? (assignedServiceRequests.length /
                                serviceRequests.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    In Progress
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : inProgressServiceRequests.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-amber-500"
                      style={{
                        width: `${
                          serviceRequests.length
                            ? (inProgressServiceRequests.length /
                                serviceRequests.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Completed
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : completedServiceRequests.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${
                          serviceRequests.length
                            ? (completedServiceRequests.length /
                                serviceRequests.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint Overview */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                  <h2 className="font-semibold text-foreground">
                    Complaint Overview
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Your current complaint workload
                  </p>
                </div>

                <Link
                  href="/dashboard/officer-dashboard/complaints"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Assigned
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : assignedComplaints.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-purple-500"
                      style={{
                        width: `${
                          complaints.length
                            ? (assignedComplaints.length / complaints.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    In Progress
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : inProgressComplaints.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-indigo-500"
                      style={{
                        width: `${
                          complaints.length
                            ? (inProgressComplaints.length /
                                complaints.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Completed
                  </p>

                  <p className="mt-2 text-2xl font-bold text-foreground">
                    {isLoading ? "—" : completedComplaints.length}
                  </p>

                  <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="bg-emerald-500"
                      style={{
                        width: `${
                          complaints.length
                            ? (completedComplaints.length / complaints.length) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================
              RECENT SERVICE REQUESTS
          ======================================================= */}

          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ClipboardList className="h-4 w-4" />
                  </div>

                  <h2 className="font-semibold text-foreground">
                    Recent Service Requests
                  </h2>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your latest assigned service requests.
                </p>
              </div>

              <Link
                href="/dashboard/officer-dashboard/service-requests"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {isLoading && (
              <div className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 sm:p-6"
                  >
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading &&
              !isServiceRequestsError &&
              recentServiceRequests.length === 0 && (
                <div className="flex min-h-44 items-center justify-center p-6 text-center">
                  <div>
                    <ClipboardList className="mx-auto h-9 w-9 text-muted-foreground" />

                    <p className="mt-3 font-medium text-foreground">
                      No service requests yet
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Assigned service requests will appear here.
                    </p>
                  </div>
                </div>
              )}

            {!isLoading &&
              !isServiceRequestsError &&
              recentServiceRequests.length > 0 && (
                <div className="divide-y divide-border">
                  {recentServiceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <ClipboardList className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-foreground">
                            {request.service.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>{request.location}</span>

                            <span className="hidden sm:inline">•</span>

                            <span>{formatDate(request.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getServiceRequestStatusStyle(
                          request.status,
                        )}`}
                      >
                        {formatStatus(request.status)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
          </section>

          {/* ======================================================
              RECENT COMPLAINTS
          ======================================================= */}

          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <FileWarning className="h-4 w-4" />
                  </div>

                  <h2 className="font-semibold text-foreground">
                    Recent Complaints
                  </h2>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your latest assigned complaints.
                </p>
              </div>

              <Link
                href="/dashboard/officer-dashboard/complaints"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {isLoading && (
              <div className="divide-y divide-border">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-5 sm:p-6"
                  >
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-52 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-36 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            )}

            {!isLoading &&
              !isComplaintsError &&
              recentComplaints.length === 0 && (
                <div className="flex min-h-44 items-center justify-center p-6 text-center">
                  <div>
                    <FileWarning className="mx-auto h-9 w-9 text-muted-foreground" />

                    <p className="mt-3 font-medium text-foreground">
                      No complaints yet
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Assigned complaints will appear here.
                    </p>
                  </div>
                </div>
              )}

            {!isLoading &&
              !isComplaintsError &&
              recentComplaints.length > 0 && (
                <div className="divide-y divide-border">
                  {recentComplaints.map((assignment) => {
                    const complaint = assignment.complaint;

                    return (
                      <div
                        key={assignment.id}
                        className="group flex flex-col gap-4 p-5 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                            <FileWarning className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-foreground">
                              {complaint.title}
                            </h3>

                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                              <span>{complaint.location}</span>

                              <span className="hidden sm:inline">•</span>

                              <span>{formatDate(complaint.createdAt)}</span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${getComplaintStatusStyle(
                            complaint.status,
                          )}`}
                        >
                          {formatStatus(complaint.status)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
          </section>

          {/* ======================================================
              FOOTER INSIGHT
          ======================================================= */}

          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-medium text-foreground">
                Keep your assigned work moving
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Update tasks from Assigned to In Progress and complete them when
                the work is finished.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
