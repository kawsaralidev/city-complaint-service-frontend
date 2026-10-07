import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Search,
  Send,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Submit a Request",
    description: "Report a problem or request a city service.",
  },
  {
    number: "02",
    icon: Search,
    title: "We Review It",
    description: "Your request is sent to the right team.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Track Progress",
    description: "Follow your request every step of the way.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Get It Resolved",
    description: "See when your request has been completed.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-card py-16 sm:py-20 lg:py-24">
      {/* Subtle background */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full px-[4vw] sm:px-[5vw] 2xl:px-[6vw]">
        {/* ========================================
            SECTION HEADER
            ======================================== */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            How CityCare works
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.7rem]">
            From request to resolution,
            <span className="block text-primary">we keep it simple.</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Simple steps from your request to a completed service.
          </p>
        </div>

        {/* ========================================
            STEPS
            ======================================== */}

        <div className="relative mx-auto mt-12 max-w-6xl">
          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[43px] hidden h-px bg-border lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative rounded-2xl border border-transparent bg-card px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:bg-white hover:shadow-lg hover:shadow-secondary/5"
                >
                  {/* ==================================
                      ICON
                      ================================== */}

                  <div className="relative mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md">
                    {/* Icon background */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                      <Icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-white" />
                    </div>

                    {/* Number */}
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-secondary text-[9px] font-bold text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-primary">
                      {step.number}
                    </span>
                  </div>

                  {/* ==================================
                      TEXT
                      ================================== */}

                  <div className="mt-5">
                    <h3 className="text-sm font-bold text-foreground transition-colors duration-200 group-hover:text-primary sm:text-base">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[220px] text-xs leading-5 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
