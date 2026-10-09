const ServiceRequestDetailsLoading = () => {
  return (
    <main className="min-h-full bg-muted/20">
      <div className="mx-auto w-full max-w-[1500px] space-y-6 p-4 sm:p-6 lg:p-7">
        {/* Back Button */}
        <div className="h-9 w-36 animate-pulse rounded-xl bg-muted" />

        {/* Hero / Request Header */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="h-7 w-44 animate-pulse rounded-full bg-muted" />

              <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-muted" />

              <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />

              <div className="h-4 w-4/5 max-w-xl animate-pulse rounded bg-muted" />

              <div className="flex flex-wrap gap-2 pt-1">
                <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
                <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:w-64">
              <div className="h-4 w-28 animate-pulse rounded bg-muted" />
              <div className="h-8 w-36 animate-pulse rounded bg-muted" />
              <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />
              </div>

              <div className="mt-4 h-7 w-32 max-w-full animate-pulse rounded bg-muted" />

              <div className="mt-2 h-3.5 w-40 max-w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </section>

        {/* Main Content */}
        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          {/* Request Information */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex items-center gap-3 border-b border-border px-5 py-5 sm:px-6">
              <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

              <div className="space-y-2">
                <div className="h-5 w-44 animate-pulse rounded bg-muted" />
                <div className="h-3.5 w-56 max-w-full animate-pulse rounded bg-muted" />
              </div>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              {/* Service */}
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-56 max-w-full animate-pulse rounded bg-muted" />
                  <div className="h-3.5 w-40 max-w-full animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Description */}
              <div className="space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-px bg-border" />

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3.5 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-full max-w-md animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Dates */}
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-36 max-w-full animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>

              {/* Optional image */}
              <div className="space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                <div className="h-48 w-full animate-pulse rounded-2xl bg-muted sm:h-64" />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b border-border px-5 py-5">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded bg-muted" />
                  <div className="h-3.5 w-44 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-5 p-5">
                <div className="rounded-xl border border-border bg-muted/20 p-4">
                  <div className="h-3.5 w-24 animate-pulse rounded bg-muted" />
                  <div className="mt-3 h-8 w-36 animate-pulse rounded bg-muted" />
                </div>

                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-28 max-w-[55%] animate-pulse rounded bg-muted" />
                  </div>
                ))}

                <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
              </div>
            </section>

            {/* Request Progress */}
            <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-3 border-b border-border px-5 py-5">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-36 animate-pulse rounded bg-muted" />
                  <div className="h-3.5 w-44 animate-pulse rounded bg-muted" />
                </div>
              </div>

              <div className="space-y-5 p-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-muted" />
                      {index !== 3 && (
                        <div className="mt-2 h-8 w-0.5 bg-muted" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-2 pb-2">
                      <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                      <div className="h-3.5 w-full max-w-xs animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-5 w-44 animate-pulse rounded bg-muted" />
            <div className="h-3.5 w-64 max-w-full animate-pulse rounded bg-muted" />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="h-10 w-28 animate-pulse rounded-xl bg-muted" />
            <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceRequestDetailsLoading;
