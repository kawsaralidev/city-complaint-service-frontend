"use client";

import { useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  Download,
  FileText,
  MessageSquareWarning,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import RoleGuard from "@/app/dashboard/guard/role-guard";

import {
  useAdminDashboardAnalytics,
  useAdminDashboardOverview,
} from "@/hooks/dashboard.hook";

import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

/* =========================================================
   TYPES
========================================================= */

type ReportType = "overview" | "complaints" | "serviceRequests" | "payments";

interface StatusItem {
  status: string;
  count: number;
}

interface MonthlyItem {
  month: string;
  complaints: number;
  serviceRequests: number;
  paidAmount: string;
}

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

const getStatusColor = (status: string) => {
  const normalizedStatus = status.toUpperCase();

  switch (normalizedStatus) {
    case "COMPLETED":
    case "RESOLVED":
      return "hsl(158 64% 42%)";

    case "PENDING":
    case "PAYMENT_PENDING":
      return "hsl(38 92% 55%)";

    case "APPROVED":
    case "CONFIRMED":
      return "hsl(215 70% 50%)";

    case "ASSIGNED":
      return "hsl(190 75% 42%)";

    case "IN_PROGRESS":
      return "hsl(262 70% 58%)";

    case "FAILED":
    case "REJECTED":
    case "CANCELLED":
      return "hsl(0 72% 55%)";

    default:
      return "hsl(215 16% 47%)";
  }
};

/* =========================================================
   REPORT TABS
========================================================= */

const reportTabs: {
  value: ReportType;
  label: string;
  icon: typeof FileText;
}[] = [
  {
    value: "overview",
    label: "Overview",
    icon: FileText,
  },
  {
    value: "complaints",
    label: "Complaints",
    icon: MessageSquareWarning,
  },
  {
    value: "serviceRequests",
    label: "Service Requests",
    icon: ClipboardList,
  },
  {
    value: "payments",
    label: "Payments",
    icon: CreditCard,
  },
];

/* =========================================================
   TOOLTIP
========================================================= */

const chartTooltipStyle = {
  borderRadius: "12px",
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--background))",
  color: "hsl(var(--foreground))",
  boxShadow: "0 8px 24px rgba(128,128,128,0.12)",
};

/* =========================================================
   LOADING
========================================================= */

const ReportsSkeleton = () => {
  return (
    <div className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}

        <section className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <Skeleton className="h-7 w-32 rounded-full" />

          <Skeleton className="mt-4 h-10 w-72" />

          <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
        </section>

        {/* Tabs */}

        <section className="rounded-2xl border border-border bg-background p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-32 rounded-xl" />
            ))}
          </div>
        </section>

        {/* Summary */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <Skeleton className="h-4 w-28" />
              <Skeleton className="mt-4 h-9 w-24" />
              <Skeleton className="mt-4 h-3 w-40" />
            </div>
          ))}
        </section>

        {/* Charts */}

        <section className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            >
              <Skeleton className="h-6 w-44" />

              <Skeleton className="mt-2 h-4 w-60" />

              <Skeleton className="mt-7 h-[300px] w-full rounded-xl" />
            </div>
          ))}
        </section>

        {/* Details */}

        <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <Skeleton className="h-6 w-44" />

          <Skeleton className="mt-2 h-4 w-64" />

          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

/* =========================================================
   STATUS DONUT
========================================================= */

