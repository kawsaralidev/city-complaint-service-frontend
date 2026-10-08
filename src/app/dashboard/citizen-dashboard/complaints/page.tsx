"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Eye,
  FileWarning,
  MapPin,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useCancelComplaint,
  useDeleteComplaint,
  useMyComplaints,
} from "@/hooks/complaint.hook";

import type { ComplaintStatus } from "@/types/complaint";

import ComplaintForm from "@/components/form/complaintForm";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_LIMIT = 10;

/* ============================================================
   STATUS STYLE
============================================================ */

const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "ASSIGNED":
      return "border-indigo-200 bg-indigo-50 text-indigo-600";

    case "IN_PROGRESS":
      return "border-primary/20 bg-primary/10 text-primary";

    case "COMPLETED":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-600";

    case "CANCELED":
      return "border-slate-200 bg-slate-100 text-slate-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

/* ============================================================
   STATUS LABEL
============================================================ */

const formatStatus = (status: ComplaintStatus) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

/* ============================================================
   DATE FORMAT
============================================================ */

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

/* ============================================================
   PAGE
============================================================ */

const CitizenComplaintsPage = () => {
  const [isCreateComplaintOpen, setIsCreateComplaintOpen] = useState(false);

  const [cancelingComplaintId, setCancelingComplaintId] = useState<
    string | null
  >(null);

  const [deletingComplaintId, setDeletingComplaintId] = useState<string | null>(
    null,
  );

  /* ============================================================
     PAGINATION
  ============================================================ */

  const [page, setPage] = useState(1);

  /* ============================================================
     GET COMPLAINTS
  ============================================================ */

  const { data: complaintsResponse, isLoading, error } = useMyComplaints();

  const complaints = complaintsResponse?.data ?? [];

  /* ============================================================
     MUTATIONS
  ============================================================ */

  const cancelComplaintMutation = useCancelComplaint();

  const deleteComplaintMutation = useDeleteComplaint();

  /* ============================================================
     PAGINATION CALCULATION
  ============================================================ */

  const totalComplaints = complaints.length;

  const totalPages = Math.max(Math.ceil(totalComplaints / PAGE_LIMIT), 1);

  const startIndex = (page - 1) * PAGE_LIMIT;

  const endIndex = startIndex + PAGE_LIMIT;

  const currentComplaints = complaints.slice(startIndex, endIndex);

  /* ============================================================
     KEEP PAGE VALID AFTER DELETE
  ============================================================ */

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  /* ============================================================
     CANCEL COMPLAINT
  ============================================================ */

  const handleCancelComplaint = (complaintId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this complaint?",
    );

    if (!confirmed) {
      return;
    }

    setCancelingComplaintId(complaintId);

    cancelComplaintMutation.mutate(complaintId, {
      onSettled: () => {
        setCancelingComplaintId(null);
      },
    });
  };

  /* ============================================================
     DELETE COMPLAINT
  ============================================================ */

  const handleDeleteComplaint = (complaintId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmed) {
      return;
    }

    setDeletingComplaintId(complaintId);

    deleteComplaintMutation.mutate(complaintId, {
      onSettled: () => {
        setDeletingComplaintId(null);
      },
    });
  };

  /* ============================================================
     PAGINATION HANDLERS
  ============================================================ */

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  /* ============================================================
     SUMMARY
  ============================================================ */

  const pendingCount = complaints.filter(
    (complaint) => complaint.status === "PENDING",
  ).length;

  const completedCount = complaints.filter(
    (complaint) => complaint.status === "COMPLETED",
  ).length;

  return (
    <main className="min-h-full overflow-x-hidden bg-muted/20">
      <div className="w-full space-y-6 overflow-hidden p-4 sm:p-6 lg:p-7">
        {/* ======================================================
            HERO
        ======================================================= */}

        <section className="relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="relative p-5 sm:p-6 lg:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Heading */}
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  <ClipboardList className="h-3.5 w-3.5" />
                  Complaint Management
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  My Complaints
                </h1>

                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Track and manage your submitted complaints from one place.
                </p>
              </div>

              {/* Create Complaint */}
              <Dialog
                open={isCreateComplaintOpen}
                onOpenChange={setIsCreateComplaintOpen}
              >
                <DialogTrigger className="group inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg sm:w-auto">
                  <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                  Create Complaint
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                      Create a Complaint
                    </DialogTitle>

                    <DialogDescription>
                      Provide the details below to submit your complaint.
                    </DialogDescription>
                  </DialogHeader>

                  <ComplaintForm
                    onCancel={() => setIsCreateComplaintOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Summary */}
            <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
              {/* Total */}
              <div className="rounded-xl border border-border bg-background/70 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileWarning className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      Total Complaints
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-foreground">
                      {totalComplaints}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <ClipboardList className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-amber-700/70">
                      Pending
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-amber-700">
                      {pendingCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-4.5 w-4.5" />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-700/70">
                      Completed
                    </p>

                    <p className="mt-0.5 text-xl font-bold text-emerald-700">
                      {completedCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            TABLE CARD
        ======================================================= */}

        <section className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-border bg-gradient-to-r from-primary/5 via-card to-secondary/5 px-4 py-4 sm:px-5 sm:py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-4.5 w-4.5" />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-bold text-foreground">
                  Your Complaints
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {isLoading
                    ? "Loading your submitted complaints..."
                    : `${totalComplaints} complaint${
                        totalComplaints === 1 ? "" : "s"
                      } found`}
                </p>
              </div>
            </div>

            {!isLoading && !error && totalComplaints > 0 && (
              <div className="w-fit shrink-0 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                Page {page} of {totalPages}
              </div>
            )}
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="space-y-3 p-4 sm:p-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          ) : error ? (
            /* Error */
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                <FileWarning className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                Failed to load complaints
              </h3>

              <p className="mt-1.5 max-w-sm text-sm leading-6 text-muted-foreground">
                Something went wrong while loading your complaints. Please try
                again later.
              </p>
            </div>
          ) : totalComplaints === 0 ? (
            /* Empty */
            <div className="flex min-h-[320px] flex-col items-center justify-center px-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ClipboardList className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                No complaints yet
              </h3>

              <p className="mt-1.5 max-w-sm text-sm leading-6 text-muted-foreground">
                Your submitted complaints will appear here. Create your first
                complaint to get started.
              </p>

              <button
                type="button"
                onClick={() => setIsCreateComplaintOpen(true)}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Create Complaint
              </button>
            </div>
          ) : (
            <>
              {/* ==================================================
                  TABLE
              =================================================== */}

              <div className="w-full overflow-hidden">
                <Table className="w-full table-fixed">
                  {/* =================================================
                      COLUMN WIDTHS

                      Action gets more space so that
                      View / Cancel / Delete are never clipped.
                  ================================================= */}

                  <colgroup>
                    {/* Complaint */}
                    <col className="w-[24%]" />

                    {/* Category */}
                    <col className="w-[14%]" />

                    {/* Location */}
                    <col className="w-[12%]" />

                    {/* Status */}
                    <col className="w-[13%]" />

                    {/* Created */}
                    <col className="w-[13%]" />

                    {/* Action */}
                    <col className="w-[24%]" />
                  </colgroup>

                  {/* =================================================
                      HEADER
                  ================================================= */}

                  <TableHeader>
                    <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
                      <TableHead className="px-2 py-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 md:px-4">
                        Complaint
                      </TableHead>

                      <TableHead className="px-2 py-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 md:px-4">
                        Category
                      </TableHead>

                      <TableHead className="px-2 py-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 md:px-4">
                        Location
                      </TableHead>

                      <TableHead className="px-2 py-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 md:px-4">
                        Status
                      </TableHead>

                      <TableHead className="px-2 py-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 md:px-4">
                        Created
                      </TableHead>

                      <TableHead className="px-1 py-4 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-2">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* =================================================
                      BODY
                  ================================================= */}

                  <TableBody>
                    {currentComplaints.map((complaint) => {
                      const isPending = complaint.status === "PENDING";

                      const isCanceling =
                        cancelingComplaintId === complaint.id &&
                        cancelComplaintMutation.isPending;

                      const canDelete =
                        complaint.status === "PENDING" ||
                        complaint.status === "REJECTED" ||
                        complaint.status === "CANCELED";

                      const isDeleting =
                        deletingComplaintId === complaint.id &&
                        deleteComplaintMutation.isPending;

                      return (
                        <TableRow
                          key={complaint.id}
                          className="group border-b border-border transition-colors last:border-b-0 hover:bg-muted/20"
                        >
                          {/* =================================================
                              COMPLAINT
                          ================================================== */}

                          <TableCell className="max-w-0 overflow-hidden px-2 py-4 sm:px-3 md:px-4">
                            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                              <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary transition-all duration-200 group-hover:bg-primary/10 sm:flex">
                                <ClipboardList className="h-4.5 w-4.5" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                                  {complaint.title}
                                </p>

                                <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-xs">
                                  {complaint.description}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* =================================================
                              CATEGORY
                          ================================================== */}

                          <TableCell className="max-w-0 overflow-hidden px-2 py-4 sm:px-3 md:px-4">
                            <span className="block max-w-full truncate rounded-lg border border-border bg-background px-2 py-1.5 text-[10px] font-medium text-foreground sm:px-2.5 sm:text-xs">
                              {complaint.category?.name ?? "—"}
                            </span>
                          </TableCell>

                          {/* =================================================
                              LOCATION
                          ================================================== */}

                          <TableCell className="max-w-0 overflow-hidden px-2 py-4 sm:px-3 md:px-4">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />

                              <span className="min-w-0 truncate text-[10px] text-muted-foreground sm:text-xs">
                                {complaint.location}
                              </span>
                            </div>
                          </TableCell>

                          {/* =================================================
                              STATUS
                          ================================================== */}

                          <TableCell className="max-w-0 overflow-hidden px-2 py-4 sm:px-3 md:px-4">
                            <span
                              className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-1.5 text-[9px] font-semibold sm:px-2.5 sm:text-xs ${getStatusStyle(
                                complaint.status,
                              )}`}
                            >
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />

                              <span className="truncate">
                                {formatStatus(complaint.status)}
                              </span>
                            </span>
                          </TableCell>

                          {/* =================================================
                              CREATED
                          ================================================== */}

                          <TableCell className="max-w-0 overflow-hidden px-2 py-4 sm:px-3 md:px-4">
                            <div className="flex min-w-0 items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />

                              <span className="truncate text-[10px] text-muted-foreground sm:text-xs">
                                {formatDate(complaint.createdAt)}
                              </span>
                            </div>
                          </TableCell>

                          {/* =================================================
                              ACTION

                              IMPORTANT:
                              Enough width is reserved here.
                          ================================================== */}

                          <TableCell className="px-1 py-4 sm:px-2">
                            <div className="flex w-full items-center justify-center gap-1 sm:gap-1.5">
                              {/* VIEW */}
                              <Link
                                href={`/complaints/${complaint.id}`}
                                title="View complaint"
                                className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border border-border bg-background px-2 text-foreground transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:h-9 sm:px-2.5"
                              >
                                <Eye className="h-3.5 w-3.5 shrink-0" />

                                <span className="text-[10px] font-medium sm:text-xs">
                                  View
                                </span>
                              </Link>

                              {/* CANCEL */}
                              <button
                                type="button"
                                title={
                                  isPending
                                    ? "Cancel complaint"
                                    : "Only pending complaints can be canceled"
                                }
                                disabled={!isPending || isCanceling}
                                onClick={() => {
                                  if (!isPending) {
                                    return;
                                  }

                                  handleCancelComplaint(complaint.id);
                                }}
                                className={`inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-[10px] transition-all sm:h-9 sm:px-2.5 sm:text-xs ${
                                  isPending
                                    ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                                    : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-45"
                                }`}
                              >
                                <XCircle className="h-3.5 w-3.5 shrink-0" />

                                <span className="hidden whitespace-nowrap sm:inline">
                                  {isCanceling ? "Canceling..." : "Cancel"}
                                </span>
                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                title={
                                  canDelete
                                    ? "Delete complaint"
                                    : "This complaint cannot be deleted in its current status"
                                }
                                disabled={!canDelete || isDeleting}
                                onClick={() => {
                                  if (!canDelete) {
                                    return;
                                  }

                                  handleDeleteComplaint(complaint.id);
                                }}
                                className={`inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-[10px] transition-all sm:h-9 sm:px-2.5 sm:text-xs ${
                                  canDelete
                                    ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                                    : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-45"
                                }`}
                              >
                                <Trash2 className="h-3.5 w-3.5 shrink-0" />

                                <span className="hidden whitespace-nowrap sm:inline">
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </span>
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* ========================================================
                  PAGINATION
              ========================================================= */}

              {totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-border bg-muted/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <p className="text-xs text-muted-foreground">
                    Showing{" "}
                    <span className="font-semibold text-foreground">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-foreground">
                      {Math.min(endIndex, totalComplaints)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-foreground">
                      {totalComplaints}
                    </span>{" "}
                    complaints
                  </p>

                  <div className="flex items-center justify-center gap-1.5">
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                      aria-label="Previous page"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={page === pageNumber ? "page" : undefined}
                        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-semibold transition-colors ${
                          page === pageNumber
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    {/* Next */}
                    <button
                      type="button"
                      onClick={handleNextPage}
                      disabled={page === totalPages}
                      aria-label="Next page"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Info */}
              <div className="border-t border-border bg-muted/20 px-4 py-3.5 sm:px-5">
                <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                    <span>
                      Keep track of your complaint status from this page.
                    </span>
                  </div>

                  <span className="font-medium text-foreground">
                    {totalComplaints} total complaints
                  </span>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default CitizenComplaintsPage;
