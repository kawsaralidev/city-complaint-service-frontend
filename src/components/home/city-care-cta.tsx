import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageSquareWarning,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CityCareCTA() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto w-full px-[4vw] sm:px-[5vw] 2xl:px-[6vw]">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Get started with CityCare
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
            Need help from your city?
            <br />
            <span className="text-primary">We make it simple.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Report a problem or request a city service through one simple,
            transparent platform.
          </p>
        </div>

        {/* CTA cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-2">
          {/* Complaint CTA */}
          <div className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 sm:p-9">
            {/* Decorative circle */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <MessageSquareWarning className="h-6 w-6" />
                </div>

                <div className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  Report
                </div>
              </div>

              <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
                Something wrong in your area?
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                Report a city problem and help the responsible team identify and
                resolve it.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>Submit your complaint easily</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>Add location and supporting details</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>Track the progress of your complaint</span>
                </div>
              </div>

              <Link
                href="/complaints"
                className="group/button mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/15"
              >
                Report a Complaint
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Service CTA */}
          <div className="group relative overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground shadow-xl shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15 sm:p-9">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-125" />

            <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-primary">
                  <ClipboardList className="h-6 w-6" />
                </div>

                <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  Services
                </div>
              </div>

              <h3 className="mt-8 text-2xl font-bold tracking-tight">
                Looking for a city service?
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/75">
                Explore available municipal services and submit your request
                without unnecessary paperwork.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Browse available city services</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Submit requests online</span>
                </div>

                <div className="flex items-center gap-2.5 text-sm text-primary-foreground/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Follow your request status</span>
                </div>
              </div>

              <Link
                href="/services"
                className="group/button mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-white/90 hover:shadow-lg"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
