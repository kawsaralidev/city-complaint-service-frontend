"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  FileText,
  ImageIcon,
  MapPin,
  UserRound,
} from "lucide-react";

import RoleGuard from "../../../guard/role-guard";
import { useServiceRequestById } from "@/hooks/service-request.hook";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return {
        wrapper: "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500",
      };

    case "APPROVED":
      return {
        wrapper: "border-blue-200 bg-blue-50 text-blue-700",
        dot: "bg-blue-500",
      };

    case "PAYMENT_PENDING":
      return {
        wrapper: "border-orange-200 bg-orange-50 text-orange-700",
        dot: "bg-orange-500",
      };

    case "CONFIRMED":
      return {
        wrapper: "border-cyan-200 bg-cyan-50 text-cyan-700",
        dot: "bg-cyan-500",
      };

    case "ASSIGNED":
      return {
        wrapper: "border-violet-200 bg-violet-50 text-violet-700",
        dot: "bg-violet-500",
      };

    case "IN_PROGRESS":
      return {
        wrapper: "border-indigo-200 bg-indigo-50 text-indigo-700",
        dot: "bg-indigo-500",
      };

    case "COMPLETED":
      return {
        wrapper: "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      };

    case "REJECTED":
      return {
        wrapper: "border-red-200 bg-red-50 text-red-700",
        dot: "bg-red-500",
      };

    case "CANCELED":
      return {
        wrapper: "border-slate-200 bg-slate-50 text-slate-700",
        dot: "bg-slate-500",
      };

    default:
      return {
        wrapper: "border-slate-200 bg-slate-50 text-slate-700",
        dot: "bg-slate-500",
      };
  }
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getPaymentStatusStyle = (status?: string) => {
  switch (status) {
    case "PAID":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "PENDING":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "FAILED":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
};

const ServiceRequestDetailsPage = () => {
  const params = useParams();

  const requestId =
    typeof params.requestId === "string" ? params.requestId : "";

  const {
    data: request,
    isLoading,
    isError,
  } = useServiceRequestById(requestId);

  return (
    <RoleGuard requiredRole="CITIZEN">
      <main className="min-h-screen bg-muted/20">
        <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          {/* =========================================================
              BACK NAVIGATION
          ========================================================== */}
          <Link
            href="/dashboard/citizen-dashboard/service-request"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Requests
          </Link>

          {/* =========================================================
              LOADING
          ========================================================== */}
          {isLoading && (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                <div className="space-y-4 p-6 sm:p-8">
                  <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-72 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="h-64 animate-pulse rounded-2xl bg-muted lg:col-span-2" />
                <div className="h-64 animate-pulse rounded-2xl bg-muted" />
              </div>

              <div className="h-72 animate-pulse rounded-2xl bg-muted" />
            </div>
          )}

          {/* =========================================================
              ERROR
          ========================================================== */}
          {isError && (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-red-200 bg-red-50 p-8">
              <div className="max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <FileText className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-red-800">
                  Unable to load service request
                </h2>

                <p className="mt-2 text-sm leading-6 text-red-600">
                  Something went wrong while loading this service request.
                  Please try again later.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================
              SERVICE REQUEST DETAILS
          ========================================================== */}
          {!isLoading && !isError && request && (
            <div className="space-y-6">
              {/* =====================================================
                  HERO
              ====================================================== */}
              <section className="relative overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
                {/* Decorative background */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

                <div className="relative p-6 sm:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <ClipboardList className="h-4 w-4" />
                        Service Request
                      </div>

                      <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {request.service.name}
                      </h1>

                      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                        Track your service request, payment status, and
                        processing progress from one place.
                      </p>
                    </div>

                    {/* Current Status */}
                    <div
                      className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold ${
                        getStatusStyle(request.status).wrapper
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          getStatusStyle(request.status).dot
                        }`}
                      />

                      {formatStatus(request.status)}
                    </div>
                  </div>

                  {/* Quick information */}
                  <div className="mt-7 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                    <div className="rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        Submitted
                      </div>

                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>

                      <p className="mt-2 truncate text-sm font-semibold text-foreground">
                        {request.location}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-primary/5 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Service Fee
                      </div>

                      <p className="mt-2 text-lg font-bold text-primary">
                        ৳{request.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  MAIN CONTENT
              ====================================================== */}
              <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                {/* LEFT */}
                <div className="space-y-6">
                  {/* Service Information */}
                  <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                    <div className="border-b border-border px-5 py-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <ClipboardList className="h-5 w-5" />
                        </div>

                        <div>
                          <h2 className="font-semibold text-foreground">
                            Service Information
                          </h2>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Information about the requested service
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                      <div className="rounded-xl bg-muted/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          Service
                        </p>

                        <p className="mt-2 font-semibold text-foreground">
                          {request.service.name}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          Service Fee
                        </p>

                        <p className="mt-2 font-semibold text-foreground">
                          ৳{request.amount}
                        </p>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-4 sm:col-span-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Service Description
                        </p>

                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {request.service.description ||
                            "No service description available."}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Request Information */}
                  <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                    <div className="border-b border-border px-5 py-5 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div>
                          <h2 className="font-semibold text-foreground">
                            Request Information
                          </h2>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Details submitted with your service request
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 p-5 sm:p-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl bg-muted/30 p-4">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            Location
                          </div>

                          <p className="mt-2 font-semibold text-foreground">
                            {request.location}
                          </p>
                        </div>

                        <div className="rounded-xl bg-muted/30 p-4">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            Submitted
                          </div>

                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {formatDate(request.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-muted/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          Description
                        </p>

                        <p className="mt-2 text-sm leading-7 text-foreground">
                          {request.description ||
                            "No additional description provided."}
                        </p>
                      </div>

                      {/* Uploaded Image */}
                      {request.imageUrl && (
                        <div>
                          <div className="mb-3 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />

                            <p className="text-sm font-semibold text-foreground">
                              Uploaded Image
                            </p>
                          </div>

                          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
                            <Image
                              src={request.imageUrl}
                              alt={request.service.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 700px"
                              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                {/* RIGHT */}
                <div className="space-y-6">
                  {/* Payment Information */}
                  <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                    <div className="border-b border-border px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <CreditCard className="h-5 w-5" />
                        </div>

                        <div>
                          <h2 className="font-semibold text-foreground">
                            Payment
                          </h2>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Current payment information
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/30 p-4">
                        <span className="text-sm text-muted-foreground">
                          Status
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getPaymentStatusStyle(
                            request.payment?.status,
                          )}`}
                        >
                          {request.payment?.status
                            ? formatStatus(request.payment.status)
                            : "Not Paid"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/30 p-4">
                        <span className="text-sm text-muted-foreground">
                          Amount
                        </span>

                        <span className="font-semibold text-foreground">
                          ৳{request.payment?.amount || request.amount}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/30 p-4">
                        <span className="text-sm text-muted-foreground">
                          Currency
                        </span>

                        <span className="font-semibold text-foreground">
                          {request.payment?.currency || "BDT"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/30 p-4">
                        <span className="text-sm text-muted-foreground">
                          Paid At
                        </span>

                        <span className="text-right text-sm font-semibold text-foreground">
                          {formatDate(request.payment?.paidAt)}
                        </span>
                      </div>

                      {/* Payment Action Note */}
                      {(request.status === "APPROVED" ||
                        request.status === "PAYMENT_PENDING") &&
                        request.payment?.status !== "PAID" && (
                          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                            <p className="text-sm font-semibold text-blue-800">
                              Payment available
                            </p>

                            <p className="mt-1 text-xs leading-5 text-blue-700">
                              You can complete your payment from the My Service
                              Requests page.
                            </p>
                          </div>
                        )}

                      {request.payment?.status === "PAID" && (
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                            <div>
                              <p className="text-sm font-semibold text-emerald-800">
                                Payment completed
                              </p>

                              <p className="mt-1 text-xs leading-5 text-emerald-700">
                                Your payment has been successfully confirmed.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Assignment Information */}
                  {request.assignment && (
                    <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                      <div className="border-b border-border px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <UserRound className="h-5 w-5" />
                          </div>

                          <div>
                            <h2 className="font-semibold text-foreground">
                              Assignment
                            </h2>

                            <p className="mt-1 text-xs text-muted-foreground">
                              Service officer assignment
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="rounded-xl bg-muted/30 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            Officer
                          </p>

                          <p className="mt-2 text-sm font-semibold text-foreground">
                            Assigned Officer
                          </p>
                        </div>

                        <div className="rounded-xl bg-muted/30 p-4">
                          <p className="text-xs font-medium text-muted-foreground">
                            Assigned At
                          </p>

                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {formatDate(request.assignment.assignedAt)}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* =====================================================
                  TIMELINE
              ====================================================== */}
              <section className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                <div className="border-b border-border px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="font-semibold text-foreground">
                        Request Timeline
                      </h2>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Track the progress of your service request
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="relative space-y-7">
                    {/* Vertical line */}
                    <div className="absolute bottom-4 left-[7px] top-4 w-px bg-border" />

                    {/* Submitted */}
                    <div className="relative flex gap-4">
                      <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500 ring-4 ring-blue-50" />

                      <div>
                        <p className="font-semibold text-foreground">
                          Request Submitted
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Approved / Payment Pending */}
                    {(request.status === "APPROVED" ||
                      request.status === "PAYMENT_PENDING" ||
                      request.confirmedAt) && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500 ring-4 ring-orange-50" />

                        <div>
                          <p className="font-semibold text-foreground">
                            Payment Stage
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {request.payment?.status === "PAID"
                              ? "Payment completed successfully."
                              : "Your request is ready for payment."}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Confirmed */}
                    {request.confirmedAt && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500 ring-4 ring-cyan-50" />

                        <div>
                          <p className="font-semibold text-foreground">
                            Payment Confirmed
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatDate(request.confirmedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Assigned */}
                    {request.assignedAt && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-500 ring-4 ring-violet-50" />

                        <div>
                          <p className="font-semibold text-foreground">
                            Officer Assigned
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatDate(request.assignedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Completed */}
                    {request.completedAt && (
                      <div className="relative flex gap-4">
                        <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-emerald-50">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>

                        <div>
                          <p className="font-semibold text-foreground">
                            Request Completed
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatDate(request.completedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Current stage when nothing after submission */}
                    {!request.confirmedAt &&
                      !request.assignedAt &&
                      !request.completedAt && (
                        <div className="relative flex gap-4">
                          <div className="relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-primary/10" />

                          <div>
                            <p className="font-semibold text-foreground">
                              Current Status
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              Your request is currently{" "}
                              <span className="font-medium text-foreground">
                                {formatStatus(request.status)}
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* =========================================================
              NOT FOUND
          ========================================================== */}
          {!isLoading && !isError && !request && (
            <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-border bg-background p-8 text-center shadow-sm">
              <div className="max-w-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <ClipboardList className="h-7 w-7" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-foreground">
                  Service request not found
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The service request may have been removed or does not exist.
                </p>

                <Link
                  href="/dashboard/citizen-dashboard/service-request"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to My Requests
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </RoleGuard>
  );
};

export default ServiceRequestDetailsPage;
