"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => {
      router.replace("/dashboard/citizen-dashboard/payments");
    }, 3000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-9 w-9 text-green-600" />
        </div>

        {/* Message */}
        <h1 className="mt-5 text-2xl font-bold text-foreground">
          Payment Successful
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Your payment has been successfully completed. Your payment details are
          now available in your payment history.
        </p>

        {/* Redirect message */}
        <div className="mt-6 rounded-lg bg-muted/50 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Redirecting to your payments in{" "}
            <span className="font-semibold text-foreground">{countdown}</span>{" "}
            seconds...
          </p>
        </div>
      </div>
    </main>
  );
}
