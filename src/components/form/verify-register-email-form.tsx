"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useVerifyRegisterEmail } from "@/hooks/auth.hook";
import { useQueryClient } from "@tanstack/react-query";

export function VerifyRegisterEmailForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const verifyMutation = useVerifyRegisterEmail();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Get registration email from session storage
    const registrationEmail = sessionStorage.getItem("registrationEmail");

    if (!registrationEmail) {
      router.replace("/register");
      return;
    }

    setEmail(registrationEmail);
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (otp.length !== 6) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    try {
      const response = await verifyMutation.mutateAsync({
        email,
        otp,
      });

      // Store the newly verified user in React Query cache
      queryClient.setQueryData(["current-user"], {
        success: true,
        message: response.message,
        data: response.data,
      });

      sessionStorage.removeItem("registrationEmail");

      // Go to home after successful verification
      router.push("/");
    } catch (error: any) {
      setErrorMessage(
        error?.data?.message ||
          error?.message ||
          "Failed to verify email. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Verify Your Email
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              We have sent a 6-digit OTP to your email address.
            </p>

            {email && (
              <p className="mt-3 break-all text-sm font-medium text-secondary">
                {email}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Verification Code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={otp}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "");
                  setOtp(value);
                }}
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              />
            </div>

            {errorMessage && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={verifyMutation.isPending || otp.length !== 6}
              className="w-full rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground transition hover:shadow-lg hover:shadow-secondary/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-sm font-medium text-secondary transition hover:underline"
            >
              Back to Register
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
