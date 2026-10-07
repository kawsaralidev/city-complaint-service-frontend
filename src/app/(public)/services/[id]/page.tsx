"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/auth.hook";
import { useServiceById } from "@/hooks/service.hook";

const ServiceDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const serviceId = Array.isArray(id) ? id[0] : id;

  const { data: service, isLoading, isError } = useServiceById(serviceId ?? "");

  const { data: userResponse, isLoading: isUserLoading } = useCurrentUser();

  const user = userResponse?.data;

  const handleRequestService = () => {
    if (!serviceId || isUserLoading) {
      return;
    }

    const requestUrl = `/dashboard/citizen-dashboard/services/${serviceId}/request`;

    // User is not logged in
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(requestUrl)}`);

      return;
    }

    // Only citizens can request a service
    if (user.role !== "CITIZEN") {
      return;
    }

    // Logged-in citizen goes directly to request form
    router.push(requestUrl);
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

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
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

          {/* Main Hero Card */}
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              {/* Image */}
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

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Active Badge */}
                <div className="absolute left-5 top-5">
                  <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-lg backdrop-blur">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Available Service
                  </div>
                </div>

                {/* Bottom Image Text */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                    CityCare Service
                  </p>

                  <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                    {service.name}
                  </h1>
                </div>
              </div>

              {/* Service Information */}
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

                {/* Price */}
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

                {/* CTA */}
                <button
                  type="button"
                  onClick={handleRequestService}
                  disabled={isUserLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                >
                  {isUserLoading
                    ? "Checking account..."
                    : "Request This Service"}

                  {!isUserLoading && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  You can submit your request online in just a few steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-emerald-600">
            Why use this service?
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            Simple, secure and convenient
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Easy & Fast */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              <Clock3 className="h-5 w-5" />
            </div>

            <h3 className="font-semibold text-slate-900">Easy & Fast</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Submit your service request online without unnecessary paperwork.
            </p>
          </div>

          {/* Secure Process */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <h3 className="font-semibold text-slate-900">Secure Process</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your request and payment information are handled through a secure
              process.
            </p>
          </div>

          {/* City-wide Support */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
              <MapPin className="h-5 w-5" />
            </div>

            <h3 className="font-semibold text-slate-900">City-wide Support</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Access municipal services conveniently from your location.
            </p>
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
            disabled={isUserLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isUserLoading ? "Checking account..." : "Get Started"}

            {!isUserLoading && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;
