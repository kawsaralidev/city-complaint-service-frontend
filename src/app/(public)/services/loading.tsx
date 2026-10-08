const ServicesLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />

          <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-muted" />
        </div>

        {/* Search & Filters */}
        <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:flex-1" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:w-40" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:w-40" />
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border bg-card shadow-sm"
            >
              <div className="h-48 animate-pulse bg-muted" />

              <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />

                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />

                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />

                  <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    </main>
  );
};

export default ServicesLoading;
