import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="overflow-hidden border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          {/* Left: Hero Content */}
          <div className="space-y-6">
            <div className="h-7 w-40 animate-pulse rounded-full bg-muted" />

            <div className="space-y-3">
              <div className="h-10 w-full max-w-xl animate-pulse rounded-lg bg-muted sm:h-12" />
              <div className="h-10 w-4/5 max-w-lg animate-pulse rounded-lg bg-muted sm:h-12" />
              <div className="h-10 w-3/5 max-w-md animate-pulse rounded-lg bg-muted sm:h-12" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full max-w-lg animate-pulse rounded bg-muted" />
              <div className="h-4 w-11/12 max-w-md animate-pulse rounded bg-muted" />
              <div className="h-4 w-3/4 max-w-sm animate-pulse rounded bg-muted" />
            </div>

            {/* Hero Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="h-12 w-40 animate-pulse rounded-xl bg-muted" />
              <div className="h-12 w-36 animate-pulse rounded-xl border border-border bg-background" />
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-5 pt-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Preview Skeleton */}
          <div className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="h-5 w-36 animate-pulse rounded bg-muted" />
                <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              </div>

              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            </div>

            {/* Stats Cards */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <div className="mb-3 h-9 w-9 animate-pulse rounded-xl bg-muted" />
                  <div className="mb-2 h-6 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-24 max-w-full animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="mb-5 flex items-center justify-between">
                <div className="h-5 w-32 animate-pulse rounded bg-muted" />
                <div className="h-4 w-16 animate-pulse rounded bg-muted" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-4 w-full max-w-48 animate-pulse rounded bg-muted" />
                      <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-6 w-16 shrink-0 animate-pulse rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
            <div className="mx-auto h-7 w-40 animate-pulse rounded-full bg-muted" />
            <div className="mx-auto h-8 w-full max-w-md animate-pulse rounded-lg bg-muted" />
            <div className="mx-auto h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-5 h-12 w-12 animate-pulse rounded-2xl bg-muted" />
                <div className="mb-3 h-5 w-40 max-w-full animate-pulse rounded bg-muted" />
                <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="border-y border-border bg-muted/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="w-full max-w-lg space-y-3">
              <div className="h-7 w-40 animate-pulse rounded-full bg-muted" />
              <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-full max-w-sm animate-pulse rounded bg-muted" />
            </div>

            <div className="h-10 w-36 animate-pulse rounded-xl bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="aspect-[16/9] animate-pulse bg-muted" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card px-6 py-12 sm:px-12 sm:py-16">
          <div className="mx-auto max-w-2xl space-y-5 text-center">
            <div className="mx-auto h-8 w-full max-w-md animate-pulse rounded-lg bg-muted" />
            <div className="mx-auto h-4 w-full max-w-lg animate-pulse rounded bg-muted" />
            <div className="mx-auto h-4 w-3/4 max-w-sm animate-pulse rounded bg-muted" />
            <div className="flex flex-wrap justify-center gap-4 pt-3">
              <div className="h-12 w-40 animate-pulse rounded-xl bg-muted" />
              <div className="h-12 w-36 animate-pulse rounded-xl border border-border bg-background" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
