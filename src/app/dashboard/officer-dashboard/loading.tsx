import { Skeleton } from "@/components/ui/skeleton";

export default function OfficerDashboardLoading() {
  return (
    <div className="min-h-full bg-muted/20">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Dashboard Header */}
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-2xl space-y-4">
              <Skeleton className="h-7 w-36 rounded-full" />
              <Skeleton className="h-9 w-64 max-w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full max-w-xl" />
                <Skeleton className="h-4 w-4/5 max-w-lg" />
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-2 gap-3 sm:min-w-[300px]">
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-4 rounded-xl border border-border bg-muted/20 p-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="size-9 rounded-lg" />
                    <Skeleton className="size-4 rounded" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 max-w-full" />
                    <Skeleton className="h-3 w-32 max-w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-20" />
                </div>
                <Skeleton className="size-11 rounded-xl" />
              </div>

              <Skeleton className="mt-4 h-3 w-40 max-w-full" />
            </div>
          ))}
        </section>

        {/* Recent Service Requests */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="h-5 w-48" />
              </div>
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-5 sm:p-6">
                <Skeleton className="size-10 shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-48 max-w-full" />
                  <Skeleton className="h-3 w-64 max-w-full" />
                </div>

                <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Complaints */}
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Skeleton className="size-9 rounded-lg" />
                <Skeleton className="h-5 w-44" />
              </div>
              <Skeleton className="h-4 w-56 max-w-full" />
            </div>

            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>

          <div className="divide-y divide-border">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-5 sm:p-6">
                <Skeleton className="size-10 shrink-0 rounded-xl" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-52 max-w-full" />
                  <Skeleton className="h-3 w-64 max-w-full" />
                </div>

                <Skeleton className="h-7 w-24 shrink-0 rounded-full" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer Insight */}
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-56 max-w-full" />
            <Skeleton className="h-3 w-full max-w-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
