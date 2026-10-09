const ServiceRequestsLoading = () => {
  return (
    <main className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
        {/* Hero Skeleton */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-7 w-48 animate-pulse rounded-lg bg-muted" />

              <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-muted" />

              <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />

              <div className="h-4 w-3/4 max-w-xl animate-pulse rounded bg-muted" />
            </div>

            <div className="h-11 w-40 shrink-0 animate-pulse rounded-xl bg-muted" />
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              </div>

              <div className="mt-5 h-4 w-28 animate-pulse rounded bg-muted" />

              <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />

              <div className="mt-2 h-3 w-36 max-w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </section>

        {/* Requests Table */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Table Header */}
          <div className="border-b border-border bg-gradient-to-r from-primary/5 via-card to-secondary/5 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded bg-muted" />

                  <div className="h-3.5 w-56 max-w-full animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="h-7 w-36 animate-pulse rounded-full bg-muted" />
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden grid-cols-[25%_13%_10%_13%_14%_15%_10%] gap-0 border-b border-border bg-muted/30 px-4 py-4 md:grid">
            {[
              "Service",
              "Location",
              "Amount",
              "Submitted",
              "Status",
              "Payment",
              "Details",
            ].map((label) => (
              <div key={label} className="px-2">
                <div className="h-3 w-16 max-w-full animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>

          {/* Request Rows */}
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="px-5 py-5 sm:px-6">
                {/* Desktop Row */}
                <div className="hidden items-center gap-3 md:grid md:grid-cols-[25%_13%_10%_13%_14%_15%_10%]">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="h-4 w-16 max-w-full animate-pulse rounded bg-muted" />
                  </div>

                  <div className="px-2">
                    <div className="h-4 w-14 max-w-full animate-pulse rounded bg-muted" />
                  </div>

                  <div className="px-2">
                    <div className="h-4 w-16 max-w-full animate-pulse rounded bg-muted" />
                  </div>

                  <div className="px-2">
                    <div className="h-7 w-20 max-w-full animate-pulse rounded-full bg-muted" />
                  </div>

                  <div className="px-2">
                    <div className="h-9 w-24 max-w-full animate-pulse rounded-xl bg-muted" />
                  </div>

                  <div className="flex justify-end px-1">
                    <div className="h-9 w-14 animate-pulse rounded-xl bg-muted" />
                  </div>
                </div>

                {/* Mobile Card */}
                <div className="flex items-start gap-3 md:hidden">
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

                    <div className="h-3 w-32 max-w-full animate-pulse rounded bg-muted" />

                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                      <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <div className="h-9 w-24 animate-pulse rounded-xl bg-muted" />
                      <div className="h-9 w-16 animate-pulse rounded-xl bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="h-4 w-48 max-w-full animate-pulse rounded bg-muted" />

            <div className="flex items-center gap-2">
              <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
              <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceRequestsLoading;
