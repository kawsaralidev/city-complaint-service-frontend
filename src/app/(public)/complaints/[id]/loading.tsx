const ComplaintDetailsLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="h-10 w-32 animate-pulse rounded-xl bg-muted" />

        {/* Main complaint card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          {/* Image */}
          <div className="h-64 w-full animate-pulse bg-muted sm:h-80" />

          <div className="space-y-7 p-5 sm:p-8">
            {/* Title + status */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full max-w-2xl space-y-3">
                <div className="h-9 w-3/4 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-40 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
            </div>

            {/* Complaint description */}
            <div className="space-y-3">
              <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
              </div>
            </div>

            {/* Information cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-6 w-36 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-6 w-32 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-6 w-40 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-6 w-28 animate-pulse rounded-md bg-muted" />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <div className="h-6 w-28 animate-pulse rounded-md bg-muted" />

              <div className="h-20 w-full animate-pulse rounded-2xl bg-muted" />
            </div>

            {/* Status timeline */}
            <div className="space-y-4">
              <div className="h-6 w-36 animate-pulse rounded-md bg-muted" />

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />

                    <div className="space-y-2">
                      <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-36 animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
              <div className="h-11 w-full animate-pulse rounded-xl bg-muted sm:w-40" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-muted sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ComplaintDetailsLoading;
