import { Skeleton } from "@/components/ui/skeleton";

export default function CitizenComplaintsLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <section className="space-y-3">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-lg" />
      </section>

      {/* Complaint Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32 max-w-full" />
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center">
        <Skeleton className="h-11 w-full flex-1 rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg md:w-44" />
        <Skeleton className="h-11 w-full rounded-lg md:w-40" />
        <Skeleton className="h-11 w-full rounded-lg md:w-36" />
      </section>

      {/* Complaint List Heading */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Complaint Cards */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <article
            key={index}
            className="space-y-4 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-3/4 max-w-md" />
                <Skeleton className="h-4 w-full max-w-xl" />
                <Skeleton className="h-4 w-2/3 max-w-lg" />
              </div>

              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-4 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
