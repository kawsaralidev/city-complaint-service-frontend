"use client";

import Link from "next/link";

import {
  ArrowRight,
  Clock3,
  FileQuestion,
  Headphones,
  Mail,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-border bg-gradient-to-b from-primary/[0.06] via-background to-background">
        <div className="mx-auto max-w-7xl px-4 pb-11 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-13 lg:pt-14">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <MessageSquareText className="h-3.5 w-3.5" />

              <span>We are here to help</span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Have a question?
              <span className="block text-primary">Let&apos;s connect.</span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Need help with CityCare, a complaint, or a city service? Find the
              right way to get support and stay connected.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* =================================================
              LEFT — CONTACT INFORMATION
          ================================================== */}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Get In Touch
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              How can we help?
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
              Whether you need help understanding a CityCare feature or want to
              know where to go with a city-related issue, start here.
            </p>

            {/* Contact cards */}

            <div className="mt-7 space-y-3">
              {/* Email */}

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/20">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email Support
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-foreground">
                    CityCare Support
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    For general questions and platform-related help.
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/20">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Support
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-foreground">
                    City service assistance
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Get guidance about using CityCare and its services.
                  </p>
                </div>
              </div>

              {/* Availability */}

              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/20">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Support Information
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-foreground">
                    Check the relevant service
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    For complaint or service-specific issues, use the dedicated
                    CityCare pages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT — CONTACT FORM UI
          ================================================== */}

          <div className="rounded-[24px] border border-border bg-card p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-7">
            {/* Form heading */}

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Send a Message
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Tell us what you need.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Share your question or concern and provide enough detail for the
                support team to understand it.
              </p>
            </div>

            {/* Form */}

            <form className="mt-7 space-y-5">
              {/* Name + Email */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Subject */}

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What can we help you with?"
                  className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Message */}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {/* Submit */}

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:w-auto"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>

              <p className="text-xs leading-5 text-muted-foreground">
                Contact submission will be connected to the CityCare support
                workflow once the corresponding backend endpoint is available.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK HELP
      ====================================================== */}

      <section className="border-y border-border bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Need Help?
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              You may find the answer here.
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Some questions are easier to solve by going directly to the
              relevant CityCare section.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {/* Complaints */}

            <Link
              href="/complaints"
              className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileQuestion className="h-5 w-5" />
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                Complaints
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse reported issues and learn more about the complaint
                process.
              </p>
            </Link>

            {/* Services */}

            <Link
              href="/services"
              className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Headphones className="h-5 w-5" />
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                City Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Explore available services and find the one you need.
              </p>
            </Link>

            {/* About */}

            <Link
              href="/about"
              className="group rounded-2xl border border-border bg-background p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-slate-200/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MessageSquareText className="h-5 w-5" />
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h3 className="mt-5 text-base font-bold text-foreground">
                About CityCare
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Learn how CityCare connects citizens with city services.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-[28px] bg-slate-950 px-6 py-10 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              CityCare
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Better communication starts here.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Explore CityCare and use the platform to report issues or discover
              available city services.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/complaints"
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Explore Complaints
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

export default ContactPage;
