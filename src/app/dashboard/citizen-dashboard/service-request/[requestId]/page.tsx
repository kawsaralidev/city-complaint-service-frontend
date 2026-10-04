"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useServiceRequestById } from "@/hooks/service-request.hook";
import RoleGuard from "@/app/dashboard/guard/role-guard";

const CitizenServiceRequestDetailsPage = () => {
  const params = useParams();

  const requestId =
    typeof params.requestId === "string" ? params.requestId : "";

  const {
    data: serviceRequest,
    isLoading,
    isError,
  } = useServiceRequestById(requestId);

  if (isLoading) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <div className="space-y-6 p-6">
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded bg-muted" />

          <div className="space-y-4 rounded-lg border p-6">
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
            <div className="h-5 w-full animate-pulse rounded bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </RoleGuard>
    );
  }

  if (isError || !serviceRequest) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <div className="space-y-6 p-6">
          <Link
            href="/dashboard/citizen-dashboard/service-request"
            className="text-sm text-primary hover:underline"
          >
            ← Back to My Requests
          </Link>

          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
            <h1 className="text-lg font-semibold">Service request not found</h1>

            <p className="mt-2 text-sm">
              We could not load this service request. Please try again.
            </p>
          </div>
        </div>
      </RoleGuard>
    );
  }

  const getStatusClassName = () => {
    switch (serviceRequest.status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "ASSIGNED":
        return "bg-purple-100 text-purple-700";

      case "CONFIRMED":
        return "bg-cyan-100 text-cyan-700";

      case "APPROVED":
        return "bg-yellow-100 text-yellow-700";

      case "PAYMENT_PENDING":
        return "bg-orange-100 text-orange-700";

      case "REJECTED":
      case "CANCELED":
        return "bg-red-100 text-red-700";

      case "PENDING":
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (date: string | null) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleString();
  };

  const paymentStatus = serviceRequest.payment?.status ?? "NOT PAID";

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <Link
            href="/dashboard/citizen-dashboard/service-request"
            className="text-sm text-primary hover:underline"
          >
            ← Back to My Requests
          </Link>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">Service Request Details</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View the complete information about your service request.
            </p>
          </div>
        </div>

        {/* Main information */}
        <div className="rounded-lg border bg-background">
          <div className="border-b p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  {serviceRequest.service.name}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Request ID: {serviceRequest.id}
                </p>
              </div>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusClassName()}`}
              >
                {formatStatus(serviceRequest.status)}
              </span>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* Service */}
            <div>
              <p className="text-sm text-muted-foreground">Service</p>

              <p className="mt-1 font-medium">{serviceRequest.service.name}</p>
            </div>

            {/* Amount */}
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>

              <p className="mt-1 font-medium">৳{serviceRequest.amount}</p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-muted-foreground">Location</p>

              <p className="mt-1 font-medium">{serviceRequest.location}</p>
            </div>

            {/* Payment */}
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>

              <p className="mt-1 font-medium">{paymentStatus}</p>
            </div>

            {/* Created */}
            <div>
              <p className="text-sm text-muted-foreground">Submitted</p>

              <p className="mt-1 font-medium">
                {formatDate(serviceRequest.createdAt)}
              </p>
            </div>

            {/* Confirmed */}
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>

              <p className="mt-1 font-medium">
                {formatDate(serviceRequest.confirmedAt)}
              </p>
            </div>

            {/* Assigned */}
            <div>
              <p className="text-sm text-muted-foreground">Assigned</p>

              <p className="mt-1 font-medium">
                {formatDate(serviceRequest.assignedAt)}
              </p>
            </div>

            {/* Completed */}
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>

              <p className="mt-1 font-medium">
                {formatDate(serviceRequest.completedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Service description */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Service Information</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {serviceRequest.service.description ||
              "No service description available."}
          </p>
        </div>

        {/* Request description */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Your Request</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {serviceRequest.description ||
              "No additional description provided."}
          </p>
        </div>

        {/* Uploaded image */}
        {serviceRequest.imageUrl && (
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Uploaded Image</h2>

            <div className="relative mt-4 h-72 w-full overflow-hidden rounded-lg border">
              <Image
                src={serviceRequest.imageUrl}
                alt="Service request image"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Payment action */}
        {serviceRequest.status === "APPROVED" && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
            <h2 className="text-lg font-semibold text-yellow-800">
              Payment Required
            </h2>

            <p className="mt-2 text-sm text-yellow-700">
              Your service request has been approved. Please complete the
              payment to continue the service process.
            </p>

            <button
              type="button"
              className="mt-4 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Pay Now
            </button>
          </div>
        )}

        {/* Current status */}
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Current Status</h2>

          <div className="mt-4">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStatusClassName()}`}
            >
              {formatStatus(serviceRequest.status)}
            </span>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default CitizenServiceRequestDetailsPage;
