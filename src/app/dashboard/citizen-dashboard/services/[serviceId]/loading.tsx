import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailsLoading() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Back Button */}
      <Skeleton className="h-10 w-32 rounded-lg" />

      {/* Service Header */}
      <section className="space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6">
        <Skeleton className="h-8 w-3/4 max-w-md" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-2/3 max-w-xl" />

        <div className="flex flex-wrap gap-3 pt-2">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
      </section>

      {/* Service Image and Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-xl" />

          <section className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </section>

          <section className="space-y-4 rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-6 w-44" />
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-start gap-3">
                <Skeleton className="mt-1 size-5 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-full max-w-md" />
              </div>
            ))}
          </section>
        </div>

        {/* Service Summary */}
        <aside className="h-fit space-y-5 rounded-xl border border-border bg-card p-5">
          <Skeleton className="h-6 w-40" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-32" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-40" />
          </div>

          <Skeleton className="h-11 w-full rounded-lg" />
        </aside>
      </div>
    </div>
  );
}
