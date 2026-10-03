"use client";

import {
  CalendarDays,
  ClipboardList,
  Eye,
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

import Link from "next/link";
import { useState } from "react";

import ComplaintForm from "@/components/form/complaintForm";

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

const formatStatus = (status: ComplaintStatus) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const CitizenComplaintsPage = () => {
  const [isCreateComplaintOpen, setIsCreateComplaintOpen] = useState(false);

  //  complaint cancel
  const [cancelingComplaintId, setCancelingComplaintId] = useState<
    string | null
  >(null);

  //  complaint delete
  const [deletingComplaintId, setDeletingComplaintId] = useState<string | null>(
    null,
  );

  const { data: complaintsResponse, isLoading, error } = useMyComplaints();

  // Cancel mutation
  const cancelComplaintMutation = useCancelComplaint();

  // Delete mutation
  const deleteComplaintMutation = useDeleteComplaint();

  const complaints = complaintsResponse?.data ?? [];

  // Cancel handler
  const handleCancelComplaint = (complaintId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this complaint?",
    );

    if (!confirmed) return;

    setCancelingComplaintId(complaintId);

    cancelComplaintMutation.mutate(complaintId, {
      onSettled: () => {
        setCancelingComplaintId(null);
      },
    });
  };

  // Delete handler
  const handleDeleteComplaint = (complaintId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmed) return;

    setDeletingComplaintId(complaintId);

    deleteComplaintMutation.mutate(complaintId, {
      onSettled: () => {
        setDeletingComplaintId(null);
      },
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-7">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <ClipboardList className="h-3.5 w-3.5" />
            Complaint Management
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            My Complaints
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Track and manage your submitted complaints from one place.
          </p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Table Header */}
        <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">
              Your Complaints
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              {isLoading
                ? "Loading your submitted complaints..."
                : `${complaints.length} complaint${
                    complaints.length === 1 ? "" : "s"
                  } found`}
            </p>
          </div>

          <div className="shrink-0">
            <Dialog
              open={isCreateComplaintOpen}
              onOpenChange={setIsCreateComplaintOpen}
            >
              <DialogTrigger className="group inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg">
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
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3 p-4 sm:p-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h3 className="text-base font-semibold text-foreground">
              Failed to load complaints
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Something went wrong while loading your complaints. Please try
              again later.
            </p>
          </div>
        ) : complaints.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <ClipboardList className="h-6 w-6" />
            </div>

            <h3 className="text-base font-semibold text-foreground">
              No complaints yet
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your submitted complaints will appear here.
            </p>
          </div>
        ) : (
          /* Complaints Table */
          <div className="w-full overflow-hidden">
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
                  {/* Complaint */}
                  <TableHead className="w-[23%] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 sm:py-3.5 sm:text-xs md:px-5">
                    Complaint
                  </TableHead>

                  {/* Category */}
                  <TableHead className="w-[14%] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 sm:py-3.5 sm:text-xs md:px-5">
                    Category
                  </TableHead>

                  {/* Location */}
                  <TableHead className="w-[15%] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 sm:py-3.5 sm:text-xs md:px-5">
                    Location
                  </TableHead>

                  {/* Status */}
                  <TableHead className="w-[12%] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 sm:py-3.5 sm:text-xs md:px-5">
                    Status
                  </TableHead>

                  {/* Created */}
                  <TableHead className="w-[12%] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-3 sm:py-3.5 sm:text-xs md:px-5">
                    Created
                  </TableHead>

                  {/* Action */}
                  <TableHead className="w-[24%] px-1 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:px-2 sm:py-3.5 sm:text-xs md:px-3">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {complaints.map((complaint) => {
                  const canManageComplaint = complaint.status === "PENDING";

                  const isCanceling =
                    cancelingComplaintId === complaint.id &&
                    cancelComplaintMutation.isPending;

                  const isDeleting =
                    deletingComplaintId === complaint.id &&
                    deleteComplaintMutation.isPending;

                  return (
                    <TableRow
                      key={complaint.id}
                      className="group border-b border-border transition-colors last:border-b-0 hover:bg-muted/20"
                    >
                      {/* Complaint */}
                      <TableCell className="max-w-0 px-2 py-3 sm:px-3 sm:py-4 md:px-5">
                        <div className="flex min-w-0 items-start gap-2 sm:gap-3">
                          <div className="mt-0.5 hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground sm:flex">
                            <ClipboardList className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
                              {complaint.title}
                            </p>

                            <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-xs">
                              {complaint.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="max-w-0 px-2 py-3 sm:px-3 sm:py-4 md:px-5">
                        <span className="block truncate rounded-lg border border-border bg-background px-1.5 py-1.5 text-[10px] font-medium text-foreground sm:px-2.5 sm:text-xs">
                          {complaint.category?.name ?? "—"}
                        </span>
                      </TableCell>

                      {/* Location */}
                      <TableCell className="max-w-0 px-2 py-3 sm:px-3 sm:py-4 md:px-5">
                        <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />

                          <span className="truncate text-[10px] leading-5 sm:text-xs">
                            {complaint.location}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-2 py-3 sm:px-3 sm:py-4 md:px-5">
                        <span
                          className={`inline-flex max-w-full items-center rounded-full border px-1.5 py-1 text-[9px] font-semibold sm:px-2.5 sm:text-xs ${getStatusStyle(
                            complaint.status,
                          )}`}
                        >
                          <span className="mr-1 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />

                          <span className="truncate">
                            {formatStatus(complaint.status)}
                          </span>
                        </span>
                      </TableCell>

                      {/* Created */}
                      <TableCell className="px-2 py-3 sm:px-3 sm:py-4 md:px-5">
                        <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 shrink-0" />

                          <span className="truncate text-[10px] sm:text-xs">
                            {formatDate(complaint.createdAt)}
                          </span>
                        </div>
                      </TableCell>

                      {/* Action */}
                      <TableCell className="px-1 py-3 sm:px-2 sm:py-4 md:px-3">
                        <div className="flex items-center justify-center gap-1 sm:gap-2">
                          {(() => {
                            const isPending = complaint.status === "PENDING";

                            const canDelete =
                              complaint.status === "PENDING" ||
                              complaint.status === "REJECTED" ||
                              complaint.status === "CANCELED";

                            const isCanceling =
                              cancelingComplaintId === complaint.id;
                            const isDeleting =
                              deletingComplaintId === complaint.id;

                            return (
                              <>
                                {/* View Button */}
                                <Link
                                  href={`/complaints/${complaint.id}`}
                                  className="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border border-border bg-background px-2 text-[10px] font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary sm:h-9 sm:px-2.5 sm:text-xs"
                                >
                                  <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                  <span>View</span>
                                </Link>

                                {/* Cancel Button */}
                                <button
                                  type="button"
                                  disabled={
                                    !isPending || isCanceling || isDeleting
                                  }
                                  onClick={() => {
                                    if (!isPending) return;

                                    handleCancelComplaint(complaint.id);
                                  }}
                                  className={`inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-[10px] font-semibold transition-colors sm:h-9 sm:px-2.5 sm:text-xs ${
                                    isPending
                                      ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                                      : "cursor-not-allowed border-red-200/50 bg-red-50/40 text-red-400 opacity-50"
                                  }`}
                                >
                                  <XCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                  <span>
                                    {isCanceling ? "Canceling..." : "Cancel"}
                                  </span>
                                </button>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  disabled={
                                    !canDelete || isDeleting || isCanceling
                                  }
                                  onClick={() => {
                                    if (!canDelete) return;

                                    handleDeleteComplaint(complaint.id);
                                  }}
                                  className={`inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border px-2 text-[10px] font-semibold transition-colors sm:h-9 sm:px-2.5 sm:text-xs ${
                                    canDelete
                                      ? "border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                                      : "cursor-not-allowed border-border bg-muted text-muted-foreground opacity-50"
                                  }`}
                                >
                                  <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                  <span>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                  </span>
                                </button>
                              </>
                            );
                          })()}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenComplaintsPage;
