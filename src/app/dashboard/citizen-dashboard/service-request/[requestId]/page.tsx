"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import RoleGuard from "../../../guard/role-guard";
import { useServiceRequestById } from "@/hooks/service-request.hook";
import { useCreatePayment } from "@/hooks/payment.hook";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "APPROVED":
      return "bg-blue-100 text-blue-700";

    case "PAYMENT_PENDING":
      return "bg-orange-100 text-orange-700";

    case "CONFIRMED":
      return "bg-cyan-100 text-cyan-700";

    case "ASSIGNED":
      return "bg-purple-100 text-purple-700";

    case "IN_PROGRESS":
      return "bg-indigo-100 text-indigo-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "CANCELED":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-gray-100 text-gray-700";
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

const ServiceRequestDetailsPage = () => {
  const params = useParams();

  const requestId =
    typeof params.requestId === "string" ? params.requestId : "";

  const {
    data: request,
    isLoading,
    isError,
  } = useServiceRequestById(requestId);

  const paymentMutation = useCreatePayment();

  const handlePayment = () => {
    if (!request) return;

    paymentMutation.mutate(
      {
        serviceRequestId: request.id,
      },
      {
        onSuccess: (data) => {
          window.location.href = data.checkoutUrl;
        },
      },
    );
  };

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        {/* Back */}
        <Link
          href="/dashboard/citizen-dashboard/service-request"
          className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          ← Back to My Requests
        </Link>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="text-sm text-muted-foreground">
              Loading service request...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-700">
              Failed to load service request
            </h2>

            <p className="mt-1 text-sm text-red-600">Please try again later.</p>
          </div>
        )}

        {/* Request details */}
        {!isLoading && !isError && request && (
          <>
            {/* Header */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Service Request
                  </p>

                  <h1 className="mt-1 text-2xl font-bold">
                    {request.service.name}
                  </h1>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Request ID: {request.id}
                  </p>
                </div>

                {request.status === "APPROVED" && (
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={paymentMutation.isPending}
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {paymentMutation.isPending ? "Processing..." : "Pay Now"}
                  </button>
                )}

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-medium ${getStatusStyle(
                    request.status,
                  )}`}
                >
                  {formatStatus(request.status)}
                </span>
              </div>
            </div>

            {/* Service Information */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Service Information</h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>

                  <p className="mt-1 font-medium">{request.service.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Service Fee</p>

                  <p className="mt-1 font-medium">৳{request.amount}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">
                    Service Description
                  </p>

                  <p className="mt-1 leading-6">
                    {request.service.description ||
                      "No service description available."}
                  </p>
                </div>
              </div>
            </div>

            {/* Request Information */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Request Information</h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>

                  <p className="mt-1 font-medium">{request.location}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Description</p>

                  <p className="mt-1 leading-6">
                    {request.description ||
                      "No additional description provided."}
                  </p>
                </div>

                {request.imageUrl && (
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Uploaded Image
                    </p>

                    <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl border border-border">
                      <Image
                        src={request.imageUrl}
                        alt={request.service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 576px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Payment Information</h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Status
                  </p>

                  <p className="mt-1 font-medium">
                    {request.payment?.status || "Not paid"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Amount
                  </p>

                  <p className="mt-1 font-medium">
                    ৳{request.payment?.amount || request.amount}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Currency</p>

                  <p className="mt-1 font-medium">
                    {request.payment?.currency || "BDT"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Paid At</p>

                  <p className="mt-1 font-medium">
                    {formatDate(request.payment?.paidAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Request Timeline</h2>

              <div className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-500" />

                  <div>
                    <p className="font-medium">Request Submitted</p>

                    <p className="text-sm text-muted-foreground">
                      {formatDate(request.createdAt)}
                    </p>
                  </div>
                </div>

                {request.confirmedAt && (
                  <div className="flex gap-4">
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cyan-500" />

                    <div>
                      <p className="font-medium">Payment Confirmed</p>

                      <p className="text-sm text-muted-foreground">
                        {formatDate(request.confirmedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {request.assignedAt && (
                  <div className="flex gap-4">
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-purple-500" />

                    <div>
                      <p className="font-medium">Officer Assigned</p>

                      <p className="text-sm text-muted-foreground">
                        {formatDate(request.assignedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {request.completedAt && (
                  <div className="flex gap-4">
                    <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-green-500" />

                    <div>
                      <p className="font-medium">Request Completed</p>

                      <p className="text-sm text-muted-foreground">
                        {formatDate(request.completedAt)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assignment */}
            {request.assignment && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold">
                  Assignment Information
                </h2>

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Officer ID</p>

                    <p className="mt-1 font-medium">
                      {request.assignment.officerId}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Assigned At</p>

                    <p className="mt-1 font-medium">
                      {formatDate(request.assignment.assignedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Not found */}
        {!isLoading && !isError && !request && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">Service request not found</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              The service request may have been removed or does not exist.
            </p>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

export default ServiceRequestDetailsPage;
