import { Suspense } from "react";
import { LoginForm } from "@/components/form/loginForm";

export default function LoginPage() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
            <div className="w-full max-w-md animate-pulse space-y-5 rounded-2xl border border-border bg-background p-8 shadow-sm">
              <div className="mx-auto h-8 w-48 rounded-lg bg-muted" />

              <div className="mx-auto h-4 w-56 max-w-full rounded bg-muted" />

              <div className="space-y-2 pt-4">
                <div className="h-4 w-28 rounded bg-muted" />
                <div className="h-12 rounded-lg bg-muted" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-20 rounded bg-muted" />
                <div className="h-12 rounded-lg bg-muted" />
              </div>

              <div className="h-12 rounded-lg bg-muted" />
              <div className="h-4 w-40 mx-auto rounded bg-muted" />
              <div className="h-10 rounded-lg bg-muted" />
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
