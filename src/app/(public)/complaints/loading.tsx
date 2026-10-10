import { Search, SlidersHorizontal } from "lucide-react";

export default function ComplaintsLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="mx-auto h-8 w-64 max-w-full animate-pulse rounded-lg bg-muted" />

            <div className="mx-auto h-4 w-full max-w-xl animate-pulse rounded bg-muted" />

            <div className="mx-auto h-4 w-3/4 max-w-md animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-background px-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />

            <div className="h-4 w-full max-w-sm animate-pulse rounded bg-muted" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex min-h-12 min-w-36 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>

            <div className="min-h-12 min-w-32 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>

        {/* Complaint Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              {/* Category and Status */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
              </div>

              {/* Title */}
              <div className="mb-3 space-y-2">
                <div className="h-5 w-full animate-pulse rounded bg-muted" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              </div>

              {/* Description */}
              <div className="mb-5 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              </div>

              {/* Complaint Details */}
              <div className="mt-auto space-y-4 border-t border-border pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-9 w-9 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