const StatusDonut = ({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: StatusItem[];
}) => {
  const chartData = data.map((item) => ({
    name: formatStatus(item.status),
    value: item.count,
    status: item.status,
  }));

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-foreground">{title}</h2>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No report data"
            description="There is no status data available for this report."
          />
        </div>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={72}
                  outerRadius={108}
                  paddingAngle={3}
                  strokeWidth={2}
                >
                  {chartData.map((item) => (
                    <Cell
                      key={item.status}
                      fill={getStatusColor(item.status)}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [value ?? 0, "Count"]}
                  contentStyle={chartTooltipStyle}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {chartData.map((item) => (
              <div
                key={item.status}
                className="flex items-center justify-between rounded-xl border border-border bg-muted/20 px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: getStatusColor(item.status),
                    }}
                  />

                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>

                <span className="text-sm font-bold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   REPORT SUMMARY CARD
========================================================= */

const ReportMetric = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: typeof Users;
  iconClassName: string;
}) => {
  return (
    <div className="group rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

/* =========================================================
   MONTHLY ACTIVITY CHART
========================================================= */

const ActivityTrend = ({
  data,
  type,
}: {
  data: MonthlyItem[];
  type: "overview" | "complaints" | "serviceRequests";
}) => {
  const title =
    type === "complaints"
      ? "Complaint Trend"
      : type === "serviceRequests"
        ? "Service Request Trend"
        : "Platform Activity Trend";

  const description =
    type === "complaints"
      ? "Monthly complaint activity"
      : type === "serviceRequests"
        ? "Monthly service request activity"
        : "Monthly complaints and service requests";

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-primary/10 via-secondary/5 to-transparent px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <TrendingUp className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-foreground">{title}</h2>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No trend data"
            description="There is no monthly activity data available."
          />
        </div>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                <Tooltip contentStyle={chartTooltipStyle} />

                {type === "overview" && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      name="Complaints"
                      stroke="hsl(262 70% 58%)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="serviceRequests"
                      name="Service Requests"
                      stroke="hsl(215 70% 50%)"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </>
                )}

                {type === "complaints" && (
                  <Line
                    type="monotone"
                    dataKey="complaints"
                    name="Complaints"
                    stroke="hsl(262 70% 58%)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}

                {type === "serviceRequests" && (
                  <Line
                    type="monotone"
                    dataKey="serviceRequests"
                    name="Service Requests"
                    stroke="hsl(215 70% 50%)"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}

                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   PAYMENT TREND
========================================================= */

const PaymentTrend = ({ data }: { data: MonthlyItem[] }) => {
  const chartData = data.map((item) => ({
    month: item.month,
    revenue: Number(item.paidAmount) || 0,
  }));

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border bg-gradient-to-r from-secondary/10 via-primary/5 to-transparent px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <WalletCards className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-foreground">Revenue Trend</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Monthly collected payment amount
            </p>
          </div>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No payment trend"
            description="There is no monthly payment data available."
          />
        </div>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  tick={{
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  formatter={(value) => [formatBDT(value as number), "Revenue"]}
                  contentStyle={chartTooltipStyle}
                />

                <Bar
                  dataKey="revenue"
                  name="Revenue"
                  fill="hsl(158 64% 42%)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </section>
  );
};

/* =========================================================
   STATUS DETAILS
========================================================= */

const StatusDetails = ({
  title,
  description,
  data,
  total,
}: {
  title: string;
  description: string;
  data: StatusItem[];
  total: number;
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border px-5 py-5 sm:px-6">
        <h2 className="font-semibold text-foreground">{title}</h2>

        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>

      {data.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No details available"
            description="There is no status information available."
          />
        </div>
      ) : (
        <div className="divide-y divide-border">
          {data.map((item) => {
            const percentage =
              total > 0 ? Math.round((item.count / total) * 100) : 0;

            const color = getStatusColor(item.status);

            return (
              <div key={item.status} className="px-5 py-4 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: color,
                      }}
                    />

                    <span className="text-sm font-medium text-foreground">
                      {formatStatus(item.status)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-bold text-foreground">
                      {item.count}
                    </span>

                    <span className="ml-2 text-xs text-muted-foreground">
                      {percentage}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

/* =========================================================
   MAIN PAGE
========================================================= */

const AdminReportsPage = () => {
  const [reportType, setReportType] = useState<ReportType>("overview");

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

  const isLoading = overviewLoading || analyticsLoading;

  const isError = overviewError || analyticsError;

  const monthlyData = useMemo<MonthlyItem[]>(
    () =>
      analytics?.monthly.map((item) => ({
        month: item.month,
        complaints: item.complaints,
        serviceRequests: item.serviceRequests,
        paidAmount: item.paidAmount,
      })) ?? [],
    [analytics],
  );

  if (isLoading) {
    return (
      <RoleGuard requiredRole="ADMIN" loadingFallback={<ReportsSkeleton />}>
        <ReportsSkeleton />
      </RoleGuard>
    );
  }

  if (isError || !overview || !analytics) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/20 px-4">
          <div className="w-full max-w-md rounded-2xl border border-destructive/20 bg-background p-7 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <FileText className="h-6 w-6" />
            </div>

            <h1 className="mt-4 text-xl font-bold text-foreground">
              Unable to load reports
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Something went wrong while loading the report data. Please refresh
              the page and try again.
            </p>
          </div>
        </div>
      </RoleGuard>
    );
  }

  /* =======================================================
     DERIVED VALUES
  ======================================================= */

  const totalUsers = overview.users.total;

  const totalComplaints = overview.complaints.total;

  const completedComplaints = overview.complaints.completed;

  const totalServiceRequests = overview.serviceRequests.total;

  const completedServiceRequests = overview.serviceRequests.completed;

  const totalPayments = overview.payments.total;

  const paidPayments = overview.payments.paid;

  const pendingPayments = overview.payments.pending;

  const failedPayments = overview.payments.failed;

  const totalRevenue = Number(overview.payments.totalPaidAmount);

  const complaintCompletion =
    totalComplaints > 0
      ? Math.round((completedComplaints / totalComplaints) * 100)
      : 0;

  const serviceRequestCompletion =
    totalServiceRequests > 0
      ? Math.round((completedServiceRequests / totalServiceRequests) * 100)
      : 0;

  /* =======================================================
     PRINT
  ======================================================= */

  const handlePrint = () => {
    window.print();
  };

  /* =======================================================
     CURRENT REPORT LABEL
  ======================================================= */

  const currentReportLabel =
    reportType === "overview"
      ? "Platform Overview"
      : reportType === "complaints"
        ? "Complaint Report"
        : reportType === "serviceRequests"
          ? "Service Request Report"
          : "Payment Report";

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="min-h-full bg-muted/20">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* =================================================
              HEADER
          ================================================= */}

          <section className="relative overflow-hidden rounded-3xl border border-secondary/20 bg-gradient-to-br p-6 shadow-sm sm:p-8">
            <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                  Admin Reports
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {currentReportLabel}
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Analyse platform activity, operational performance and payment
                  information using real system data.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md print:hidden"
              >
                <Download className="h-4 w-4" />
                Print / Save Report
              </button>
            </div>
          </section>

          {/* =================================================
              REPORT TYPE SELECTOR
          ================================================= */}

          <section className="rounded-2xl border border-border bg-background p-3 shadow-sm print:hidden">
            <div className="flex flex-wrap gap-2">
              {reportTabs.map((tab) => {
                const Icon = tab.icon;

                const isActive = reportType === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setReportType(tab.value)}
                    className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    {tab.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* =================================================
              OVERVIEW REPORT
          ================================================= */}

          {reportType === "overview" && (
            <>
              {/* Summary */}

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ReportMetric
                  title="Total Users"
                  value={totalUsers}
                  description="All registered platform users"
                  icon={Users}
                  iconClassName="bg-primary/10 text-primary"
                />

                <ReportMetric
                  title="Total Complaints"
                  value={totalComplaints}
                  description={`${complaintCompletion}% completed`}
                  icon={MessageSquareWarning}
                  iconClassName="bg-accent/10 text-accent-foreground"
                />

                <ReportMetric
                  title="Service Requests"
                  value={totalServiceRequests}
                  description={`${serviceRequestCompletion}% completed`}
                  icon={ClipboardList}
                  iconClassName="bg-secondary/10 text-secondary"
                />

                <ReportMetric
                  title="Collected Revenue"
                  value={formatBDT(totalRevenue)}
                  description={`${paidPayments} successful payments`}
                  icon={WalletCards}
                  iconClassName="bg-secondary/10 text-secondary"
                />
              </section>

              {/* Trends */}

              <ActivityTrend data={monthlyData} type="overview" />

              {/* Status reports */}

              <section className="grid gap-6 lg:grid-cols-2">
                <StatusDonut
                  title="Complaint Distribution"
                  description="How complaints are distributed by status"
                  data={analytics.complaints.byStatus}
                />

                <StatusDonut
                  title="Service Request Distribution"
                  description="How service requests are distributed by status"
                  data={analytics.serviceRequests.byStatus}
                />
              </section>

              {/* Performance */}

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Complaint Performance
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Completion performance
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-bold text-foreground">
                          {complaintCompletion}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          completion rate
                        </p>
                      </div>

                      <p className="text-sm font-semibold text-secondary">
                        {completedComplaints} / {totalComplaints}
                      </p>
                    </div>

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{
                          width: `${complaintCompletion}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Payment Performance
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Current payment results
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                      <p className="text-xs text-muted-foreground">Paid</p>

                      <p className="mt-2 text-2xl font-bold text-secondary">
                        {paidPayments}
                      </p>
                    </div>

                    <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                      <p className="text-xs text-muted-foreground">Pending</p>

                      <p className="mt-2 text-2xl font-bold text-accent-foreground">
                        {pendingPayments}
                      </p>
                    </div>

                    <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                      <p className="text-xs text-muted-foreground">Failed</p>

                      <p className="mt-2 text-2xl font-bold text-destructive">
                        {failedPayments}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-secondary/20 bg-secondary/5 p-4">
                    <p className="text-xs text-muted-foreground">
                      Total collected
                    </p>

                    <p className="mt-1 text-2xl font-bold text-secondary">
                      {formatBDT(totalRevenue)}
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =================================================
              COMPLAINT REPORT
          ================================================= */}

          {reportType === "complaints" && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ReportMetric
                  title="Total Complaints"
                  value={totalComplaints}
                  description="All recorded complaints"
                  icon={MessageSquareWarning}
                  iconClassName="bg-primary/10 text-primary"
                />

                <ReportMetric
                  title="Completed"
                  value={completedComplaints}
                  description={`${complaintCompletion}% completion rate`}
                  icon={CheckCircle2}
                  iconClassName="bg-secondary/10 text-secondary"
                />

                <ReportMetric
                  title="Pending"
                  value={overview.complaints.pending}
                  description="Complaints awaiting action"
                  icon={TrendingUp}
                  iconClassName="bg-accent/10 text-accent-foreground"
                />

                <ReportMetric
                  title="Assigned"
                  value={overview.complaints.assigned}
                  description="Complaints assigned to officers"
                  icon={Users}
                  iconClassName="bg-primary/10 text-primary"
                />
              </section>

              <ActivityTrend data={monthlyData} type="complaints" />

              <section className="grid gap-6 lg:grid-cols-2">
                <StatusDonut
                  title="Complaint Status"
                  description="Complaint distribution by current status"
                  data={analytics.complaints.byStatus}
                />

                <StatusDetails
                  title="Complaint Status Details"
                  description="Detailed complaint status breakdown"
                  data={analytics.complaints.byStatus}
                  total={totalComplaints}
                />
              </section>
            </>
          )}

          {/* =================================================
              SERVICE REQUEST REPORT
          ================================================= */}

          {reportType === "serviceRequests" && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ReportMetric
                  title="Total Requests"
                  value={totalServiceRequests}
                  description="All service requests"
                  icon={ClipboardList}
                  iconClassName="bg-primary/10 text-primary"
                />

                <ReportMetric
                  title="Completed"
                  value={completedServiceRequests}
                  description={`${serviceRequestCompletion}% completion rate`}
                  icon={CheckCircle2}
                  iconClassName="bg-secondary/10 text-secondary"
                />

                <ReportMetric
                  title="Pending"
                  value={overview.serviceRequests.pending}
                  description="Requests awaiting action"
                  icon={TrendingUp}
                  iconClassName="bg-accent/10 text-accent-foreground"
                />

                <ReportMetric
                  title="Assigned"
                  value={overview.serviceRequests.assigned}
                  description="Requests assigned to officers"
                  icon={Users}
                  iconClassName="bg-primary/10 text-primary"
                />
              </section>

              <ActivityTrend data={monthlyData} type="serviceRequests" />

              <section className="grid gap-6 lg:grid-cols-2">
                <StatusDonut
                  title="Service Request Status"
                  description="Request distribution by current status"
                  data={analytics.serviceRequests.byStatus}
                />

                <StatusDetails
                  title="Service Request Details"
                  description="Detailed request status breakdown"
                  data={analytics.serviceRequests.byStatus}
                  total={totalServiceRequests}
                />
              </section>
            </>
          )}

          {/* =================================================
              PAYMENT REPORT
          ================================================= */}

          {reportType === "payments" && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <ReportMetric
                  title="Total Payments"
                  value={totalPayments}
                  description="All recorded transactions"
                  icon={CreditCard}
                  iconClassName="bg-primary/10 text-primary"
                />

                <ReportMetric
                  title="Successful"
                  value={paidPayments}
                  description="Successfully completed payments"
                  icon={CheckCircle2}
                  iconClassName="bg-secondary/10 text-secondary"
                />

                <ReportMetric
                  title="Pending"
                  value={pendingPayments}
                  description="Payments awaiting completion"
                  icon={WalletCards}
                  iconClassName="bg-accent/10 text-accent-foreground"
                />

                <ReportMetric
                  title="Collected Revenue"
                  value={formatBDT(totalRevenue)}
                  description="Total successful payment amount"
                  icon={CreditCard}
                  iconClassName="bg-secondary/10 text-secondary"
                />
              </section>

              <PaymentTrend data={monthlyData} />

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <WalletCards className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Payment Summary
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Current transaction performance
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-5">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Successful payments
                        </span>

                        <span className="text-sm font-semibold text-foreground">
                          {paidPayments}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{
                            width: `${
                              totalPayments > 0
                                ? (paidPayments / totalPayments) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Pending payments
                        </span>

                        <span className="text-sm font-semibold text-foreground">
                          {pendingPayments}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{
                            width: `${
                              totalPayments > 0
                                ? (pendingPayments / totalPayments) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Failed payments
                        </span>

                        <span className="text-sm font-semibold text-foreground">
                          {failedPayments}
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-destructive"
                          style={{
                            width: `${
                              totalPayments > 0
                                ? (failedPayments / totalPayments) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-6 shadow-sm">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Collected Revenue
                      </p>

                      <p className="mt-4 text-4xl font-bold tracking-tight text-secondary">
                        {formatBDT(totalRevenue)}
                      </p>

                      <p className="mt-3 text-sm text-muted-foreground">
                        Revenue generated from successful payments recorded by
                        the platform.
                      </p>
                    </div>

                    <div className="mt-8 rounded-xl border border-secondary/20 bg-background/70 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Successful transactions
                        </span>

                        <span className="text-lg font-bold text-secondary">
                          {paidPayments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminReportsPage;
