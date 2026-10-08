"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

interface AdminDashboardErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const AdminDashboardError = ({ error, reset }: AdminDashboardErrorProps) => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-muted/20 px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-red-200 bg-background shadow-[0_12px_40px_rgba(15,23,42,0.08)] dark:border-red-500/20">
          {/* Header */}

          <div className="border-b border-red-100 bg-red-50/70 px-6 py-6 dark:border-red-500/10 dark:bg-red-500/5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <AlertTriangle className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">
                  Dashboard Error
                </p>

                <h1 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                  Unable to load dashboard
                </h1>
              </div>
            </div>
          </div>

          {/* Content */}

          <div className="px-6 py-7 sm:px-8">
            <p className="text-sm leading-6 text-muted-foreground">
              Something went wrong while loading the admin dashboard. Please try
              again. If the problem continues, check your connection and try
              again later.
            </p>

            {error?.message && (
              <div className="mt-5 rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs font-semibold text-muted-foreground">
                  Error details
                </p>

                <p className="mt-2 break-words text-xs leading-5 text-foreground">
                  {error.message}
                </p>
              </div>
            )}

            {/* Action */}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardError;
