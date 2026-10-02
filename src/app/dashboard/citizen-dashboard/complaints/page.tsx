"use client";

import { CalendarDays, ClipboardList, Eye, MapPin, Plus } from "lucide-react";
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

import { useMyComplaints } from "@/hooks/complaint.hook";

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
  const { data: complaintsResponse, isLoading, error } = useMyComplaints();

  const complaints = complaintsResponse?.data ?? [];

  return (
    <div className="space-y-6 p-6 md:p-7">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
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
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Table Header */}
        <div className=" flex items-center justify-between border-b border-border px-5 py-4">
          <div>
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
          <div>
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
          <div className="space-y-3 p-5">
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
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Complaint
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Location
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Created
                  </TableHead>

                  <TableHead className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow
                    key={complaint.id}
                    className="group border-b border-border transition-colors last:border-b-0 hover:bg-muted/20"
                  >
                    {/* Complaint */}
                    <TableCell className="px-5 py-4">
                      <div className="flex max-w-[280px] items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                          <ClipboardList className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {complaint.title}
                          </p>

                          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                            {complaint.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell className="px-5 py-4">
                      <span className="inline-flex rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground">
                        {complaint.category?.name ?? "—"}
                      </span>
                    </TableCell>

                    {/* Location */}
                    <TableCell className="px-5 py-4">
                      <div className="flex max-w-[180px] items-start gap-1.5 text-muted-foreground">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />

                        <span className="line-clamp-2 text-xs leading-5">
                          {complaint.location}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                          complaint.status,
                        )}`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

                        {formatStatus(complaint.status)}
                      </span>
                    </TableCell>

                    {/* Created */}
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />

                        {formatDate(complaint.createdAt)}
                      </div>
                    </TableCell>

                    {/* Action */}
                    <TableCell className="px-5 py-4 text-center">
                      <Link
                        href={`/complaints/${complaint.id}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitizenComplaintsPage;
