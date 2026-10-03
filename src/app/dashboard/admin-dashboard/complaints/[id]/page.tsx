"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImageIcon,
  Loader2,
  MapPin,
  UserPlus,
  UserRound,
  XCircle,
} from "lucide-react";

import {
  useActiveOfficers,
  useAssignComplaint,
  useComplaint,
  useUpdateComplaintAdminStatus,
} from "@/hooks/complaint.hook";

import type { ComplaintStatus } from "@/types/complaint";

// --------------------------------------------------
// Status Style
// --------------------------------------------------

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

// --------------------------------------------------
// Format Status
// --------------------------------------------------

const formatStatus = (status: ComplaintStatus) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// --------------------------------------------------
// Format Date
// --------------------------------------------------

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

// --------------------------------------------------
// Page
// --------------------------------------------------

const ComplaintDetailsPage = () => {
  const params = useParams();

  const complaintId = params.id as string;

  // --------------------------------------------------
  // Complaint
  // --------------------------------------------------

  const {
    data: complaintResponse,
    isLoading,
    error,
  } = useComplaint(complaintId);

  const complaint = complaintResponse?.data;

  // --------------------------------------------------
  // Officers
  // --------------------------------------------------

  const { data: officersResponse, isLoading: officersLoading } =
    useActiveOfficers();

  const officers = officersResponse?.data ?? [];

  // --------------------------------------------------
  // Mutations
  // --------------------------------------------------

  const updateAdminStatusMutation = useUpdateComplaintAdminStatus();

  const assignComplaintMutation = useAssignComplaint();

  // --------------------------------------------------
  // Local State
  // --------------------------------------------------

  const [selectedOfficerId, setSelectedOfficerId] = useState("");

  // --------------------------------------------------
  // Approve / Reject
  // --------------------------------------------------

  const handleAdminStatusChange = (status: "APPROVED" | "REJECTED") => {
    if (!complaint) return;

    updateAdminStatusMutation.mutate({
      complaintId: complaint.id,
      status,
    });
  };

  // --------------------------------------------------
  // Assign Officer
  // --------------------------------------------------

  const handleAssignComplaint = () => {
    if (!complaint || !selectedOfficerId) {
      return;
    }

    assignComplaintMutation.mutate({
      complaintId: complaint.id,
      officerId: selectedOfficerId,
    });
  };

  // --------------------------------------------------
  // Loading State
  // --------------------------------------------------

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 pb-8 sm:p-6 lg:p-7">
        {/* Header Skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />

          <div className="mt-5 h-8 w-2/3 animate-pulse rounded bg-muted" />

          <div className="mt-3 h-4 w-56 animate-pulse rounded bg-muted" />
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="h-6 w-52 animate-pulse rounded bg-muted" />

              <div className="mt-6 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />

              <div className="mt-5 h-72 w-full animate-pulse rounded-xl bg-muted" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="h-6 w-32 animate-pulse rounded bg-muted" />

              <div className="mt-5 h-20 animate-pulse rounded bg-muted" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="h-6 w-40 animate-pulse rounded bg-muted" />

              <div className="mt-5 h-16 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Error State
  // --------------------------------------------------

  if (error || !complaint) {
    return (
      <div className="space-y-6 p-4 pb-8 sm:p-6 lg:p-7">
        <Link
          href="/dashboard/admin-dashboard/complaints"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Complaints
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Complaint Not Found
          </h2>

          <p className="mt-1 text-sm text-red-600">
            We could not load this complaint. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Conditions
  // --------------------------------------------------

  const canUpdateAdminStatus = complaint.status === "PENDING";

  const canAssignComplaint =
    complaint.status === "APPROVED" && !complaint.assignment;

  const isUpdatingStatus = updateAdminStatusMutation.isPending;

  const isAssigning = assignComplaintMutation.isPending;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="space-y-6 p-4 pb-8 sm:p-6 lg:p-7">
      {/* ==================================================
          PAGE HEADER
      ================================================== */}

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          {/* Back */}
          <Link
            href="/dashboard/admin-dashboard/complaints"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Complaints
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Title */}
            <div className="min-w-0">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <ClipboardList className="h-3.5 w-3.5" />
                Complaint Details
              </div>

              <h1 className="break-words text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {complaint.title}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Complaint submitted on {formatDate(complaint.createdAt)}
              </p>
            </div>

            {/* Status */}
            <span
              className={`inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                complaint.status,
              )}`}
            >
              {formatStatus(complaint.status)}
            </span>
          </div>
        </div>
      </div>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ==================================================
            LEFT SIDE
        ================================================== */}

        <div className="space-y-6 lg:col-span-2">
          {/* Complaint Information */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold text-foreground">
                Complaint Information
              </h2>
            </div>

            <div className="space-y-5">
              {/* Description */}
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Description
                </p>

                <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                  {complaint.description}
                </p>
              </div>

              {/* Location */}
              <div className="border-t border-border pt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      Location
                    </p>

                    <p className="mt-1 break-words text-sm text-foreground">
                      {complaint.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="border-t border-border pt-5">
                <p className="text-sm font-medium text-muted-foreground">
                  Category
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {complaint.category?.name ?? "N/A"}
                </p>
              </div>
            </div>
          </section>

          {/* Complaint Image */}
          {complaint.imageUrl && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />

                <h2 className="text-lg font-semibold text-foreground">
                  Complaint Image
                </h2>
              </div>

              <div className="relative min-h-48 overflow-hidden rounded-xl border border-border bg-muted/30">
                <Image
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  width={1200}
                  height={800}
                  className="max-h-[500px] w-full object-contain"
                />
              </div>
            </section>
          )}
        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="space-y-6">
          {/* ==================================================
              ADMIN ACTIONS
          ================================================== */}

          {canUpdateAdminStatus && (
            <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />

                <h2 className="text-lg font-semibold text-foreground">
                  Review Complaint
                </h2>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Review this complaint and choose whether it should be approved
                or rejected.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {/* Approve */}
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleAdminStatusChange("APPROVED")}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                  Approve
                </button>

                {/* Reject */}
                <button
                  type="button"
                  disabled={isUpdatingStatus}
                  onClick={() => handleAdminStatusChange("REJECTED")}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-600 transition-colors hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  Reject
                </button>
              </div>
            </section>
          )}

          {/* ==================================================
              ASSIGNMENT
          ================================================== */}

          <section className="rounded-2xl border border-secondary/15 bg-secondary/[0.03] p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                {complaint.assignment ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <UserPlus className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-foreground">
                  Assignment
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Manage complaint officer assignment.
                </p>
              </div>
            </div>

            {/* Assigned */}
            {complaint.assignment ? (
              <div className="mt-5 rounded-xl border border-secondary/15 bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assigned Officer
                </p>

                <div className="mt-3 flex items-center gap-3">
                  {/* Officer Avatar */}
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary/10 text-secondary">
                    <UserRound className="h-4 w-4" />

                    {complaint.assignment.officer?.imageUrl && (
                      <img
                        src={complaint.assignment.officer.imageUrl}
                        alt={complaint.assignment.officer.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                  </div>

                  {/* Officer Information */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {complaint.assignment.officer?.name ?? "Assigned Officer"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Complaint assigned successfully
                    </p>
                  </div>
                </div>
              </div>
            ) : canAssignComplaint ? (
              /* Select Officer */
              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <label
                  htmlFor="officer"
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Select Officer
                </label>

                <select
                  id="officer"
                  value={selectedOfficerId}
                  onChange={(event) => setSelectedOfficerId(event.target.value)}
                  disabled={officersLoading || isAssigning}
                  className="mt-3 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <option value="">
                    {officersLoading
                      ? "Loading officers..."
                      : "Select an officer"}
                  </option>

                  {officers.map((officer) => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!selectedOfficerId || isAssigning}
                  onClick={handleAssignComplaint}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isAssigning ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}

                  {isAssigning ? "Assigning..." : "Assign Officer"}
                </button>

                {assignComplaintMutation.isError && (
                  <p className="mt-3 text-xs font-medium text-red-600">
                    This officer working another complaint or services. Please
                    assign another officer.
                  </p>
                )}
              </div>
            ) : (
              /* Not available */
              <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  {complaint.status === "PENDING"
                    ? "Approve this complaint before assigning an officer."
                    : "This complaint is not currently available for officer assignment."}
                </p>
              </div>
            )}
          </section>

          {/* ==================================================
              TIMELINE
          ================================================== */}

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold text-foreground">
                Timeline
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Submitted
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatDate(complaint.createdAt)}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Last Updated
                </p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatDate(complaint.updatedAt)}
                </p>
              </div>

              {complaint.assignedAt && (
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Assigned
                  </p>

                  <p className="mt-1 text-sm font-medium text-foreground">
                    {formatDate(complaint.assignedAt)}
                  </p>
                </div>
              )}

              {complaint.resolvedAt && (
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Resolved
                  </p>

                  <p className="mt-1 text-sm font-medium text-foreground">
                    {formatDate(complaint.resolvedAt)}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ==================================================
              CITIZEN INFORMATION
          ================================================== */}

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />

              <h2 className="text-lg font-semibold text-foreground">
                Submitted By
              </h2>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                {complaint.citizen?.name ?? "N/A"}
              </p>

              <p className="mt-1 break-all text-sm text-muted-foreground">
                {complaint.citizen?.email ?? "N/A"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsPage;
