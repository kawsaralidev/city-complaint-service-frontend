import Link from "next/link";
import { ArrowLeft, CreditCard, XCircle } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        {/* Cancel Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-9 w-9 text-red-600" />
        </div>

        {/* Message */}
        <h1 className="mt-5 text-2xl font-bold text-foreground">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your payment was cancelled before it was completed. No successful
          payment was made.
        </p>

        {/* Information */}
        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-left">
          <div className="flex items-start gap-3">
            <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-semibold text-foreground">
                Payment not completed
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                You can return to your payment history and continue with your
                service request later.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/citizen-dashboard/payments"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <CreditCard className="h-4 w-4" />
            Payment History
          </Link>

          <Link
            href="/dashboard/citizen-dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
