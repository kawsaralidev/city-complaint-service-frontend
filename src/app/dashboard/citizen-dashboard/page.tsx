"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FilePlus2,
  Loader2,
  MapPin,
  Plus,
  Wrench,
} from "lucide-react";

const CitizenDashboardPage = () => {
  return (
    <div className="space-y-6 p-6 md:p-7">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-md">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-transform duration-500 hover:scale-110" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary transition-all duration-300 hover:border-primary/30 hover:bg-primary/10">
              <ClipboardList className="h-3.5 w-3.5" />
              Citizen Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Welcome back!
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
              Manage your complaints, service requests and track their progress
              from one place.
            </p>
          </div>

          {/* Create Complaint */}
          <button
            type="button"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0"
          >
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            Create Complaint
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Complaints */}
        <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Total Complaints
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">—</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Your submitted complaints
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Pending Complaints */}
        <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#fdba2d]/35 hover:shadow-lg hover:shadow-[#fdba2d]/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">—</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Waiting for review
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fdba2d]/10 text-[#b77900] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#fdba2d]/20 group-hover:shadow-md">
              <Clock3 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                In Progress
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">—</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Currently being handled
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100 group-hover:shadow-md">
              <Loader2 className="h-5 w-5 transition-transform duration-500 group-hover:rotate-90" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#08a85b]/30 hover:shadow-lg hover:shadow-[#08a85b]/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                Completed
              </p>

              <p className="mt-2 text-3xl font-bold text-foreground">—</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Successfully resolved
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#08a85b]/10 text-[#07834a] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#08a85b] group-hover:text-white group-hover:shadow-md">
              <CheckCircle2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Recent Complaints */}
        <div className="group rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Recent Complaints
              </h2>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Your latest submitted complaints
              </p>
            </div>

            <button
              type="button"
              className="group/view inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors duration-300 hover:text-primary/80"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/view:translate-x-1" />
            </button>
          </div>

          <div className="flex min-h-[260px] flex-col items-center justify-center px-5 py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary/15 group-hover:shadow-md">
              <ClipboardList className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <h3 className="text-base font-semibold text-foreground">
              No recent complaints
            </h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Your recently submitted complaints will appear here.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Quick Actions
            </h2>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Frequently used citizen services
            </p>
          </div>

          <div className="space-y-3 p-5">
            {/* Create Complaint */}
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FilePlus2 className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Create Complaint
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Report a new city issue
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </button>

            {/* My Complaints */}
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  My Complaints
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Track your submitted complaints
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </button>

            {/* Service Requests */}
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-left transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fdba2d]/10 text-[#b77900] transition-colors group-hover:bg-[#fdba2d]/20">
                <Wrench className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">
                  Service Requests
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Request available city services
                </p>
              </div>

              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Complaint Tracking */}
        <div className="group rounded-2xl border border-primary/15 bg-primary/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md">
              <MapPin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Track Your Complaints
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Follow the progress of your complaints and see when they are
                assigned, processed and completed.
              </p>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="group rounded-2xl border border-secondary/15 bg-secondary/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/30 hover:bg-secondary/10 hover:shadow-md hover:shadow-secondary/5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-105 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:shadow-md">
              <AlertCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Need Help?
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Submit a complaint or request a city service whenever you need
                assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboardPage;
