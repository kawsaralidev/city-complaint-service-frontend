import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Headphones,
  MapPin,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Submit complaints and request city services in just a few simple steps.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your information and service requests are handled through a secure system.",
  },
  {
    icon: Clock3,
    title: "Real-Time Tracking",
    description:
      "Track your complaint or service request from submission to completion.",
  },
  {
    icon: Headphones,
    title: "Better Support",
    description:
      "Stay connected with the right city team throughout the service process.",
  },
];

export default function WhyChooseCityCare() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full px-[4vw] sm:px-[5vw] 2xl:px-[6vw]">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Why CityCare?
          </div>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.7rem]">
            A smarter way to connect
            <span className="block text-primary">with your city.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            CityCare makes complaints and city services easier to access, easier
            to track, and easier to manage — all from one place.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          {/* Left visual panel */}
          <div className="relative overflow-hidden rounded-[2rem] bg-secondary p-7 text-primary-foreground shadow-xl shadow-primary/10 sm:p-9 lg:p-10">
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative flex h-full flex-col">
              {/* Small badge */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-medium backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white" />
                Built for better city services
              </div>

              <div className="mt-10">
                <p className="text-sm font-medium text-primary-foreground/70">
                  One platform
                </p>

                <h3 className="mt-2 max-w-md text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Everything you need,
                  <br />
                  in one place.
                </h3>

                <p className="mt-5 max-w-md text-sm leading-7 text-primary-foreground/75 sm:text-base">
                  From reporting a problem to following your request, CityCare
                  keeps the entire process clear and convenient.
                </p>
              </div>

              {/* Mini stats */}
              <div className="mt-auto grid grid-cols-2 gap-3 pt-10">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs text-primary-foreground/70">
                      Process
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">Transparent</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs text-primary-foreground/70">
                      Access
                    </span>
                  </div>

                  <p className="mt-2 text-lg font-semibold">City-wide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 sm:p-7"
                >
                  {/* Number */}
                  <div className="absolute right-5 top-5 text-4xl font-bold tracking-tight text-muted/100 transition-colors duration-300 group-hover:text-secondary/40">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="relative mt-7">
                    <h3 className="text-lg font-bold text-foreground">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom arrow */}
                  <div className="mt-7 flex items-center justify-between">
                    <div className="h-px flex-1 bg-border transition-colors duration-300 group-hover:bg-primary/20" />

                    <div className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:bg-primary/5">
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
