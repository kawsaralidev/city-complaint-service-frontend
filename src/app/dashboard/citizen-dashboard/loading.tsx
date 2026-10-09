const CitizenDashboardLoading = () => {
  return (
    <main className="min-h-full overflow-hidden bg-muted/20">
      <div className="space-y-6 p-4 sm:p-6 lg:p-7">
        {/* =====================================================
            HERO SKELETON
        ====================================================== */}

        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7 lg:p-8">
          <div className="space-y-4">
            {/* Dashboard Badge */}
            <div className="h-7 w-36 animate-pulse rounded-full bg-muted" />

            {/* Heading */}
            <div className="h-9 w-64 animate-pulse rounded-lg bg-muted sm:w-80" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />

              <div className="h-4 w-3/4 max-w-xl animate-pulse rounded bg-muted" />
            </div>

            {/* Mini statistics */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />

              <div className="h-8 w-32 animate-pulse rounded-full bg-muted" />

              <div className="h-8 w-28 animate-pulse rounded-full bg-muted" />
            </div>
          </div>

          {/* Create Complaint button */}
          <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-muted sm:w-40 lg:absolute lg:right-8 lg:top-8 lg:mt-0" />
        </section>

        {/* =====================================================
            STATISTICS SKELETON
        ====================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  {/* Label */}
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />

                  {/* Number */}
                  <div className="h-9 w-16 animate-pulse rounded bg-muted" />

                  {/* Description */}
                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>

                {/* Icon */}
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />
              </div>

              {/* Progress */}
              <div className="mt-4 h-1.5 w-full animate-pulse rounded-full bg-muted" />
            </div>
          ))}
        </section>

        {/* =====================================================
            RECENT COMPLAINTS + SERVICE REQUESTS
        ====================================================== */}

        <section className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          {/* ===================================================
              RECENT COMPLAINTS
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />

                  <div className="space-y-2">
                    {/* Title */}
                    <div className="h-5 w-40 animate-pulse rounded bg-muted" />

                    {/* Subtitle */}
                    <div className="h-3.5 w-52 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                {/* View All */}
                <div className="h-4 w-14 animate-pulse rounded bg-muted" />
              </div>
            </div>

            {/* Complaint rows */}
            <div className="divide-y divide-border">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 sm:px-6"
                >
                  {/* Icon */}
                  <div className="hidden h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted sm:block" />

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 max-w-[260px] animate-pulse rounded bg-muted" />

                    <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                  </div>

                  {/* Status */}
                  <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted sm:block" />

                  {/* Arrow */}
                  <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>

          {/* ===================================================
              SERVICE REQUESTS
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />

                  <div className="space-y-2">
                    {/* Title */}
                    <div className="h-5 w-40 animate-pulse rounded bg-muted" />

                    {/* Subtitle */}
                    <div className="h-3.5 w-48 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                {/* View All */}
                <div className="h-4 w-14 animate-pulse rounded bg-muted" />
              </div>

              {/* Request summary */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-muted/40 p-3"
                  >
                    <div className="h-3 w-12 animate-pulse rounded bg-muted" />

                    <div className="mt-2 h-6 w-8 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>

            {/* Service request rows */}
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 sm:px-6"
                >
                  {/* Icon */}
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

                    <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                  </div>

                  {/* Status */}
                  <div className="hidden h-7 w-20 animate-pulse rounded-full bg-muted md:block" />

                  {/* Arrow */}
                  <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SERVICE REQUEST PROGRESS + QUICK ACTIONS
        ====================================================== */}

        <section className="grid gap-6 lg:grid-cols-2">
          {/* ===================================================
              SERVICE REQUEST PROGRESS
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />

                  <div className="space-y-2">
                    {/* Title */}
                    <div className="h-5 w-48 animate-pulse rounded bg-muted" />

                    {/* Description */}
                    <div className="h-3.5 w-64 animate-pulse rounded bg-muted" />
                  </div>
                </div>

                {/* Active badge */}
                <div className="h-7 w-20 animate-pulse rounded-full bg-muted" />
              </div>

              {/* Statistics */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-muted/30 p-3"
                  >
                    <div className="h-3 w-12 animate-pulse rounded bg-muted" />

                    <div className="mt-2 h-6 w-8 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===================================================
              QUICK ACTIONS
          ==================================================== */}

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Header */}
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-xl bg-muted" />

                <div className="space-y-2">
                  <div className="h-5 w-32 animate-pulse rounded bg-muted" />

                  <div className="h-3.5 w-52 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-3.5"
                >
                  {/* Icon */}
                  <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-muted" />

                  {/* Text */}
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded bg-muted" />

                    <div className="h-3 w-36 animate-pulse rounded bg-muted" />
                  </div>

                  {/* Arrow */}
                  <div className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            INFORMATION CARDS
        ====================================================== */}

        <section className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />

                <div className="min-w-0 flex-1">
                  {/* Title */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />

                    <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                  </div>

                  {/* Description */}
                  <div className="mt-3 space-y-2">
                    <div className="h-3.5 w-full animate-pulse rounded bg-muted" />

                    <div className="h-3.5 w-5/6 animate-pulse rounded bg-muted" />

                    <div className="h-3.5 w-2/3 animate-pulse rounded bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default CitizenDashboardLoading;
