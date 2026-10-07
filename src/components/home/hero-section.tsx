import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-background">
      {/* Background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-accent/8 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(7,131,77,0.04),transparent_32%)]" />

      {/* Main Container */}
      <div className="relative mx-auto w-full px-[4vw] py-8 sm:px-[5vw] sm:py-10 lg:px-[5vw] lg:py-12 2xl:px-[6vw]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[4vw]">
          {/* ========================================
              LEFT SIDE
              ======================================== */}

          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="h-3.5 w-3.5" />
              </span>

              <span>Simple city services for everyone</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.8rem] xl:text-[5.3rem] 2xl:text-[5.7rem]">
              Make Your City
              <span className="block text-primary">Better, Together.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-[1.1rem]">
              Report problems, request essential services, and track your
              requests from one simple platform built to make everyday city
              services easier, faster, and more accessible.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/complaints"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl"
              >
                Report a Complaint
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 text-sm font-semibold text-secondary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust Features */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>

                <span className="text-sm font-medium text-muted-foreground">
                  Easy to use
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                </div>

                <span className="text-sm font-medium text-muted-foreground">
                  Secure platform
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                </div>

                <span className="text-sm font-medium text-muted-foreground">
                  Track anytime
                </span>
              </div>
            </div>

            {/* Bottom Highlight */}
            <div className="mt-8 flex max-w-2xl items-center gap-5 border-t border-border pt-5">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-secondary/10">
                  <ClipboardList className="h-4 w-4 text-secondary" />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-accent/20">
                  <Sparkles className="h-4 w-4 text-accent-dark" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Everything in one place
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  Complaints, services and request tracking
                </p>
              </div>
            </div>
          </div>

          {/* ========================================
              RIGHT SIDE
              ======================================== */}

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
            {/* Soft Glow */}
            <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-primary/6 blur-3xl" />

            {/* Main Dashboard */}
            <div className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl shadow-secondary/10">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-foreground">
                      CityCare
                    </p>

                    <p className="text-[11px] text-muted-foreground">
                      Citizen dashboard
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />

                  <span className="text-xs font-semibold text-primary">
                    Active
                  </span>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="bg-background/60 p-4 sm:p-5">
                {/* Request Heading */}
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Current request
                    </p>

                    <h2 className="mt-1.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      Street Light Repair
                    </h2>
                  </div>

                  <span className="shrink-0 rounded-full bg-accent/20 px-3 py-1.5 text-[11px] font-bold text-accent-dark">
                    In Progress
                  </span>
                </div>

                {/* Status Card */}
                <div className="rounded-[22px] bg-secondary p-4 text-white sm:p-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        Service request
                      </p>

                      <div className="mt-2.5 flex items-center gap-2 text-sm text-white/70">
                        <MapPin className="h-4 w-4" />

                        <span>Central City Area</span>
                      </div>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <ClipboardList className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/55">
                        Request progress
                      </span>

                      <span className="text-xs font-bold text-white">65%</span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[65%] rounded-full bg-accent" />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-5 grid grid-cols-3">
                    {/* Submitted */}
                    <div>
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>

                        <div className="h-px flex-1 bg-white/20" />
                      </div>

                      <p className="mt-2 text-[10px] font-medium text-white/70">
                        Submitted
                      </p>
                    </div>

                    {/* In Progress */}
                    <div>
                      <div className="flex items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                          <Clock3 className="h-4 w-4 text-accent-foreground" />
                        </div>

                        <div className="h-px flex-1 bg-white/20" />
                      </div>

                      <p className="mt-2 text-[10px] font-medium text-white/90">
                        In progress
                      </p>
                    </div>

                    {/* Completed */}
                    <div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <CheckCircle2 className="h-4 w-4 text-white/30" />
                      </div>

                      <p className="mt-2 text-[10px] font-medium text-white/40">
                        Completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {/* Report */}
                  <div className="group rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
                        <ClipboardList className="h-4 w-4 text-primary" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Report an issue
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Submit a complaint easily
                    </p>
                  </div>

                  {/* Service */}
                  <div className="group rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15">
                        <Sparkles className="h-4 w-4 text-accent-dark" />
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-foreground">
                      Request a service
                    </p>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Find the service you need
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border px-5 py-2.5 sm:px-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />

                  <span className="text-xs font-medium text-muted-foreground">
                    Your city services, connected
                  </span>
                </div>

                <span className="text-xs font-semibold text-primary">
                  CityCare
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
