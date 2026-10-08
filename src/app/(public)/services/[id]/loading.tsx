const ServiceDetailsLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Main Service Card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          {/* Service Image */}
          <div className="h-64 w-full animate-pulse bg-muted sm:h-80 lg:h-96" />

          <div className="space-y-8 p-5 sm:p-8 lg:p-10">
            {/* Title + Status */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full max-w-2xl space-y-3">
                <div className="h-9 w-3/4 animate-pulse rounded-lg bg-muted" />

                <div className="h-5 w-full animate-pulse rounded-md bg-muted" />

                <div className="h-5 w-5/6 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
            </div>

            {/* Service Information */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-7 w-28 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-7 w-32 animate-pulse rounded-md bg-muted" />
              </div>

              <div className="rounded-2xl border border-border p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 h-7 w-28 animate-pulse rounded-md bg-muted" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>
            </div>

            {/* Action */}
            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
              <div className="h-11 w-full animate-pulse rounded-xl bg-muted sm:w-40" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-muted sm:w-32" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsLoading;
