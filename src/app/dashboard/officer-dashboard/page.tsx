"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  PlayCircle,
} from "lucide-react";

import RoleGuard from "../guard/role-guard";
import { useAssignedServiceRequests } from "@/hooks/service-request.hook";

const statusStyles: Record<string, string> = {
  ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export default function OfficerDashboardPage() {
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useAssignedServiceRequests();

  const assignedCount = requests.filter(
    (request) => request.status === "ASSIGNED",
  ).length;

  const inProgressCount = requests.filter(
    (request) => request.status === "IN_PROGRESS",
  ).length;

  const completedCount = requests.filter(
    (request) => request.status === "COMPLETED",
  ).length;

  const recentRequests = requests.slice(0, 5);

  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Officer Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor and manage your assigned service requests.
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
            <p className="text-sm text-destructive">
              Failed to load your service request summary.
            </p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Assigned */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Assigned</p>

                <p className="mt-2 text-3xl font-bold">
                  {isLoading ? "—" : assignedCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100">
                <ClipboardList className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Requests waiting for you to start work
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>

                <p className="mt-2 text-3xl font-bold">
                  {isLoading ? "—" : inProgressCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-100">
                <PlayCircle className="h-5 w-5 text-yellow-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Requests currently being worked on
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>

                <p className="mt-2 text-3xl font-bold">
                  {isLoading ? "—" : completedCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Service requests completed by you
            </p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Service Requests</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest assigned service requests.
              </p>
            </div>

            <Link
              href="/dashboard/officer-dashboard/service-requests"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-3 p-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && recentRequests.length === 0 && (
            <div className="flex min-h-40 items-center justify-center p-5 text-center">
              <div>
                <Clock3 className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-3 text-sm font-medium">
                  No service requests yet
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Assigned requests will appear here.
                </p>
              </div>
            </div>
          )}

          {/* Requests */}
          {!isLoading && !isError && recentRequests.length > 0 && (
            <div className="divide-y">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">
                      {request.service.name}
                    </h3>

                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {request.location}
                    </p>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[request.status] ??
                      "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatStatus(request.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
