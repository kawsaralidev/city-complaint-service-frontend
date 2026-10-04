"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FolderTree,
  MessageSquareWarning,
  Users,
  WalletCards,
} from "lucide-react";

import RoleGuard from "@/app/dashboard/guard/role-guard";
import {
  useAdminDashboardAnalytics,
  useAdminDashboardOverview,
} from "@/hooks/dashboard.hook";
import { useCategories } from "@/hooks/category.hook";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { ErrorState } from "@/components/common/error-state";

const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Dashboard Header */}
        <section className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-7">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-5 w-full max-w-2xl" />
            <Skeleton className="h-5 w-3/4 max-w-xl" />
          </div>
        </section>

        {/* Overview Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-20" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>

              <div className="mt-4 flex gap-2">
                <Skeleton className="h-7 w-24 rounded-md" />
                <Skeleton className="h-7 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </section>

        {/* Content */}
        <section className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />

                <div className="space-y-3 pt-3">
                  {Array.from({ length: 5 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between gap-4"
                    >
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const AdminDashboardPage = () => {
  const {
    data: overview,
    isLoading: overviewLoading,
    isError: overviewError,
  } = useAdminDashboardOverview();

  const {
    data: analytics,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAdminDashboardAnalytics();

  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const isLoading = overviewLoading || analyticsLoading || categoriesLoading;

  const isError = overviewError || analyticsError;

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get status bar color
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toUpperCase();

    if (normalizedStatus === "COMPLETED") {
      return {
        bar: "bg-secondary",
        text: "text-secondary",
        background: "bg-secondary/10",
      };
    }

    if (
      normalizedStatus === "PENDING" ||
      normalizedStatus === "PAYMENT_PENDING"
    ) {
      return {
        bar: "bg-accent",
        text: "text-accent-foreground",
        background: "bg-accent/10",
      };
    }

    if (normalizedStatus === "CONFIRMED" || normalizedStatus === "APPROVED") {
      return {
        bar: "bg-primary",
        text: "text-primary",
        background: "bg-primary/10",
      };
    }

    return {
      bar: "bg-muted-foreground",
      text: "text-muted-foreground",
      background: "bg-muted",
    };
  };

  if (isLoading) {
    return (
      <RoleGuard
        requiredRole="ADMIN"
        loadingFallback={<AdminDashboardSkeleton />}
      >
        <AdminDashboardSkeleton />
      </RoleGuard>
    );
  }

  if (isError || !overview || !analytics) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/20 px-4">
          <div className="w-full max-w-md">
            <ErrorState
              title="Unable to load dashboard"
              description="Something went wrong while loading the dashboard data. Please try again later."
            />
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
          {/* Dashboard Header */}
          <section className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-background to-primary/5 p-6 shadow-sm sm:p-7">
            <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                  Admin Overview
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Admin Dashboard
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Monitor your city service platform, track activity, and manage
                  important operations from one place.
                </p>
              </div>

              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-background/80 shadow-sm ring-1 ring-border sm:flex">
                <BriefcaseBusiness className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </section>

          {/* Overview Cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Users */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Users
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                      {overview.users.total}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Users className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-primary/10 px-2 py-1 font-medium text-primary">
                    {overview.users.citizens} Citizens
                  </span>

                  <span className="rounded-md bg-muted px-2 py-1 font-medium text-muted-foreground">
                    {overview.users.officers} Officers
                  </span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg hover:shadow-secondary/10">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-secondary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Categories
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                      {categories.length}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                    <FolderTree className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4">
                  {categories.length === 0 ? (
                    <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                      No categories available
                    </span>
                  ) : (
                    <span className="rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
                      Active categories
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Complaints */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Complaints
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                      {overview.complaints.total}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground transition-transform duration-300 group-hover:scale-110">
                    <MessageSquareWarning className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-accent/15 px-2 py-1 font-medium text-accent-foreground">
                    {overview.complaints.pending} Pending
                  </span>

                  <span className="rounded-md bg-secondary/10 px-2 py-1 font-medium text-secondary">
                    {overview.complaints.completed} Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Service Requests */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Service Requests
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                      {overview.serviceRequests.total}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-accent/15 px-2 py-1 font-medium text-accent-foreground">
                    {overview.serviceRequests.pending} Pending
                  </span>

                  <span className="rounded-md bg-secondary/10 px-2 py-1 font-medium text-secondary">
                    {overview.serviceRequests.completed} Completed
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Status Overview */}
          <section className="grid gap-6 xl:grid-cols-2">
            {/* Complaint Status */}
            <div className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:border-secondary/25 hover:shadow-lg hover:shadow-secondary/5">
              <div className="border-b border-border bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <MessageSquareWarning className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Complaint Status
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Current complaint distribution
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary sm:block">
                    {overview.complaints.total} Total
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {analytics.complaints.byStatus.length === 0 ? (
                  <EmptyState
                    title="No complaint data"
                    description="There is no complaint status data available yet."
                  />
                ) : (
                  analytics.complaints.byStatus.map((item) => {
                    const total = overview.complaints.total || 1;
                    const percentage = Math.round((item.count / total) * 100);

                    const statusStyle = getStatusColor(item.status);

                    return (
                      <div key={item.status}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${statusStyle.bar}`}
                            />

                            <span className="text-sm font-medium text-foreground">
                              {formatStatus(item.status)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {percentage}%
                            </span>

                            <span
                              className={`min-w-7 rounded-md px-2 py-1 text-center text-xs font-bold ${statusStyle.background} ${statusStyle.text}`}
                            >
                              {item.count}
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${statusStyle.bar}`}
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Service Request Status */}
            <div className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
              <div className="border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <ClipboardList className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Service Request Status
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Current request distribution
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:block">
                    {overview.serviceRequests.total} Total
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {analytics.serviceRequests.byStatus.length === 0 ? (
                  <EmptyState
                    title="No service request data"
                    description="There is no service request status data available yet."
                  />
                ) : (
                  analytics.serviceRequests.byStatus.map((item) => {
                    const total = overview.serviceRequests.total || 1;

                    const percentage = Math.round((item.count / total) * 100);

                    const statusStyle = getStatusColor(item.status);

                    return (
                      <div key={item.status}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${statusStyle.bar}`}
                            />

                            <span className="text-sm font-medium text-foreground">
                              {item.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {percentage}%
                            </span>

                            <span
                              className={`min-w-7 rounded-md px-2 py-1 text-center text-xs font-bold ${statusStyle.background} ${statusStyle.text}`}
                            >
                              {item.count}
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${statusStyle.bar}`}
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* Payment Summary */}
          <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="border-b border-border bg-gradient-to-r from-accent/10 via-accent/5 to-transparent px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground shadow-sm">
                  <WalletCards className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold text-foreground">
                    Payment Summary
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Current payment overview
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
              {/* Total Payments */}
              <div className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Total Payments
                  </p>

                  <CreditCard className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                <p className="mt-3 text-2xl font-bold text-foreground">
                  {overview.payments.total}
                </p>
              </div>

              {/* Paid */}
              <div className="group rounded-xl border border-secondary/20 bg-secondary/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-secondary/10 hover:shadow-md hover:shadow-secondary/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Paid
                  </p>

                  <CheckCircle2 className="h-4 w-4 text-secondary transition-transform duration-300 group-hover:scale-110" />
                </div>

                <p className="mt-3 text-2xl font-bold text-secondary">
                  {overview.payments.paid}
                </p>
              </div>

              {/* Pending */}
              <div className="group rounded-xl border border-accent/25 bg-accent/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/10 hover:shadow-md hover:shadow-accent/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Pending
                  </p>

                  <ClipboardList className="h-4 w-4 text-accent-foreground transition-transform duration-300 group-hover:scale-110" />
                </div>

                <p className="mt-3 text-2xl font-bold text-accent-foreground">
                  {overview.payments.pending}
                </p>
              </div>

              {/* Total Paid Amount */}
              <div className="group rounded-xl border border-primary/20 bg-primary/5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/10">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Total Paid Amount
                  </p>

                  <WalletCards className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>

                <p className="mt-3 text-2xl font-bold text-primary">
                  {overview.payments.totalPaidAmount}
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Activity */}
          <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow duration-300 hover:shadow-lg">
            <div className="border-b border-border bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-foreground">
                      Monthly Activity
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Monthly complaints, requests, and payment activity
                    </p>
                  </div>
                </div>

                <span className="hidden rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
                  Activity Report
                </span>
              </div>
            </div>

            <div className="overflow-x-auto p-4 sm:p-6">
              <table className="w-full min-w-[650px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Month
                    </th>

                    <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Complaints
                    </th>

                    <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Service Requests
                    </th>

                    <th className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Paid Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {analytics.monthly.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-10">
                        <EmptyState
                          title="No monthly data"
                          description="There is no monthly activity data available yet."
                        />
                      </td>
                    </tr>
                  ) : (
                    analytics.monthly.map((item) => (
                      <tr
                        key={item.month}
                        className="group/row transition-colors hover:bg-muted/30"
                      >
                        <td className="border-b border-border/60 px-4 py-4 font-medium text-foreground">
                          {item.month}
                        </td>

                        <td className="border-b border-border/60 px-4 py-4">
                          <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-secondary/10 px-2.5 py-1.5 font-semibold text-secondary transition-colors group-hover/row:bg-secondary/15">
                            {item.complaints}
                          </span>
                        </td>

                        <td className="border-b border-border/60 px-4 py-4">
                          <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-primary/10 px-2.5 py-1.5 font-semibold text-primary transition-colors group-hover/row:bg-primary/15">
                            {item.serviceRequests}
                          </span>
                        </td>

                        <td className="border-b border-border/60 px-4 py-4 font-semibold text-foreground">
                          {item.paidAmount}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminDashboardPage;
