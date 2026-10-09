import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100svh-72px)] bg-background">
        <div className="mx-auto grid w-full items-center gap-10 px-[4vw] py-10 sm:px-[5vw] sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[4vw] lg:py-16 2xl:px-[6vw]">
          {/* Hero Content */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-64 max-w-full rounded-full" />

            <div className="space-y-3">
              <Skeleton className="h-12 w-full max-w-xl sm:h-16" />
              <Skeleton className="h-12 w-4/5 max-w-lg sm:h-16" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-4/5 max-w-lg" />
            </div>

            {/* Hero Buttons */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Skeleton className="h-12 w-full rounded-xl sm:w-48" />
              <Skeleton className="h-12 w-full rounded-xl sm:w-44" />
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap gap-x-6 gap-y-4 pt-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton className="size-7 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>

            {/* Bottom Highlight */}
            <div className="flex items-center gap-4 border-t border-border pt-5">
              <div className="flex -space-x-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="size-9 rounded-full border-2 border-background"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-44 max-w-full" />
                <Skeleton className="h-3 w-56 max-w-full" />
              </div>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-border bg-card shadow-xl lg:max-w-none">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            <div className="space-y-5 bg-muted/20 p-4 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-7 w-48 max-w-full" />
                </div>
                <Skeleton className="h-7 w-24 rounded-full" />
              </div>

              <div className="space-y-5 rounded-[22px] bg-secondary p-5">
                <div className="flex justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-3 w-32 bg-white/20" />
                    <Skeleton className="h-4 w-40 max-w-full bg-white/20" />
                  </div>
                  <Skeleton className="size-10 rounded-xl bg-white/20" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-28 bg-white/20" />
                    <Skeleton className="h-3 w-10 bg-white/20" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full bg-white/20" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="space-y-3 rounded-xl border border-border bg-card p-4"
                  >
                    <Skeleton className="size-8 rounded-lg" />
                    <Skeleton className="h-3 w-24 max-w-full" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-card p-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-[4vw] py-16 sm:px-[5vw] sm:py-20">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-40 rounded-full" />
          <Skeleton className="mx-auto h-9 w-full max-w-xl" />
          <Skeleton className="mx-auto h-4 w-full max-w-2xl" />
          <Skeleton className="mx-auto h-4 w-4/5 max-w-xl" />
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <Skeleton className="size-12 rounded-2xl" />
              <Skeleton className="mt-6 h-5 w-40 max-w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="bg-muted/20 px-[4vw] py-16 sm:px-[5vw] sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full space-y-3">
            <Skeleton className="h-8 w-44 rounded-full" />
            <Skeleton className="h-9 w-full max-w-lg" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
          <Skeleton className="h-10 w-36 shrink-0 rounded-xl" />
        </div>

        <div className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <Skeleton className="h-48 w-full rounded-none sm:h-52" />

              <div className="space-y-4 p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="size-9 rounded-full" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why Choose CityCare Section */}
      <section className="px-[4vw] py-16 sm:px-[5vw] sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          {/* Left Feature */}
          <div className="space-y-5">
            <Skeleton className="h-8 w-44 rounded-full" />
            <Skeleton className="h-9 w-full max-w-lg" />
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-4/5 max-w-lg" />

            <div className="grid grid-cols-2 gap-4 pt-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <Skeleton className="size-9 rounded-lg" />
                  <Skeleton className="mt-4 h-5 w-24 max-w-full" />
                  <Skeleton className="mt-2 h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Feature Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-border bg-card p-6 sm:p-7"
              >
                <div className="flex justify-between">
                  <Skeleton className="size-12 rounded-2xl" />
                  <Skeleton className="h-8 w-8" />
                </div>

                <Skeleton className="mt-8 h-5 w-36 max-w-full" />
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <Skeleton className="h-px flex-1" />
                  <Skeleton className="size-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-[4vw] py-16 sm:px-[5vw] sm:py-20">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-48 rounded-full" />
          <Skeleton className="mx-auto h-9 w-full max-w-xl" />
          <Skeleton className="mx-auto h-4 w-full max-w-2xl" />
          <Skeleton className="mx-auto h-4 w-4/5 max-w-xl" />
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-border bg-card p-7 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="size-14 rounded-2xl" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>

              <Skeleton className="mt-8 h-7 w-64 max-w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              <div className="mt-6 space-y-3">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </div>

              <Skeleton className="mt-8 h-11 w-44 rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
