import { Skeleton } from "@/components/ui/skeleton";

export default function OfficerServiceRequestsLoading() {
  return (
    <div className="space-y-5 p-4 pb-8 sm:p-6 lg:p-7">
      {/* Header */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="mt-3 h-8 w-64 max-w-full" />
        <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      </section>

      {/* Service Request Cards */}
      {Array.from({ length: 3 }).map((_, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              {/* Service Image */}
              <Skeleton className="h-48 w-full shrink-0 rounded-xl sm:h-36 sm:w-44" />

              {/* Request Information */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-56 max-w-full" />
                    <Skeleton className="h-4 w-full max-w-xl" />
                    <Skeleton className="h-4 w-4/5 max-w-lg" />
                  </div>

                  <Skeleton className="h-7 w-28 shrink-0 rounded-full" />
                </div>

                {/* Request Details */}
                <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, infoIndex) => (
                    <div key={infoIndex} className="space-y-2">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-24 max-w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="border-t border-border p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 max-w-full" />
                <Skeleton className="h-3 w-64 max-w-full" />
              </div>

              <Skeleton className="h-11 w-full rounded-lg sm:w-52" />
            </div>
          </div>
        </article>
      ))}

      {/* Pagination */}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-4 w-44" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
