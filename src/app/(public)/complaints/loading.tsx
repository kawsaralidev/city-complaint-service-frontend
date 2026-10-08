const ComplaintsLoading = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-2xl space-y-3">
            <div className="h-9 w-52 animate-pulse rounded-lg bg-muted" />

            <div className="h-5 w-full animate-pulse rounded-md bg-muted" />

            <div className="h-5 w-4/5 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="h-10 w-40 animate-pulse rounded-xl bg-muted" />
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:flex-1" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:w-40" />

            <div className="h-11 w-full animate-pulse rounded-xl bg-muted md:w-40" />
          </div>
        </div>

        {/* Complaint Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Image */}
              <div className="h-48 animate-pulse bg-muted" />

              <div className="space-y-4 p-5">
                {/* Status + date */}
                <div className="flex items-center justify-between gap-3">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />

                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>

                {/* Title */}
                <div className="h-6 w-4/5 animate-pulse rounded-md bg-muted" />

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />

                  <div className="h-4 w-full animate-pulse rounded bg-muted" />

                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>

                {/* Location */}
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />

                {/* Button */}
                <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
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

export default ComplaintsLoading;
