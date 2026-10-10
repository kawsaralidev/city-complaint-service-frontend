import { Suspense } from "react";
import { RegisterForm } from "@/components/form/registerForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your CityCare account
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

                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-muted" />
                  <div className="h-12 rounded-lg bg-muted" />
                </div>

                <div className="h-12 rounded-lg bg-muted" />
              </div>
            }
          >
            <RegisterForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
