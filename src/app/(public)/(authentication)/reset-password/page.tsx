import { Suspense } from "react";
import ResetPasswordForm from "@/components/form/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a new password for your account.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="animate-pulse space-y-5">
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-muted" />
                  <div className="h-12 rounded-lg bg-muted" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="h-12 rounded-lg bg-muted" />
                </div>

                <div className="h-12 rounded-lg bg-muted" />
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
