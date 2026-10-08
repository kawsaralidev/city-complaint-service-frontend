"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ReceiptText,
} from "lucide-react";

import RoleGuard from "../../guard/role-guard";
import { useMyServiceRequests } from "@/hooks/service-request.hook";
import { useCreatePayment } from "@/hooks/payment.hook";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";

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
      return "border-gray-200 bg-gray-50 text-gray-700";

    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
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

  const paymentMutation = useCreatePayment();

  const handlePayment = (serviceRequestId: string) => {
    paymentMutation.mutate(
      {
        serviceRequestId,
      },
      {
        onSuccess: (data) => {
          window.location.href = data.checkoutUrl;
        },
      },
    );
  };

  const getPaymentAction = (
    request: NonNullable<typeof serviceRequests>[number],
  ) => {
    const paymentStatus = request.payment?.status;

    /*
     * Payment already completed
     */
    if (
      paymentStatus === "PAID" ||
      request.status === "CONFIRMED" ||
      request.status === "COMPLETED"
    ) {
      return (
        <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3.5 py-2 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </div>
      );
    }

    /*
     * Admin has approved the request
     * OR user previously opened Stripe checkout
     * but did not complete payment.
     */
    if (request.status === "APPROVED" || request.status === "PAYMENT_PENDING") {
      const isCurrentPayment =
        paymentMutation.isPending &&
        paymentMutation.variables?.serviceRequestId === request.id;

      return (
        <button
          type="button"
          onClick={() => handlePayment(request.id)}
          disabled={paymentMutation.isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCurrentPayment ? "Processing..." : "Pay Now"}

          {!isCurrentPayment && <ArrowRight className="h-4 w-4" />}
        </button>
      );
    }

    /*
     * Request is still waiting for admin approval
     */
    if (request.status === "PENDING") {
      return (
        <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700">
          <Clock3 className="h-4 w-4" />
          Pending
        </div>
      );
    }

    /*
     * Rejected / canceled / other states
     */
    return <span className="text-sm font-medium text-muted-foreground">—</span>;
  };

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-7 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Citizen Dashboard
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              My Service Requests
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              View your requested services, track their progress, and complete
              payments when your request is approved.
            </p>
          </div>

          <Link
            href="/dashboard/citizen-dashboard/services"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Browse Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="border-b border-border p-5">
              <div className="h-5 w-40 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
            </div>

            <div className="space-y-4 p-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
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
            <div className="rounded-2xl border border-border bg-background p-10 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ReceiptText className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No Service Requests
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                You have not submitted any service requests yet.
              </p>

              <Link
                href="/dashboard/citizen-dashboard/services"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Browse Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

        {/* Service Requests */}
        {!isLoading &&
          !isError &&
          serviceRequests &&
          serviceRequests.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
              {/* Table Header */}
              <div className="border-b border-border bg-muted/20 px-5 py-5 sm:px-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Your Requests</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {serviceRequests.length} total service{" "}
                      {serviceRequests.length === 1 ? "request" : "requests"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/10 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Service
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Location
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Amount
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Submitted
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Payment
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {serviceRequests.map((request) => (
                      <tr
                        key={request.id}
                        className="group transition-colors hover:bg-muted/20"
                      >
                        {/* Service */}
                        <td className="px-6 py-5">
                          <div className="max-w-[220px]">
                            <p className="truncate font-semibold text-foreground">
                              {request.service.name}
                            </p>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0 text-primary" />
                            <span className="max-w-[150px] truncate">
                              {request.location}
                            </span>
                          </div>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-5">
                          <span className="font-semibold text-foreground">
                            ৳{request.amount}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4 shrink-0" />
                            {formatDate(request.createdAt)}
                          </div>
                        </td>

                        {/* Request Status */}
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              request.status,
                            )}`}
                          >
                            {formatStatus(request.status)}
                          </span>
                        </td>

                        {/* Payment Action */}
                        <td className="px-6 py-5">
                          {getPaymentAction(request)}
                        </td>

                        {/* Details */}
                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                          >
                            View
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="divide-y divide-border md:hidden">
                {serviceRequests.map((request) => (
                  <div key={request.id} className="space-y-5 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold">
                          {request.service.name}
                        </h3>

                        <p className="mt-1 text-xs text-muted-foreground">
                          ID: {request.id.slice(0, 8)}...
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {formatStatus(request.status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Location
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 font-medium">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="truncate">{request.location}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>

                        <p className="mt-1 font-semibold">৳{request.amount}</p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Submitted
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 font-medium">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {formatDate(request.createdAt)}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Payment</p>

                        <div className="mt-1">{getPaymentAction(request)}</div>
                      </div>
                    </div>

                    <Link
                      href={`/dashboard/citizen-dashboard/service-request/${request.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
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
