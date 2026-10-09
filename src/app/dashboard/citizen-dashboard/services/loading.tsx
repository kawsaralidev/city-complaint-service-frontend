import { Skeleton } from "@/components/ui/skeleton";

export default function CitizenServicesLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Hero Section */}
      <section className="space-y-3 rounded-xl border border-border bg-card p-5 sm:p-6">
        <Skeleton className="h-8 w-64 max-w-full" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-3/4 max-w-md" />
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-10 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-36 max-w-full" />
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
        <Skeleton className="h-11 w-full flex-1 rounded-lg" />
        <Skeleton className="h-11 w-full rounded-lg sm:w-40" />
        <Skeleton className="h-11 w-full rounded-lg sm:w-32" />
      </section>

      {/* Section Heading */}
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-xl border border-border bg-card"
          >
            <Skeleton className="aspect-video w-full rounded-none" />

            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-9 w-28 rounded-lg" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <Skeleton className="h-9 w-20 rounded-lg" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="size-9 rounded-lg" />
        ))}
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}
