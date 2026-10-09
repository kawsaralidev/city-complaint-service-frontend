import { Skeleton } from "@/components/ui/skeleton";

export default function CitizenPaymentsLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <section className="space-y-3">
        <Skeleton className="h-8 w-56 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </section>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-40 max-w-full" />
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center">
        <Skeleton className="h-11 w-full flex-1 rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg md:w-44" />
        <Skeleton className="h-11 w-full rounded-lg md:w-36" />
      </section>

      {/* Payments Table */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>

        {/* Table Header */}
        <div className="hidden grid-cols-6 gap-4 border-b border-border p-4 md:grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full max-w-24" />
          ))}
        </div>

        {/* Payment Rows */}
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4">
              {/* Desktop Row */}
              <div className="hidden grid-cols-6 items-center gap-4 md:grid">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>

              {/* Mobile Payment Card */}
              <div className="space-y-3 md:hidden">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-lg" />
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="size-9 rounded-lg" />
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
