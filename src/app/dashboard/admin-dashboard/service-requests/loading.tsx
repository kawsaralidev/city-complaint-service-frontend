import { Skeleton } from "@/components/ui/skeleton";

export default function AdminServiceRequestsLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <section className="space-y-3">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </section>

      {/* Request Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32 max-w-full" />
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 lg:flex-row lg:items-center">
        <Skeleton className="h-11 w-full flex-1 rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg lg:w-44" />
        <Skeleton className="h-11 w-full rounded-lg lg:w-40" />
        <Skeleton className="h-11 w-full rounded-lg lg:w-36" />
      </section>

      {/* Request Table */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border p-5">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>

        {/* Table Header */}
        <div className="hidden grid-cols-7 gap-4 border-b border-border p-4 lg:grid">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full max-w-24" />
          ))}
        </div>

        {/* Request Rows */}
        <div className="divide-y divide-border">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-4">
              {/* Desktop Row */}
              <div className="hidden grid-cols-7 items-center gap-4 lg:grid">
                <Skeleton className="h-4 w-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-20 rounded-lg" />
              </div>

              {/* Mobile Request Card */}
              <div className="space-y-3 lg:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />

                <div className="flex justify-end">
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
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
