import type { HTMLAttributes } from "react";

/* =========================================================
   VISIBLE SHIMMER SKELETON
========================================================= */

const Shimmer = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`relative overflow-hidden rounded-md bg-slate-200 dark:bg-slate-700 ${className}`}
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -translate-x-full
          animate-[shimmer_1.4s_ease-in-out_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/90
          to-transparent
          dark:via-slate-400/30
        "
      />
    </div>
  );
};

/* =========================================================
   ADMIN DASHBOARD LOADING
========================================================= */

const AdminDashboardLoading = () => {
  return (
    <>
      {/* =====================================================
          SHIMMER ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-120%);
            }

            100% {
              transform: translateX(120%);
            }
          }
        `}
      </style>

      <div className="min-h-full bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
          {/* =================================================
              HERO
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_5px_20px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full max-w-3xl">
                <Shimmer className="h-8 w-36 rounded-full" />

                <Shimmer className="mt-5 h-11 w-full max-w-lg rounded-lg" />

                <Shimmer className="mt-4 h-5 w-full max-w-2xl rounded-md" />

                <div className="mt-6 flex flex-wrap gap-3">
                  <Shimmer className="h-8 w-40 rounded-full" />

                  <Shimmer className="h-8 w-32 rounded-full" />
                </div>
              </div>

              <Shimmer className="hidden h-28 w-28 rounded-[28px] lg:block" />
            </div>
          </section>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <Shimmer className="h-4 w-28" />

                    <Shimmer className="h-10 w-28 rounded-lg" />
                  </div>

                  <Shimmer className="h-12 w-12 rounded-xl" />
                </div>

                <Shimmer className="mt-5 h-4 w-44" />
              </div>
            ))}
          </section>

          {/* =================================================
              ATTENTION + USER DISTRIBUTION
          ================================================= */}

          <section className="grid gap-6 xl:grid-cols-3">
            {/* =================================================
                ATTENTION REQUIRED
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
              <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Shimmer className="h-11 w-11 rounded-xl" />

                    <div className="space-y-2">
                      <Shimmer className="h-5 w-40" />

                      <Shimmer className="h-3.5 w-56" />
                    </div>
                  </div>

                  <Shimmer className="h-8 w-28 rounded-full" />
                </div>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-3 sm:p-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <Shimmer className="h-10 w-10 rounded-lg" />

                      <Shimmer className="h-5 w-5 rounded" />
                    </div>

                    <Shimmer className="mt-5 h-9 w-14 rounded-lg" />

                    <Shimmer className="mt-3 h-4 w-36" />
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                USER DISTRIBUTION
            ================================================= */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-11 w-11 rounded-xl" />

                  <div className="space-y-2">
                    <Shimmer className="h-5 w-40" />

                    <Shimmer className="h-3.5 w-48" />
                  </div>
                </div>
              </div>

              <div className="space-y-7 p-5 sm:p-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <div className="mb-3 flex items-center justify-between">
                      <Shimmer className="h-4 w-28" />

                      <Shimmer className="h-6 w-12 rounded-md" />
                    </div>

                    <Shimmer className="h-3 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              STATUS CHARTS
          ================================================= */}

          <section className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Header */}

                <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
                  <div className="flex items-center gap-3">
                    <Shimmer className="h-11 w-11 rounded-xl" />

                    <div className="space-y-2">
                      <Shimmer className="h-5 w-40" />

                      <Shimmer className="h-3.5 w-56" />
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Donut */}

                  <div className="relative flex h-[260px] items-center justify-center">
                    <div className="relative h-52 w-52">
                      {/* Base donut */}

                      <div className="absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-700" />

                      {/* Inner hole */}

                      <div className="absolute inset-[42px] rounded-full bg-white dark:bg-slate-900" />

                      {/* Rotating highlight */}

                      <div className="absolute inset-0 animate-spin rounded-full border-[7px] border-transparent border-t-slate-500 border-r-slate-300 dark:border-t-slate-400 dark:border-r-slate-600" />

                      {/* Center loading block */}

                      <div className="absolute inset-[68px] overflow-hidden rounded-full">
                        <Shimmer className="h-full w-full rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Legend */}

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, legendIndex) => (
                      <div
                        key={legendIndex}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 dark:border-slate-700 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center gap-2">
                          <Shimmer className="h-3.5 w-3.5 rounded-full" />

                          <Shimmer className="h-3.5 w-24" />
                        </div>

                        <Shimmer className="h-6 w-8 rounded-md" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* =================================================
              PAYMENT + CATEGORIES
          ================================================= */}

          <section className="grid gap-6 xl:grid-cols-3">
            {/* Payment */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
              <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-11 w-11 rounded-xl" />

                  <div className="space-y-2">
                    <Shimmer className="h-5 w-40" />

                    <Shimmer className="h-3.5 w-64" />
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                    >
                      <Shimmer className="h-3.5 w-28" />

                      <Shimmer className="mt-4 h-8 w-24 rounded-lg" />
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex justify-between">
                    <Shimmer className="h-3.5 w-32" />

                    <Shimmer className="h-3.5 w-12" />
                  </div>

                  <Shimmer className="h-3 w-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Categories */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
                <div className="flex items-center gap-3">
                  <Shimmer className="h-11 w-11 rounded-xl" />

                  <div className="space-y-2">
                    <Shimmer className="h-5 w-32" />

                    <Shimmer className="h-3.5 w-48" />
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <Shimmer className="h-12 w-20 rounded-lg" />

                <Shimmer className="mt-3 h-3.5 w-48" />

                <Shimmer className="mt-6 h-11 w-full rounded-xl" />
              </div>
            </div>
          </section>

          {/* =================================================
              PERFORMANCE
          ================================================= */}

          <section className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900 sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Shimmer className="h-5 w-48" />

                    <Shimmer className="h-3.5 w-64" />
                  </div>

                  <Shimmer className="h-8 w-28 rounded-full" />
                </div>

                <div className="mt-7 space-y-6">
                  {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <div key={rowIndex}>
                      <div className="mb-3 flex justify-between">
                        <Shimmer className="h-4 w-32" />

                        <Shimmer className="h-4 w-14" />
                      </div>

                      <Shimmer className="h-3 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* =================================================
              MONTHLY ACTIVITY
          ================================================= */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_5px_20px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-900">
            {/* Header */}

            <div className="border-b border-slate-200 px-5 py-5 dark:border-slate-800 sm:px-6">
              <div className="flex items-center gap-3">
                <Shimmer className="h-11 w-11 rounded-xl" />

                <div className="space-y-2">
                  <Shimmer className="h-5 w-44" />

                  <Shimmer className="h-3.5 w-72" />
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {/* Chart */}

              <div className="relative h-[340px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/40">
                {/* Grid lines */}

                <div className="absolute inset-x-5 top-10 space-y-[52px]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-px w-full bg-slate-300 dark:bg-slate-700"
                    />
                  ))}
                </div>

                {/* Fake bars */}

                <div className="absolute inset-x-8 bottom-10 flex h-[250px] items-end justify-between gap-2 sm:inset-x-12 sm:gap-4">
                  {Array.from({ length: 10 }).map((_, index) => {
                    const complaintHeight = 35 + ((index * 17) % 50);

                    const serviceRequestHeight = 25 + ((index * 23) % 60);

                    return (
                      <div
                        key={index}
                        className="flex h-full flex-1 items-end justify-center gap-1"
                      >
                        {/* Complaint */}

                        <Shimmer
                          className="w-3 rounded-t-md sm:w-6"
                          style={{
                            height: `${complaintHeight}%`,
                          }}
                        />

                        {/* Service Request */}

                        <Shimmer
                          className="w-3 rounded-t-md sm:w-6"
                          style={{
                            height: `${serviceRequestHeight}%`,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Bottom axis */}

                <div className="absolute inset-x-6 bottom-3 flex justify-between">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <Shimmer key={index} className="h-2.5 w-10 rounded-full" />
                  ))}
                </div>
              </div>

              {/* Summary Cards */}

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                  >
                    <Shimmer className="h-3.5 w-32" />

                    <Shimmer className="mt-4 h-8 w-24 rounded-lg" />

                    <Shimmer className="mt-3 h-3.5 w-40" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLoading;
