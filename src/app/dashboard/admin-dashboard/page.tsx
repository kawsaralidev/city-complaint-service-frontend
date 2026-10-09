"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FolderTree,
  MessageSquareWarning,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import RoleGuard from "@/app/dashboard/guard/role-guard";

import {
  useAdminDashboardAnalytics,
  useAdminDashboardOverview,
} from "@/hooks/dashboard.hook";

import { useCategories } from "@/hooks/category.hook";

import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";

/* =========================================================
   HELPERS
========================================================= */

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatBDT = (value: string | number | null | undefined) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return `৳${value ?? "0"}`;
  }

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
};

/* =========================================================
   CHART COLORS

   Each status gets a clearly different color.
========================================================= */

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#F59E0B",
  PAYMENT_PENDING: "#F97316",

  ASSIGNED: "#8B5CF6",

  IN_PROGRESS: "#2563EB",

  APPROVED: "#06B6D4",
  CONFIRMED: "#0891B2",
  PAYMENT_CONFIRMED: "#0EA5E9",

  COMPLETED: "#10B981",
  RESOLVED: "#16A34A",
  CLOSED: "#059669",

  REJECTED: "#EF4444",
  CANCELLED: "#DC2626",

  FAILED: "#E11D48",

  DEFAULT: "#64748B",
};

const FALLBACK_CHART_COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
  "#06B6D4",
  "#F97316",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
];

const getChartColor = (status: string, index: number) => {
  const normalizedStatus = status.toUpperCase();

  return (
    STATUS_COLORS[normalizedStatus] ??
    FALLBACK_CHART_COLORS[index % FALLBACK_CHART_COLORS.length]
  );
};

/* =========================================================
   STATUS STYLE FOR PROGRESS ROWS
========================================================= */

const getStatusStyle = (status: string) => {
  const normalizedStatus = status.toUpperCase();

  switch (normalizedStatus) {
    case "COMPLETED":
    case "RESOLVED":
    case "CLOSED":
      return {
        dot: "bg-emerald-500",
        text: "text-emerald-700 dark:text-emerald-400",
        background: "bg-emerald-50 dark:bg-emerald-500/10",
        bar: "bg-emerald-500",
      };

    case "PENDING":
      return {
        dot: "bg-amber-500",
        text: "text-amber-700 dark:text-amber-400",
        background: "bg-amber-50 dark:bg-amber-500/10",
        bar: "bg-amber-500",
      };

    case "PAYMENT_PENDING":
      return {
        dot: "bg-orange-500",
        text: "text-orange-700 dark:text-orange-400",
        background: "bg-orange-50 dark:bg-orange-500/10",
        bar: "bg-orange-500",
      };

    case "CONFIRMED":
    case "APPROVED":
    case "PAYMENT_CONFIRMED":
      return {
        dot: "bg-cyan-500",
        text: "text-cyan-700 dark:text-cyan-400",
        background: "bg-cyan-50 dark:bg-cyan-500/10",
        bar: "bg-cyan-500",
      };

    case "ASSIGNED":
      return {
        dot: "bg-violet-500",
        text: "text-violet-700 dark:text-violet-400",
        background: "bg-violet-50 dark:bg-violet-500/10",
        bar: "bg-violet-500",
      };

    case "IN_PROGRESS":
      return {
        dot: "bg-blue-500",
        text: "text-blue-700 dark:text-blue-400",
        background: "bg-blue-50 dark:bg-blue-500/10",
        bar: "bg-blue-500",
      };

    case "REJECTED":
    case "CANCELLED":
    case "FAILED":
      return {
        dot: "bg-red-500",
        text: "text-red-700 dark:text-red-400",
        background: "bg-red-50 dark:bg-red-500/10",
        bar: "bg-red-500",
      };

    default:
      return {
        dot: "bg-slate-500",
        text: "text-slate-700 dark:text-slate-300",
        background: "bg-slate-100 dark:bg-slate-500/10",
        bar: "bg-slate-500",
      };
  }
};

