"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

import { useServiceById } from "@/hooks/service.hook";

const ServiceDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id;
  const serviceId = Array.isArray(id) ? id[0] : id;

  const { data: service, isLoading, isError } = useServiceById(serviceId ?? "");

  // Public service details page:
  // Do not redirect to login while viewing the service.
  // Authentication should be handled by the request flow.
  const handleRequestService = () => {
    if (!serviceId) return;

    router.push(`/services/${serviceId}/request`);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-32 rounded bg-slate-200" />
            <div className="h-[420px] rounded-3xl bg-slate-200" />
            <div className="h-10 w-2/3 rounded bg-slate-200" />
            <div className="h-20 rounded bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !service) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Sparkles className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Service Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We could not find the service you are looking for. Please go back
            and choose another service.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const progressSteps = [
    {
      title: "Request Submitted",
      description: "Submit your service request",
      icon: FileText,
    },
    {
      title: "Admin Approval",
      description: "The request is reviewed and approved",
      icon: ShieldCheck,
    },
    {
      title: "Payment",
      description: "Complete the required service fee",
      icon: CreditCard,
    },
    {
      title: "Officer Assigned",
      description: "An officer is assigned to the request",
      icon: UserRound,
    },
    {
      title: "In Progress",
      description: "The service work begins",
      icon: Wrench,
    },
    {
      title: "Completed",
      description: "The service request is completed",
      icon: CheckCircle2,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Service Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-emerald-600">
              Home
            </Link>

            <ArrowRight className="h-4 w-4" />

            <Link
              href="/services"
              className="transition hover:text-emerald-600"
            >
              Services
            </Link>

            <ArrowRight className="h-4 w-4" />

            <span className="max-w-[180px] truncate text-emerald-600">
              {service.name}
            </span>
          </div>

          {/* Main Service Card */}
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* Service Image */}
              <div className="relative min-h-[300px] lg:min-h-[470px]">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[300px] items-center justify-center bg-slate-100">
                    <Sparkles className="h-12 w-12 text-slate-300" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-lg backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Available Service
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                    CityCare Service
                  </p>

                  <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                    {service.name}
                  </h1>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Municipal Service
                  </div>

                  <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    {service.name}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                    {service.description ||
                      "Get reliable municipal support through our easy and convenient service system."}
                  </p>
                </div>

                {/* Service Fee */}
                <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Service Fee
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ৳{service.baseFee}
                    </span>

                    <span className="mb-1 text-sm text-slate-500">
                      / request
                    </span>
                  </div>
                </div>

                {/* Request Button */}
                <button
                  type="button"
                  onClick={handleRequestService}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl sm:text-base"
                >
                  Request This Service
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Submit your request online in just a few steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Journey Timeline */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl  bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Progress
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Service request journey
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Learn how your request moves from submission and admin approval to
              payment, officer assignment and completion.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="relative mt-12 hidden lg:block">
            <div className="absolute left-[2%] right-[2%] top-4 h-0.5 bg-slate-200" />

            <div className="relative grid grid-cols-6 gap-4">
              {progressSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isFirst = index === 0;

                return (
                  <div key={step.title} className="relative min-w-0">
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white ${
                        isFirst
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-emerald-500 bg-white text-emerald-600"
                      }`}
                    >
                      {isFirst ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </div>

                    <h3 className="mt-5 text-sm font-semibold leading-5 text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tablet and Mobile Timeline */}
          <div className="mt-8 space-y-0 lg:hidden">
            {progressSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isLast = index === progressSteps.length - 1;

              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex w-8 shrink-0 flex-col items-center">
                    <div
                      className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                        index === 0
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-emerald-500 bg-white text-emerald-600"
                      }`}
                    >
                      {index === 0 ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <StepIcon className="h-4 w-4" />
                      )}
                    </div>

                    {!isLast && (
                      <div className="my-1 min-h-10 w-0.5 flex-1 bg-emerald-200" />
                    )}
                  </div>

                  <div className={isLast ? "pb-0" : "pb-7"}>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />

              <p className="font-semibold text-slate-900">
                Ready to request this service?
              </p>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Start your request and let CityCare handle the rest.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRequestService}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:w-auto"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;
