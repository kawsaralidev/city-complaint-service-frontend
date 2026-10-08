"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  Droplets,
  ImageIcon,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useActiveServices } from "@/hooks/service.hook";
import Image from "next/image";

const serviceIcons = [
  Building2,
  Lightbulb,
  Droplets,
  Wrench,
  ClipboardList,
  Sparkles,
];

const getServiceIcon = (index: number) => {
  return serviceIcons[index % serviceIcons.length];
};

const PopularServicesSection = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useActiveServices({
    page: 1,
    limit: 7,
    sortOrder: "desc",
  });

  const services = (data?.data ?? []).slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-10">
      {/* Subtle Background */}
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto w-full px-[4vw] sm:px-[5vw] 2xl:px-[6vw]">
        {/* ========================================
            SECTION HEADER
            ======================================== */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            City services
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.7rem]">
            Essential services,
            <span className="block text-primary">made simpler.</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Access the city services you need, all in one place.
          </p>
        </div>

        {/* ========================================
            LOADING
            ======================================== */}
        {isLoading && (
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                {/* Image Skeleton */}
                <div className="h-44 animate-pulse bg-muted" />

                {/* Content Skeleton */}
                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />

                  <div className="h-10 animate-pulse rounded bg-muted" />

                  <div className="h-px w-full bg-muted" />

                  <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================
            ERROR
            ======================================== */}
        {!isLoading && isError && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-sm font-medium text-red-700">
              Failed to load city services.
            </p>

            <p className="mt-1 text-xs text-red-600/80">
              Please try again later.
            </p>
          </div>
        )}

        {/* ========================================
            EMPTY
            ======================================== */}
        {!isLoading && !isError && services.length === 0 && (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-card px-6 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <p className="mt-4 text-sm font-semibold text-foreground">
              No services available right now.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Please check back later.
            </p>
          </div>
        )}

        {/* ========================================
            SERVICE CARDS
            ======================================== */}
        {!isLoading && !isError && services.length > 0 && (
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = getServiceIcon(index);

              return (
                <div
                  key={service.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-secondary/5"
                >
                  {/* Top Accent */}
                  <div className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

                  {/* ========================================
                      SERVICE IMAGE
                      ======================================== */}
                  <div className="relative h-44 w-full overflow-hidden bg-muted">
                    {service.imageUrl ? (
                      <Image
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary/5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                          <ImageIcon className="h-7 w-7 text-primary/70" />
                        </div>
                      </div>
                    )}

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70" />

                    {/* Active Badge */}
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full border border-white/20 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-green-700 shadow-sm backdrop-blur-sm">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* ========================================
                      CARD CONTENT
                      ======================================== */}
                  <div className="p-5">
                    {/* Service Content */}
                    <div>
                      <h3 className="line-clamp-1 text-base font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                        {service.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">
                        {service.description ||
                          "Access this city service through CityCare."}
                      </p>
                    </div>

                    {/* Fee */}
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            router.push(`/services/${service.id}`);
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
                        >
                          View Service
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                      </div>
                      <div>
                        <span className="text-sm font-bold text-secondary">
                          ৳{service.baseFee}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================
            VIEW ALL
            ======================================== */}
        {!isLoading && !isError && services.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-secondary shadow-sm transition-all duration-200 hover:border-primary/20 hover:text-primary hover:shadow-md"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularServicesSection;
