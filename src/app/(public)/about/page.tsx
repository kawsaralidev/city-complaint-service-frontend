"use client";

import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartHandshake,
  SearchCheck,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className=" bg-gradient-to-b from-primary/[0.06] via-background to-background">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <HeartHandshake className="h-3.5 w-3.5" />

              <span>City services made simple</span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Better cities,
              <span className="block text-primary">better connected.</span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Learn how CityCare connects citizens with city services, making it
              easier to report problems, request services, and follow progress
              from one place.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHO WE ARE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* LEFT */}

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Who We Are
              </p>
            </div>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A simpler way to connect people with their city.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              CityCare is a digital platform that brings citizens and city
              services together in one place. It gives citizens a simple way to
              report community issues, request available services, and follow
              the progress of their requests.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              At the same time, city teams can review requests, manage
              complaints, assign work, and keep the resolution process
              organized.
            </p>

            {/* Features */}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Simple
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Easy access to city services and reporting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Transparent
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Follow requests as they move through the process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            <div className="absolute -inset-4 rounded-[32px] bg-primary/[0.06] blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)]">
              {/* Dark card */}

              <div className="relative px-6 pb-7 pt-7 sm:px-8 sm:pb-8">
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    CityCare
                  </p>

                  <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Your city,
                    <br />
                    connected.
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                    One platform where citizens and city teams can communicate,
                    manage requests, and work toward better communities.
                  </p>
                </div>
              </div>

              {/* Roles */}

              <div className="grid grid-cols-3 border-t border-white/10">
                <div className="px-3 py-5 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-primary">
                    <UserRound className="h-4 w-4" />
                  </div>

                  <p className="mt-2 text-xs font-semibold text-white">
                    Citizens
                  </p>
                </div>

                <div className="border-x border-white/10 px-3 py-5 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-primary">
                    <Users className="h-4 w-4" />
                  </div>

                  <p className="mt-2 text-xs font-semibold text-white">
                    Officers
                  </p>
                </div>

                <div className="px-3 py-5 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-primary">
                    <ShieldCheck className="h-4 w-4" />
                  </div>

                  <p className="mt-2 text-xs font-semibold text-white">
                    Admins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE DO
      ====================================================== */}

      <section className=" bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          {/* Section heading */}

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What We Do
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Everything you need,
              <span className="text-primary"> in one place.</span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              CityCare makes everyday communication with city services easier
              and more organized.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}

            <div className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                Report Issues
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Citizens can report problems in their community and provide the
                information needed for review.
              </p>
            </div>

            {/* Card 2 */}

            <div className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <SearchCheck className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                Track Progress
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Follow complaints and service requests as they move through the
                resolution process.
              </p>
            </div>

            {/* Card 3 */}

            <div className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <ClipboardList className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                Request Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Find available city services and submit requests through a
                single platform.
              </p>
            </div>

            {/* Card 4 */}

            <div className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <HeartHandshake className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                Stay Connected
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Keep communication between citizens and city teams organized in
                one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW CITYCARE WORKS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          {/* LEFT */}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              How CityCare Works
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              From report to resolution.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              CityCare keeps the process organized so each request can move from
              submission to resolution through clear stages.
            </p>
          </div>

          {/* RIGHT — STEPS */}

          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="space-y-0">
              {/* Step 1 */}

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>

                  <div className="h-full w-px bg-border" />
                </div>

                <div className="pb-6">
                  <h3 className="text-sm font-bold text-foreground">
                    Citizen submits a report
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    A citizen submits a complaint or service request through
                    CityCare.
                  </p>
                </div>
              </div>

              {/* Step 2 */}

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>

                  <div className="h-full w-px bg-border" />
                </div>

                <div className="pb-6">
                  <h3 className="text-sm font-bold text-foreground">
                    Admin reviews the request
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The request is reviewed and the appropriate action is
                    determined.
                  </p>
                </div>
              </div>

              {/* Step 3 */}

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>

                  <div className="h-full w-px bg-border" />
                </div>

                <div className="pb-6">
                  <h3 className="text-sm font-bold text-foreground">
                    Officer is assigned
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    The appropriate officer receives the work and begins
                    processing the request.
                  </p>
                </div>
              </div>

              {/* Step 4 */}

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    4
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Resolution and completion
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Work progresses toward resolution and completion, keeping
                    the process visible to the citizen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          OUR MISSION
      ====================================================== */}

      <section className=" bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            {/* LEFT */}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Our Mission
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Making everyday city life easier.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                CityCare aims to create a more connected and transparent way for
                citizens and city teams to work together.
              </p>
            </div>

            {/* RIGHT */}

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-background p-5">
                <CheckCircle2 className="h-5 w-5 text-primary" />

                <h3 className="mt-4 text-sm font-bold text-foreground">
                  Transparency
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Clear progress and organized request handling.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <Users className="h-5 w-5 text-primary" />

                <h3 className="mt-4 text-sm font-bold text-foreground">
                  Community
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  A shared platform for citizens and city teams.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background p-5">
                <HeartHandshake className="h-5 w-5 text-primary" />

                <h3 className="mt-4 text-sm font-bold text-foreground">
                  Accessibility
                </h3>

                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Simple access to important city services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          BUILT FOR EVERYONE
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Built For Everyone
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            One platform, different roles.
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            CityCare brings together the people who report issues and the teams
            responsible for resolving them.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Citizen */}

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-foreground">Citizens</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Submit complaints, request services, track requests, and stay
              informed about progress.
            </p>
          </div>

          {/* Officer */}

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-foreground">Officers</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              View assigned work, update progress, and help move complaints and
              requests toward completion.
            </p>
          </div>

          {/* Admin */}

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-foreground">
              Administrators
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Review requests, manage resources, assign officers, and oversee
              city service operations.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-14">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-10 sm:px-10 sm:py-12">
          {/* Background decoration */}

          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />

          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Get Started
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See something that needs attention?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Help make your community better by reporting an issue or exploring
              the services available through CityCare.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/complaints"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Report a Complaint
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
