"use client";

import {
  CheckCircle2,
  Clock3,
  CreditCard,
  ReceiptText,
  XCircle,
} from "lucide-react";

import { useMyPayments } from "@/hooks/payment.hook";
import type { PaymentStatus } from "@/types/payment";

const getStatusStyle = (status: PaymentStatus) => {
  switch (status) {
    case "PAID":
      return {
        className: "bg-green-100 text-green-700",
        icon: CheckCircle2,
        label: "Paid",
      };

    case "PENDING":
      return {
        className: "bg-yellow-100 text-yellow-700",
        icon: Clock3,
        label: "Pending",
      };

    case "FAILED":
      return {
        className: "bg-red-100 text-red-700",
        icon: XCircle,
        label: "Failed",
      };

    case "CANCELED":
      return {
        className: "bg-gray-100 text-gray-700",
        icon: XCircle,
        label: "Canceled",
      };

    default:
      return {
        className: "bg-muted text-muted-foreground",
        icon: Clock3,
        label: status,
      };
  }
};

const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return "—";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function CitizenPaymentsPage() {
  const { data: payments, isLoading, isError } = useMyPayments();

  if (isLoading) {
    return (
      <main className="p-4 md:p-6">
        <div className="mb-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-64 animate-pulse rounded-xl border bg-muted/40" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-4 md:p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load payments
          </h2>

          <p className="mt-2 text-sm text-red-600">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">My Payments</h1>

            <p className="text-sm text-muted-foreground">
              View your payment history and transaction status.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {!payments || payments.length === 0 ? (
        <div className="rounded-xl border bg-background p-10 text-center">
          <ReceiptText className="mx-auto h-12 w-12 text-muted-foreground" />

          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No payments yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your payment history will appear here after you make a payment.
          </p>
        </div>
      ) : (
        /* Responsive Table */
        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Method
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Payment Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {payments.map((payment) => {
                  const status = getStatusStyle(payment.status);
                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-muted/30"
                    >
                      {/* Payment */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <ReceiptText className="h-4 w-4 text-primary" />
                          </div>

                          <div>
                            <p className="font-medium text-foreground">
                              Service Payment
                            </p>

                            <p className="text-xs text-muted-foreground">
                              Paid via Stripe
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">
                          {payment.amount} {payment.currency}
                        </p>
                      </td>

                      {/* Payment Method */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-foreground">Stripe</span>
                      </td>

                      {/* Payment Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-foreground">
                          {formatDate(payment.paidAt || payment.initiatedAt)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
