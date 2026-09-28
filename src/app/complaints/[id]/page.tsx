"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImageIcon,
  MapPin,
  UserRound,
} from "lucide-react";

import { useComplaint } from "@/hooks/complaint.hook";

import type { ComplaintStatus } from "@/types/complaint";

// Get status badge style
const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "PENDING":
      return "border-[#fdba2d]/30 bg-[#fdba2d]/10 text-[#b77900]";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "ASSIGNED":
      return "border-indigo-200 bg-indigo-50 text-indigo-600";

    case "IN_PROGRESS":
      return "border-primary/20 bg-primary/10 text-primary";

    case "COMPLETED":
      return "border-[#08a85b]/20 bg-[#08a85b]/10 text-[#07834a]";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-600";

    case "CANCELED":
      return "border-gray-200 bg-gray-100 text-gray-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

// Get status icon
const getStatusIcon = (status: ComplaintStatus) => {
  switch (status) {
    case "COMPLETED":
      return <CheckCircle2 className="h-4 w-4" />;

    default:
      return <ClipboardList className="h-4 w-4" />;
  }
};

// Format complaint status
const formatStatus = (status: ComplaintStatus) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// Format date
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const ComplaintDetailsPage = () => {
  const params = useParams();

  const complaintId = params.id as string;

  const {
    data: complaintResponse,
    isLoading,
    error,
  } = useComplaint(complaintId);

  const complaint = complaintResponse?.data;

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50/70">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero skeleton */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <div className="h-5 w-32 animate-pulse rounded-full bg-muted" />

            <div className="mt-5 h-10 w-3/4 animate-pulse rounded-lg bg-muted" />

            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-muted" />

            <div className="mt-7 flex gap-3">
              <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
              <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="h-6 w-48 animate-pulse rounded bg-muted" />

                <div className="mt-6 space-y-4">
                  <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
                  <div className="h-16 w-full animate-pulse rounded-xl bg-muted" />
                  <div className="h-16 w-full animate-pulse rounded-xl bg-muted" />
                </div>
              </div>

              <div className="h-72 animate-pulse rounded-3xl border border-border bg-muted" />
            </div>

            <div className="space-y-6">
              <div className="h-56 animate-pulse rounded-3xl border border-border bg-muted" />
              <div className="h-44 animate-pulse rounded-3xl border border-border bg-muted" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !complaint) {
    return (
      <main className="min-h-screen bg-slate-50/70">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-12 sm:px-6">
          <div className="w-full rounded-3xl border border-red-200 bg-card p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <FileText className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground">
              Complaint Not Found
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              We could not load this complaint. It may no longer be available or
              you may not have access to it.
            </p>

            <Link
              href="/dashboard/citizen-dashboard/complaints"
              className="group mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to My Complaints
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-1 lg:py-10">
        {/* Back Navigation */}
        <Link
          href="/dashboard/citizen-dashboard/complaints"
          className="group mb-5 inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to My Complaints
        </Link>

        {/* Hero Section */}
        <section className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
          {/* Decorative gradients */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative p-6 md:p-8 lg:p-9">
            {/* Top label */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3.5 py-2 text-xs font-semibold text-primary">
                <ClipboardList className="h-4 w-4" />
                Complaint Details
              </div>

              {/* Status */}
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold shadow-sm ${getStatusStyle(
                  complaint.status,
                )}`}
              >
                {getStatusIcon(complaint.status)}
                {formatStatus(complaint.status)}
              </div>
            </div>

            {/* Title */}
            <div className="mt-7 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[42px] lg:leading-tight">
                {complaint.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
                View the complete information and current progress of your
                submitted city complaint.
              </p>
            </div>

            {/* Metadata */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary">
                <CalendarDays className="h-4 w-4 text-primary" />
                Submitted {formatDate(complaint.createdAt)}
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:text-primary">
                <MapPin className="h-4 w-4 text-primary" />
                {complaint.location}
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/30 hover:text-secondary">
                <ClipboardList className="h-4 w-4 text-secondary" />
                {complaint.category?.name ?? "Uncategorized"}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Complaint Image */}
            {complaint.imageUrl && (
              <section className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <div className="p-6 pb-4 md:p-7 md:pb-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                      <ImageIcon className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-foreground">
                        Complaint Image
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Photo attached to this complaint.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mx-6 mb-6 overflow-hidden rounded-2xl border border-border bg-muted/20 md:mx-7 md:mb-7">
                  <img
                    src={complaint.imageUrl}
                    alt={complaint.title}
                    className="max-h-[520px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </section>
            )}

            {/* Complaint Information */}
            <section className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Complaint Information
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Details provided when this complaint was submitted.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-6">
                {/* Description */}
                <div className="rounded-2xl border border-border bg-muted/20 p-5 transition-colors duration-200 hover:border-primary/15 hover:bg-primary/[0.02]">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Description
                  </p>

                  <p className="mt-3 text-sm leading-7 text-foreground">
                    {complaint.description}
                  </p>
                </div>

                {/* Location + Category */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <MapPin className="h-4 w-4" />
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Location
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-foreground">
                      {complaint.location}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/20 hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <ClipboardList className="h-4 w-4" />
                      </div>

                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Category
                      </p>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-foreground">
                      {complaint.category?.name ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Timeline */}
            <section className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Timeline
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Important complaint dates.
                  </p>
                </div>
              </div>

              <div className="relative mt-7 space-y-6 pl-1">
                {/* Submitted */}
                <div className="relative flex gap-4">
                  <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>

                  <div className="pt-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Submitted
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatDate(complaint.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                <div className="absolute left-[16px] top-8 h-12 w-px bg-border" />

                {/* Updated */}
                <div className="relative flex gap-4">
                  <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-card bg-secondary text-secondary-foreground shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </div>

                  <div className="pt-0.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {formatDate(complaint.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Submitted By */}
            <section className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-foreground">
                    Submitted By
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Complaint owner information.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-muted/20 p-4 transition-colors duration-200 group-hover:border-primary/15">
                <p className="truncate text-sm font-semibold text-foreground">
                  {complaint.citizen?.name ?? "N/A"}
                </p>

                <p className="mt-1 break-all text-xs leading-5 text-muted-foreground">
                  {complaint.citizen?.email ?? "N/A"}
                </p>
              </div>
            </section>

            {/* Assignment */}
            {complaint.assignment && (
              <section className="group rounded-3xl border border-secondary/15 bg-secondary/[0.03] p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/25 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      Assignment
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Complaint processing status.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-secondary/15 bg-background/80 p-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Your complaint has been assigned for further processing.
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComplaintDetailsPage;
