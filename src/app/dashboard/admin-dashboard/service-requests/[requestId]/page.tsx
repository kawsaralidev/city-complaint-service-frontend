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
  CreditCard,
  MapPin,
  UserRound,
} from "lucide-react";

import RoleGuard from "../../../guard/role-guard";

import {
  useAssignServiceRequest,
  useReviewServiceRequest,
  useServiceRequestById,
} from "@/hooks/service-request.hook";
import type { ServiceRequestStatus } from "@/types/service-request";

import { useActiveOfficers } from "@/hooks/complaint.hook";

const formatStatus = (status: ServiceRequestStatus) => {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const getStatusStyle = (status: ServiceRequestStatus) => {
  switch (status) {
    case "PENDING":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";

    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-700";

    case "PAYMENT_PENDING":
      return "border-orange-200 bg-orange-50 text-orange-700";

    case "CONFIRMED":
      return "border-cyan-200 bg-cyan-50 text-cyan-700";

    case "ASSIGNED":
      return "border-purple-200 bg-purple-50 text-purple-700";

    case "IN_PROGRESS":
      return "border-indigo-200 bg-indigo-50 text-indigo-700";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-700";

    case "REJECTED":
      return "border-red-200 bg-red-50 text-red-700";

    case "CANCELED":
      return "border-gray-200 bg-gray-100 text-gray-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const AdminServiceRequestDetailsPage = () => {
  const [selectedOfficerId, setSelectedOfficerId] = useState("");

  const params = useParams();

  const reviewMutation = useReviewServiceRequest();
  const assignMutation = useAssignServiceRequest();

  const requestId =
    typeof params.requestId === "string" ? params.requestId : "";

  const {
    data: request,
    isLoading,
    isError,
  } = useServiceRequestById(requestId);

  const { data: officersData, isLoading: officersLoading } =
    useActiveOfficers();

  const officers = officersData?.data ?? [];

  const handleReview = (status: "APPROVED" | "REJECTED") => {
    if (!request) return;

    reviewMutation.mutate({
      id: request.id,
      data: {
        status,
      },
    });
  };

  const handleAssignOfficer = () => {
    if (!request || !selectedOfficerId) return;

    assignMutation.mutate({
      id: request.id,
      data: {
        officerId: selectedOfficerId,
      },
    });
  };

  const assignedOfficer = request?.assignment
    ? officers.find((officer) => officer.id === request.assignment?.officerId)
    : undefined;

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6 p-6 pb-8">
        {/* Back */}
        <Link
          href="/dashboard/admin-dashboard/service-requests"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Service Requests
        </Link>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Loading service request...
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">
            <p className="font-semibold text-red-700">
              Failed to load service request.
            </p>

            <p className="mt-1 text-sm text-red-600">Please try again later.</p>
          </div>
        )}

        {/* Not Found */}
        {!isLoading && !isError && !request && (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-muted-foreground" />

            <h2 className="mt-4 text-lg font-semibold">
              Service Request Not Found
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              The requested service request could not be found.
            </p>
          </div>
        )}

        {/* Details */}
        {!isLoading && !isError && request && (
          <>
            {/* Header */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <ClipboardList className="h-4 w-4" />
                    Service Request
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight">
                    {request.service.name}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {request.status === "PENDING" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleReview("APPROVED")}
                        disabled={reviewMutation.isPending}
                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {reviewMutation.isPending ? "Processing..." : "Approve"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReview("REJECTED")}
                        disabled={reviewMutation.isPending}
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {reviewMutation.isPending ? "Processing..." : "Reject"}
                      </button>
                    </>
                  )}

                  <span
                    className={`inline-flex w-fit rounded-full border px-3 py-1.5 text-sm font-medium ${getStatusStyle(
                      request.status,
                    )}`}
                  >
                    {formatStatus(request.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Request Information */}
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Request Information</h2>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Location
                      </p>

                      <div className="mt-1 flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-primary" />

                        <p className="text-sm">{request.location}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Created
                      </p>

                      <div className="mt-1 flex items-start gap-2">
                        <CalendarDays className="mt-0.5 h-4 w-4 text-primary" />

                        <p className="text-sm">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-medium text-muted-foreground">
                      Description
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6">
                      {request.description || "No description provided."}
                    </p>
                  </div>

                  {/* Image */}
                  {request.imageUrl && (
                    <div className="mt-6">
                      <p className="text-xs font-medium text-muted-foreground">
                        Uploaded Image
                      </p>

                      <div className="relative mt-3 h-72 w-full overflow-hidden rounded-xl border border-border">
                        <Image
                          src={request.imageUrl}
                          alt="Service request"
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      </div>
                    </div>
                  )}
                </section>

                {/* Service Information */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Service Information</h2>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Service Name
                      </p>

                      <p className="mt-1 font-medium">{request.service.name}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Description
                      </p>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {request.service.description ||
                          "No service description available."}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Base Fee
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        ৳{request.service.baseFee}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Timeline */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Request Timeline</h2>

                  <div className="mt-5 space-y-5">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />

                      <div>
                        <p className="text-sm font-medium">Request Created</p>

                        <p className="text-xs text-muted-foreground">
                          {formatDate(request.createdAt)}
                        </p>
                      </div>
                    </div>

                    {request.confirmedAt && (
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-600" />

                        <div>
                          <p className="text-sm font-medium">
                            Payment Confirmed
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDate(request.confirmedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {request.assignedAt && (
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-purple-600" />

                        <div>
                          <p className="text-sm font-medium">
                            Officer Assigned
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDate(request.assignedAt)}
                          </p>
                        </div>
                      </div>
                    )}

                    {request.completedAt && (
                      <div className="flex gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />

                        <div>
                          <p className="text-sm font-medium">
                            Service Completed
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDate(request.completedAt)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Citizen */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-primary" />

                    <h2 className="font-semibold">Citizen</h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Name</p>

                      <p className="mt-1 text-sm font-medium">
                        {request.citizen?.name ?? "Unknown Citizen"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>

                      <p className="mt-1 break-all text-sm">
                        {request.citizen?.email ?? "—"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />

                    <h2 className="font-semibold">Payment</h2>
                  </div>

                  {!request.payment ? (
                    <p className="mt-5 text-sm text-muted-foreground">
                      No payment record yet.
                    </p>
                  ) : (
                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>

                        <p className="mt-1 text-lg font-semibold">
                          {request.payment.currency} {request.payment.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Status</p>

                        <p className="mt-1 text-sm font-medium">
                          {request.payment.status}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Paid At</p>

                        <p className="mt-1 text-sm">
                          {formatDate(request.payment.paidAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </section>

                {/* Assign Officer */}
                {request.status === "CONFIRMED" && !request.assignment && (
                  <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-2">
                      <UserRound className="h-5 w-5 text-primary" />

                      <h2 className="font-semibold">Assign Officer</h2>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Select an active officer to handle this confirmed service
                      request.
                    </p>

                    <div className="mt-5">
                      <label
                        htmlFor="officer"
                        className="mb-2 block text-sm font-medium text-foreground"
                      >
                        Select Officer
                      </label>

                      <select
                        id="officer"
                        value={selectedOfficerId}
                        onChange={(event) =>
                          setSelectedOfficerId(event.target.value)
                        }
                        disabled={officersLoading || assignMutation.isPending}
                        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
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
                    </div>

                    {!officersLoading && officers.length === 0 && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        No active officers are currently available.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleAssignOfficer}
                      disabled={
                        !selectedOfficerId ||
                        officersLoading ||
                        assignMutation.isPending
                      }
                      className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {assignMutation.isPending
                        ? "Assigning..."
                        : "Assign Officer"}
                    </button>
                  </section>
                )}

                {/* Assignment */}
                <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    <UserRound className="h-5 w-5 text-primary" />

                    <h2 className="font-semibold">Assignment</h2>
                  </div>

                  {!request.assignment ? (
                    <p className="mt-5 text-sm text-muted-foreground">
                      No officer assigned yet.
                    </p>
                  ) : (
                    <div className="mt-5 space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Officer</p>

                        <p className="mt-1 text-sm font-medium">
                          {assignedOfficer?.name ??
                            request.assignment.officerId}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Assigned At
                        </p>

                        <p className="mt-1 text-sm">
                          {formatDate(request.assignment.assignedAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </RoleGuard>
  );
};

export default AdminServiceRequestDetailsPage;
