"use client";

import Link from "next/link";

import RoleGuard from "../../guard/role-guard";
import { useMyServiceRequests } from "@/hooks/service-request.hook";

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
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CitizenServiceRequestsPage = () => {
  const { data: serviceRequests, isLoading, isError } = useMyServiceRequests();

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">My Service Requests</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and track all the services you have requested.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border p-6">
            <div className="space-y-4">
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />

              <div className="h-20 animate-pulse rounded bg-muted" />

              <div className="h-20 animate-pulse rounded bg-muted" />

              <div className="h-20 animate-pulse rounded bg-muted" />
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-700">
              Failed to load service requests
            </h2>

            <p className="mt-1 text-sm text-red-600">
              Something went wrong while loading your service requests. Please
              try again.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading &&
          !isError &&
          (!serviceRequests || serviceRequests.length === 0) && (
            <div className="rounded-xl border p-10 text-center">
              <h2 className="text-lg font-semibold">No Service Requests</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                You have not submitted any service requests yet.
              </p>

              <Link
                href="/dashboard/citizen-dashboard/services"
                className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Browse Services
              </Link>
            </div>
          )}

        {/* Service Requests */}
        {!isLoading &&
          !isError &&
          serviceRequests &&
          serviceRequests.length > 0 && (
            <div className="overflow-hidden rounded-xl border">
              <div className="border-b p-5">
                <h2 className="font-semibold">Your Requests</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Total requests: {serviceRequests.length}
                </p>
              </div>

              <div className="divide-y">
                {serviceRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-5 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Request Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <h3 className="font-semibold">
                            {request.service.name}
                          </h3>

                          <span
                            className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                              request.status,
                            )}`}
                          >
                            {formatStatus(request.status)}
                          </span>
                        </div>

                        <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
                          <div>
                            <span className="font-medium text-foreground">
                              Location:
                            </span>{" "}
                            {request.location}
                          </div>

                          <div>
                            <span className="font-medium text-foreground">
                              Amount:
                            </span>{" "}
                            ৳{request.amount}
                          </div>

                          <div>
                            <span className="font-medium text-foreground">
                              Submitted:
                            </span>{" "}
                            {formatDate(request.createdAt)}
                          </div>
                        </div>

                        {request.payment && (
                          <div className="mt-3 text-sm">
                            <span className="font-medium">Payment:</span>{" "}
                            <span className="text-muted-foreground">
                              {request.payment.status}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action */}
                      <div>
                        <Link
                          href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                          className="inline-flex rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </RoleGuard>
  );
};

export default CitizenServiceRequestsPage;
