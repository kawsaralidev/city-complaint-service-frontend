import { Skeleton } from "@/components/ui/skeleton";

export default function OfficerComplaintsLoading() {
  return (
    <div className="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-64 max-w-full" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>

          <Skeleton className="h-10 w-36 rounded-lg" />
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
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-16" />
              </div>

              <Skeleton className="size-11 rounded-xl" />
            </div>
          </div>
        ))}
      </section>

      {/* Search and Filters */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Skeleton className="h-10 w-full rounded-lg lg:flex-1" />

          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Skeleton className="h-10 w-full rounded-lg sm:w-36" />
            <Skeleton className="h-10 w-full rounded-lg sm:w-36" />
          </div>
        </div>
      </section>

      {/* Complaint Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-4 w-24" />
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <article
            key={index}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <Skeleton className="size-12 shrink-0 rounded-xl" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <Skeleton className="h-5 w-64 max-w-full" />
                  <Skeleton className="h-7 w-28 rounded-full" />
                </div>

                <Skeleton className="h-4 w-full max-w-2xl" />
                <Skeleton className="h-4 w-4/5 max-w-xl" />

                <div className="flex flex-wrap gap-3 pt-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <Skeleton className="h-4 w-36" />

              <div className="flex gap-2">
                <Skeleton className="h-9 w-24 rounded-lg" />
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <Skeleton className="h-4 w-40" />

        <div className="flex gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