/* =========================================================
   STAT CARD
========================================================= */

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  tone: "blue" | "green" | "amber" | "violet";
}

const StatCard = ({ title, value, description, icon, tone }: StatCardProps) => {
  const toneStyles = {
    blue: {
      border: "border-blue-200/70 dark:border-blue-500/20",
      icon: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      glow: "bg-blue-500/10",
      value: "text-blue-600 dark:text-blue-400",
    },

    green: {
      border: "border-emerald-200/70 dark:border-emerald-500/20",
      icon: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      glow: "bg-emerald-500/10",
      value: "text-emerald-600 dark:text-emerald-400",
    },

    amber: {
      border: "border-amber-200/70 dark:border-amber-500/20",
      icon: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      glow: "bg-amber-500/10",
      value: "text-amber-600 dark:text-amber-400",
    },

    violet: {
      border: "border-violet-200/70 dark:border-violet-500/20",
      icon: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      glow: "bg-violet-500/10",
      value: "text-violet-600 dark:text-violet-400",
    },
  };

  const styles = toneStyles[tone];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-background p-5 shadow-[0_4px_18px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.10)] ${styles.border}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150 ${styles.glow}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p
              className={`mt-2 text-3xl font-bold tracking-tight ${styles.value}`}
            >
              {value}
            </p>
          </div>

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
          >
            {icon}
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

/* =========================================================
   PROGRESS ROW
========================================================= */

interface ProgressRowProps {
  label: string;
  count: number;
  percentage: number;
  status: string;
}

