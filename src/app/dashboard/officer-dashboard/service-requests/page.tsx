"use client";

import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { useState } from "react";

import {
  useAssignedServiceRequests,
  useUpdateServiceRequestStatus,
} from "@/hooks/service-request.hook";
import RoleGuard from "../../guard/role-guard";

const PAGE_LIMIT = 10;

const statusStyles: Record<string, string> = {
  ASSIGNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-green-100 text-green-700",
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export default function OfficerServiceRequestsPage() {
  const [page, setPage] = useState(1);
  const [updatingRequestId, setUpdatingRequestId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useAssignedServiceRequests();

  const updateStatusMutation = useUpdateServiceRequestStatus();

  const requests = data ?? [];

  const totalRequests = requests.length;
  const totalPages = Math.max(1, Math.ceil(totalRequests / PAGE_LIMIT));

  const startIndex = (page - 1) * PAGE_LIMIT;

  const currentRequests = requests.slice(startIndex, startIndex + PAGE_LIMIT);

  const handleStatusChange = (
    requestId: string,
    status: "IN_PROGRESS" | "COMPLETED",
  ) => {
    setUpdatingRequestId(requestId);

    updateStatusMutation.mutate(
      {
        id: requestId,
        data: {
          status,
        },
      },
      {
        onSettled: () => {
          setUpdatingRequestId(null);
        },
      },
    );
  };

  const handlePreviousPage = () => {
    setPage((previousPage) => Math.max(previousPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((previousPage) => Math.min(previousPage + 1, totalPages));
  };

  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="space-y-6 px-7 py-5">
        {/* Header */}
        <div>
          <h1 className="text-2xl mt-3 font-bold tracking-tight">
            Assigned Service Requests
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the service requests assigned to you.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border bg-background p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Loading service requests...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
            <p className="text-sm text-destructive">
              Failed to load service requests.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && requests.length === 0 && (
          <div className="rounded-xl border bg-background p-10 text-center">
            <h2 className="text-lg font-semibold">No Assigned Requests</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              You currently have no service requests assigned to you.
            </p>
          </div>
        )}

        {/* Service Requests */}
        {!isLoading && !isError && currentRequests.length > 0 && (
          <div className="grid gap-4">
            {currentRequests.map((request) => (
              <div
                key={request.id}
                className="overflow-hidden rounded-xl border bg-background shadow-sm"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative h-52 w-full shrink-0 bg-muted md:h-auto md:w-64">
                    {request.imageUrl ? (
                      <Image
                        src={request.imageUrl}
                        alt={request.service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {/* Service + Status */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h2 className="text-lg font-semibold">
                            {request.service.name}
                          </h2>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                            statusStyles[request.status] ??
                            "bg-muted text-muted-foreground"
                          }`}
                        >
                          {formatStatus(request.status)}
                        </span>
                      </div>

                      {/* Location + Date */}
                      <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-5">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{request.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      {request.description && (
                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {request.description}
                        </p>
                      )}
                    </div>

                    {/* Status Actions */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {request.status === "ASSIGNED" && (
                        <button
                          type="button"
                          disabled={updatingRequestId === request.id}
                          onClick={() =>
                            handleStatusChange(request.id, "IN_PROGRESS")
                          }
                          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingRequestId === request.id
                            ? "Updating..."
                            : "Start Work"}
                        </button>
                      )}

                      {request.status === "IN_PROGRESS" && (
                        <button
                          type="button"
                          disabled={updatingRequestId === request.id}
                          onClick={() =>
                            handleStatusChange(request.id, "COMPLETED")
                          }
                          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingRequestId === request.id
                            ? "Updating..."
                            : "Mark as Completed"}
                        </button>
                      )}

                      {request.status === "COMPLETED" && (
                        <span className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalRequests > PAGE_LIMIT && (
          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {Math.min(startIndex + PAGE_LIMIT, totalRequests)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {totalRequests}
              </span>{" "}
              requests
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <div className="rounded-md border px-4 py-2 text-sm font-medium">
                Page {page} of {totalPages}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="rounded-md border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