const ProgressRow = ({
  label,
  count,
  percentage,
  status,
}: ProgressRowProps) => {
  const style = getStatusStyle(status);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />

          <span className="truncate text-sm font-medium text-foreground">
            {label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="text-xs text-muted-foreground">{percentage}%</span>

          <span
            className={`min-w-8 rounded-md px-2 py-1 text-center text-xs font-bold ${style.background} ${style.text}`}
          >
            {count}
          </span>
        </div>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   STATUS CHART

   Important:
   - Chart colors are explicit.
   - Legend is outside the chart.
   - Tooltip has its own readable background.
========================================================= */

interface StatusChartProps {
  title: string;
  description: string;
  data: {
    status: string;
    count: number;
  }[];
  icon: React.ReactNode;
}

const StatusChart = ({ title, description, data, icon }: StatusChartProps) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
        {/* Header */}
        <div className="border-b border-border bg-muted/20 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              {icon}
            </div>

            <div>
              <h2 className="font-semibold text-foreground">{title}</h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title={`No ${title.toLowerCase()} data`}
              description="There is no status data available yet."
            />
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            {/* Chart */}
            <div className="relative h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={92}
                    paddingAngle={3}
                    stroke="hsl(var(--background))"
                    strokeWidth={3}
                  >
                    {data.map((item, index) => (
                      <Cell
                        key={`${item.status}-${index}`}
                        fill={getChartColor(item.status, index)}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) {
                        return null;
                      }

                      const item = payload[0];

                      const status = String(item?.name ?? "");
                      const value = Number(item?.value ?? 0);

                      const color = getChartColor(
                        status,
                        data.findIndex((entry) => entry.status === status),
                      );

                      return (
                        <div
                          className="min-w-[170px] rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900"
                          style={{
                            position: "relative",
                            zIndex: 1000,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: color }}
                            />

                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                              {formatStatus(status)}
                            </span>
                          </div>

                          <div className="mt-2 flex items-end justify-between gap-5">
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Total
                            </span>

                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {value}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center value */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{total}</p>

                  <p className="text-[11px] text-muted-foreground">Total</p>
                </div>
              </div>
            </div>

            {/* Clear Legend */}
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {data.map((item, index) => {
                const color = getChartColor(item.status, index);

                const percentage =
                  total > 0 ? Math.round((item.count / total) * 100) : 0;

                return (
                  <div
                    key={`${item.status}-legend`}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white dark:ring-slate-900"
                        style={{ backgroundColor: color }}
                      />

                      <span className="truncate text-xs font-medium text-foreground">
                        {formatStatus(item.status)}
                      </span>
                    </div>

                    <div className="ml-2 flex shrink-0 items-center gap-2">
                      <span className="text-[11px] text-muted-foreground">
                        {percentage}%
                      </span>

                      <span className="min-w-6 rounded-md bg-background px-1.5 py-0.5 text-center text-xs font-bold text-foreground">
                        {item.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

/* =========================================================
   SKELETON
========================================================= */

const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Hero */}
        <section className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-5 w-full max-w-2xl" />
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-24" />
                </div>

                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>

              <Skeleton className="mt-5 h-4 w-36" />
            </div>
          ))}
        </section>

        {/* Main */}
        <section className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-2xl border border-border bg-background p-6 shadow-sm">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-72" />

            <div className="mt-7 space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>

                  <Skeleton className="mt-2 h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-56" />

            <div className="mt-7 space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-64" />

            <div className="flex justify-center py-8">
              <Skeleton className="h-48 w-48 rounded-full" />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="mt-2 h-4 w-64" />

            <div className="flex justify-center py-8">
              <Skeleton className="h-48 w-48 rounded-full" />
            </div>
          </div>
        </section>

        {/* Monthly */}
        <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-64" />
          <Skeleton className="mt-7 h-72 w-full rounded-xl" />
        </section>
      </div>
    </div>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

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

  /* =========================================================
     DERIVED DATA
  ========================================================= */

  const totalUsers = overview?.users.total ?? 0;
  const citizens = overview?.users.citizens ?? 0;
  const officers = overview?.users.officers ?? 0;

  const admins = Math.max(totalUsers - citizens - officers, 0);

  const totalComplaints = overview?.complaints.total ?? 0;
  const pendingComplaints = overview?.complaints.pending ?? 0;
  const completedComplaints = overview?.complaints.completed ?? 0;

  const totalServiceRequests = overview?.serviceRequests.total ?? 0;
  const pendingServiceRequests = overview?.serviceRequests.pending ?? 0;
  const completedServiceRequests = overview?.serviceRequests.completed ?? 0;

  const totalPayments = overview?.payments.total ?? 0;
  const paidPayments = overview?.payments.paid ?? 0;
  const pendingPayments = overview?.payments.pending ?? 0;

  const totalPaidAmount = overview?.payments.totalPaidAmount ?? 0;

  const complaintCompletion =
    totalComplaints > 0
      ? Math.round((completedComplaints / totalComplaints) * 100)
      : 0;

  const serviceRequestCompletion =
    totalServiceRequests > 0
      ? Math.round((completedServiceRequests / totalServiceRequests) * 100)
      : 0;

  const paymentSuccessRate =
    totalPayments > 0 ? Math.round((paidPayments / totalPayments) * 100) : 0;

  const monthlyData = analytics?.monthly ?? [];

  /* =========================================================
     USER DISTRIBUTION
  ========================================================= */

  const userDistribution = [
    {
      label: "Citizens",
      count: citizens,
      percentage:
        totalUsers > 0 ? Math.round((citizens / totalUsers) * 100) : 0,
      status: "CITIZEN",
    },
    {
      label: "Officers",
      count: officers,
      percentage:
        totalUsers > 0 ? Math.round((officers / totalUsers) * 100) : 0,
      status: "OFFICER",
    },
    {
      label: "Admins",
      count: admins,
      percentage: totalUsers > 0 ? Math.round((admins / totalUsers) * 100) : 0,
      status: "ADMIN",
    },
  ];

  /* =========================================================
     LOADING
  ========================================================= */

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

  /* =========================================================
     ERROR
  ========================================================= */

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

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-background to-emerald-50 p-6 shadow-[0_6px_24px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:from-blue-500/10 dark:via-background dark:to-emerald-500/10 sm:p-8">
            <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Admin Overview
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  CityCare Control Center
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Monitor complaints, service requests, users and payments from
                  one centralized workspace.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Platform operational
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {categories.length} categories
                  </span>
                </div>
              </div>

              <div className="hidden shrink-0 lg:flex">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-[28px] border border-blue-200 bg-background/80 shadow-[0_10px_30px_rgba(15,23,42,0.10)] backdrop-blur dark:border-blue-500/20">
                  <div className="absolute inset-3 rounded-[20px] bg-blue-50 dark:bg-blue-500/10" />

                  <BriefcaseBusiness className="relative h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Users"
              value={totalUsers}
              description={`${citizens} citizens • ${officers} officers`}
              icon={<Users className="h-5 w-5" />}
              tone="blue"
            />

            <StatCard
              title="Complaints"
              value={totalComplaints}
              description={`${pendingComplaints} pending • ${completedComplaints} completed`}
              icon={<MessageSquareWarning className="h-5 w-5" />}
              tone="amber"
            />

            <StatCard
              title="Service Requests"
              value={totalServiceRequests}
              description={`${pendingServiceRequests} pending • ${completedServiceRequests} completed`}
              icon={<ClipboardList className="h-5 w-5" />}
              tone="violet"
            />

            <StatCard
              title="Collected Revenue"
              value={formatBDT(totalPaidAmount)}
              description={`${paidPayments} successful payments`}
              icon={<WalletCards className="h-5 w-5" />}
              tone="green"
            />
          </section>

          {/* =================================================
              ATTENTION + USER DISTRIBUTION
          ================================================= */}

          <section className="grid gap-6 xl:grid-cols-3">
            {/* Attention Required */}

            <div className="xl:col-span-2 overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
              <div className="border-b border-border bg-gradient-to-r from-amber-50 via-background to-transparent px-5 py-5 dark:from-amber-500/10 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <AlertCircle className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Attention Required
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Items that may need administrative action
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                    {pendingComplaints +
                      pendingServiceRequests +
                      pendingPayments}{" "}
                    pending
                  </span>
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                <Link
                  href="/dashboard/admin-dashboard/complaints"
                  className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:shadow-md dark:hover:border-amber-500/30 dark:hover:bg-amber-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                      <MessageSquareWarning className="h-4 w-4" />
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-4 text-2xl font-bold text-foreground">
                    {pendingComplaints}
                  </p>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Pending complaints
                  </p>
                </Link>

                <Link
                  href="/dashboard/admin-dashboard/service-requests"
                  className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-md dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <ClipboardList className="h-4 w-4" />
                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-4 text-2xl font-bold text-foreground">
                    {pendingServiceRequests}
                  </p>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Pending service requests
                  </p>
                </Link>

                <Link
                  href="/dashboard/admin-dashboard/payments"
                  className="group rounded-xl border border-border bg-muted/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <CreditCard className="h-4 w-4" />
                    </div>

                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-4 text-2xl font-bold text-foreground">
                    {pendingPayments}
                  </p>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    Pending payments
                  </p>
                </Link>
              </div>
            </div>

            {/* User Distribution */}

            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
              <div className="border-b border-border bg-gradient-to-r from-blue-50 via-background to-transparent px-5 py-5 dark:from-blue-500/10 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-foreground">
                      User Distribution
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Platform users by role
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                {userDistribution.map((item, index) => {
                  const colors = [
                    "bg-blue-500",
                    "bg-violet-500",
                    "bg-emerald-500",
                  ];

                  return (
                    <div key={item.status}>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${colors[index]}`}
                          />

                          <span className="text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {item.percentage}%
                          </span>

                          <span className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-foreground">
                            {item.count}
                          </span>
                        </div>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${colors[index]}`}
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =================================================
              STATUS CHARTS
          ================================================= */}

          <section className="grid gap-6 lg:grid-cols-2">
            <StatusChart
              title="Complaint Status"
              description="Current complaint distribution"
              icon={<MessageSquareWarning className="h-5 w-5" />}
              data={analytics.complaints.byStatus}
            />

            <StatusChart
              title="Service Request Status"
              description="Current service request distribution"
              icon={<ClipboardList className="h-5 w-5" />}
              data={analytics.serviceRequests.byStatus}
            />
          </section>

          {/* =================================================
              PAYMENT + CATEGORIES
          ================================================= */}

          <section className="grid gap-6 xl:grid-cols-3">
            {/* Payment Overview */}

            <div className="xl:col-span-2 overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
              <div className="border-b border-border bg-gradient-to-r from-emerald-50 via-background to-transparent px-5 py-5 dark:from-emerald-500/10 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <WalletCards className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Payment Overview
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Payment activity and collection health
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard/admin-dashboard/payments"
                    className="hidden items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400 sm:flex"
                  >
                    View payments
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-border bg-muted/20 p-4">
                    <p className="text-xs text-muted-foreground">
                      Total Payments
                    </p>

                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {totalPayments}
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Paid
                    </p>

                    <p className="mt-2 text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {paidPayments}
                    </p>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
                    <p className="text-xs text-amber-700 dark:text-amber-400">
                      Pending
                    </p>

                    <p className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-400">
                      {pendingPayments}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      Collected
                    </p>

                    <p className="mt-2 text-lg font-bold text-emerald-700 dark:text-emerald-400">
                      {formatBDT(totalPaidAmount)}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Payment success rate
                    </span>

                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {paymentSuccessRate}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                      style={{
                        width: `${paymentSuccessRate}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}

            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
              <div className="border-b border-border bg-gradient-to-r from-violet-50 via-background to-transparent px-5 py-5 dark:from-violet-500/10 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                    <FolderTree className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-foreground">
                      Categories
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Available complaint categories
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">
                  {categories.length}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Categories currently available
                </p>

                <Link
                  href="/dashboard/admin-dashboard/categories"
                  className="mt-5 flex items-center justify-between rounded-xl border border-border bg-muted/20 px-4 py-3 text-xs font-semibold text-foreground transition-all hover:border-violet-300 hover:bg-violet-50 dark:hover:border-violet-500/30 dark:hover:bg-violet-500/5"
                >
                  Manage categories
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </section>

          {/* =================================================
              PERFORMANCE SUMMARY
          ================================================= */}

          <section className="grid gap-6 lg:grid-cols-2">
            {/* Complaint Performance */}

            <div className="rounded-2xl border border-border bg-background p-5 shadow-[0_5px_20px_rgba(15,23,42,0.07)] sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-foreground">
                    Complaint Performance
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Completion progress by complaint status
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {complaintCompletion}% complete
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {analytics.complaints.byStatus.length === 0 ? (
                  <EmptyState
                    title="No complaint status data"
                    description="Complaint performance data is not available yet."
                  />
                ) : (
                  analytics.complaints.byStatus.map((item) => {
                    const percentage =
                      totalComplaints > 0
                        ? Math.round((item.count / totalComplaints) * 100)
                        : 0;

                    return (
                      <ProgressRow
                        key={item.status}
                        label={formatStatus(item.status)}
                        count={item.count}
                        percentage={percentage}
                        status={item.status}
                      />
                    );
                  })
                )}
              </div>
            </div>

            {/* Service Request Performance */}

            <div className="rounded-2xl border border-border bg-background p-5 shadow-[0_5px_20px_rgba(15,23,42,0.07)] sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-foreground">
                    Service Request Performance
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Completion progress by request status
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  {serviceRequestCompletion}% complete
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {analytics.serviceRequests.byStatus.length === 0 ? (
                  <EmptyState
                    title="No service request data"
                    description="Service request performance data is not available yet."
                  />
                ) : (
                  analytics.serviceRequests.byStatus.map((item) => {
                    const percentage =
                      totalServiceRequests > 0
                        ? Math.round((item.count / totalServiceRequests) * 100)
                        : 0;

                    return (
                      <ProgressRow
                        key={item.status}
                        label={formatStatus(item.status)}
                        count={item.count}
                        percentage={percentage}
                        status={item.status}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              MONTHLY ACTIVITY
          ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_5px_20px_rgba(15,23,42,0.07)]">
            <div className="border-b border-border bg-gradient-to-r from-blue-50 via-background to-emerald-50 px-5 py-5 dark:from-blue-500/10 dark:to-emerald-500/10 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-foreground">
                      Monthly Activity
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Complaints and service requests over time
                    </p>
                  </div>
                </div>

                <span className="hidden rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
                  Activity report
                </span>
              </div>
            </div>

            {monthlyData.length === 0 ? (
              <div className="p-8">
                <EmptyState
                  title="No monthly data"
                  description="There is no monthly activity data available yet."
                />
              </div>
            ) : (
              <div className="p-5 sm:p-6">
                {/* Clear chart legend */}
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-blue-500" />

                    <span className="text-xs font-medium text-foreground">
                      Complaints
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-emerald-500" />

                    <span className="text-xs font-medium text-foreground">
                      Service Requests
                    </span>
                  </div>
                </div>

                <div className="h-[340px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 10,
                      }}
                      barGap={6}
                    >
                      <XAxis
                        dataKey="month"
                        tick={{
                          fontSize: 11,
                          fill: "#64748B",
                        }}
                        axisLine={{
                          stroke: "#CBD5E1",
                        }}
                        tickLine={false}
                      />

                      <YAxis
                        allowDecimals={false}
                        tick={{
                          fontSize: 11,
                          fill: "#64748B",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />

                      <Tooltip
                        cursor={{
                          fill: "rgba(148,163,184,0.08)",
                        }}
                        content={({ active, payload, label }) => {
                          if (!active || !payload || payload.length === 0) {
                            return null;
                          }

                          const complaints = Number(
                            payload.find(
                              (item) => item.dataKey === "complaints",
                            )?.value ?? 0,
                          );

                          const serviceRequests = Number(
                            payload.find(
                              (item) => item.dataKey === "serviceRequests",
                            )?.value ?? 0,
                          );

                          return (
                            <div className="min-w-[190px] rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900">
                              <p className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                                {String(label ?? "")}
                              </p>

                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-6">
                                  <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                                    <span className="text-xs text-slate-600 dark:text-slate-300">
                                      Complaints
                                    </span>
                                  </div>

                                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {complaints}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between gap-6">
                                  <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                    <span className="text-xs text-slate-600 dark:text-slate-300">
                                      Service Requests
                                    </span>
                                  </div>

                                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                                    {serviceRequests}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      />

                      <Bar
                        dataKey="complaints"
                        name="Complaints"
                        fill="#2563EB"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={22}
                      />

                      <Bar
                        dataKey="serviceRequests"
                        name="Service Requests"
                        fill="#10B981"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={22}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Bottom summary cards */}

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
                    <p className="text-xs text-blue-700 dark:text-blue-400">
                      Total Complaints
                    </p>

                    <p className="mt-2 text-2xl font-bold text-blue-700 dark:text-blue-400">
                      {totalComplaints}
                    </p>

                    <p className="mt-1 text-[11px] text-blue-600/70 dark:text-blue-400/70">
                      recorded in the report
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                    <p className="text-xs text-emerald-700 dark:text-emerald-400">
                      Service Requests
                    </p>

                    <p className="mt-2 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                      {totalServiceRequests}
                    </p>

                    <p className="mt-1 text-[11px] text-emerald-600/70 dark:text-emerald-400/70">
                      recorded in the report
                    </p>
                  </div>

                  <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-500/20 dark:bg-violet-500/5">
                    <p className="text-xs text-violet-700 dark:text-violet-400">
                      Paid Revenue
                    </p>

                    <p className="mt-2 text-xl font-bold text-violet-700 dark:text-violet-400">
                      {formatBDT(totalPaidAmount)}
                    </p>

                    <p className="mt-1 text-[11px] text-violet-600/70 dark:text-violet-400/70">
                      successful payment amount
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminDashboardPage;
