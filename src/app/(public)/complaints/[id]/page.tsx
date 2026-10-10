"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  FileWarning,
  ImageIcon,
  MapPin,
  Sparkles,
  Tag,
} from "lucide-react";

import { useComplaint } from "@/hooks/complaint.hook";
import { useCurrentUser } from "@/hooks/auth.hook";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import CreateComplaintDialog from "@/components/complaint/CreateComplaintDialog";

const statusSteps = [
  {
    key: "APPROVED",
    label: "Approved",
  },
  {
    key: "ASSIGNED",
    label: "Assigned",
  },
  {
    key: "IN_PROGRESS",
    label: "In Progress",
  },
  {
    key: "COMPLETED",
    label: "Completed",
  },
];

const getStatusLabel = (status: string) => {
  return status.replaceAll("_", " ");
};

const getStatusIndex = (status: string) => {
  return statusSteps.findIndex((step) => step.key === status);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-blue-500";

    case "ASSIGNED":
      return "bg-violet-500";

    case "IN_PROGRESS":
      return "bg-amber-500";

    case "COMPLETED":
      return "bg-emerald-500";

    default:
      return "bg-slate-400";
  }
};

const ComplaintDetailsPage = () => {
  const params = useParams();

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isCreateComplaintOpen, setIsCreateComplaintOpen] = useState(false);

  const id = params.id;

  const complaintId = Array.isArray(id) ? id[0] : id;

  const {
    data: complaintResponse,
    isLoading,
    isError,
  } = useComplaint(complaintId ?? "");

  const { data: userResponse, isLoading: isUserLoading } = useCurrentUser();

  const user = userResponse?.data;

  const complaint = complaintResponse?.data;

  /* ---------------------------------------
     OPEN CREATE COMPLAINT AFTER LOGIN
  --------------------------------------- */

  useEffect(() => {
    const shouldOpenComplaint = searchParams.get("createComplaint") === "true";

    if (shouldOpenComplaint && !isUserLoading && user?.role === "CITIZEN") {
      setIsCreateComplaintOpen(true);

      const params = new URLSearchParams(searchParams.toString());

      params.delete("createComplaint");

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }
  }, [searchParams, isUserLoading, user, pathname, router]);

  /* ---------------------------------------
     CREATE / REPORT COMPLAINT
  --------------------------------------- */

  const handleReportIssue = () => {
    if (!complaintId || isUserLoading) {
      return;
    }

    /*
      User is not logged in
      → Send user to login
      → After login return to this same complaint page
      → Automatically open complaint modal
    */
    if (!user) {
      const params = new URLSearchParams(searchParams.toString());

      params.set("createComplaint", "true");

      const currentUrl = `${pathname}?${params.toString()}`;

      router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);

      return;
    }

    /*
      Only CITIZEN can create complaints
    */
    if (user.role !== "CITIZEN") {
      return;
    }

    /*
      Logged-in citizen
      → Open modal
    */
    setIsCreateComplaintOpen(true);
  };

  /* ---------------------------------------
     Loading
  --------------------------------------- */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="mb-8 h-5 w-40" />

          <div className="overflow-hidden rounded-[28px] bg-white">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <Skeleton className="min-h-[360px] rounded-none lg:min-h-[500px]" />

              <div className="space-y-6 p-6 sm:p-8 lg:p-10">
                <Skeleton className="h-7 w-40" />

                <Skeleton className="h-12 w-3/4" />

                <Skeleton className="h-5 w-32" />

                <Skeleton className="h-20 w-full" />

                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
          </div>

          <div className="mt-12 space-y-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-72" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------------------------
     Error
  --------------------------------------- */

  if (isError || !complaint) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FileWarning className="h-7 w-7 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Complaint Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We could not find the complaint you are looking for. Please go back
            and choose another complaint.
          </p>

          <Link
            href="/complaints"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to Complaints
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    );
  }

  const currentStatusIndex = getStatusIndex(complaint.status);

  const statusColor = getStatusColor(complaint.status);

  return (
    <>
      <main className="min-h-screen bg-slate-50">
        {/* =========================================
            HERO SECTION
        ========================================= */}

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}

            <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition hover:text-emerald-600">
                Home
              </Link>

              <ArrowRight className="h-4 w-4" />

              <Link
                href="/complaints"
                className="transition hover:text-emerald-600"
              >
                Complaints
              </Link>

              <ArrowRight className="h-4 w-4" />

              <span className="max-w-[220px] truncate text-emerald-600">
                {complaint.title}
              </span>
            </div>

            {/* =====================================
                MAIN HERO CARD
            ===================================== */}

            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                {/* =================================
                    LEFT — IMAGE
                ================================= */}

                <div className="relative min-h-[320px] lg:min-h-[500px]">
                  {complaint.imageUrl ? (
                    <Image
                      src={complaint.imageUrl}
                      alt={complaint.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-white">
                      <div className="text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
                          <ImageIcon className="h-9 w-9 text-slate-300" />
                        </div>

                        <p className="mt-4 text-sm font-medium text-slate-400">
                          No image available
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />

                  {/* Status */}

                  <div className="absolute left-5 top-5">
                    <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur">
                      <span className={`h-2 w-2 rounded-full ${statusColor}`} />

                      {getStatusLabel(complaint.status)}
                    </div>
                  </div>

                  {/* Image title */}

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/75">
                      CityCare Complaint
                    </p>

                    <h1 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                      {complaint.title}
                    </h1>
                  </div>
                </div>

                {/* =================================
                    RIGHT — COMPLAINT INFORMATION
                ================================= */}

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  {/* Label */}

                  <div>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <Sparkles className="h-3.5 w-3.5" />
                      Community Complaint
                    </div>

                    <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                      {complaint.title}
                    </h2>
                  </div>

                  {/* What happened */}

                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                      Complaint Report
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      What happened?
                    </h3>

                    <p className="mt-3 line-clamp-5 text-sm leading-7 text-slate-500 sm:text-[15px]">
                      {complaint.description}
                    </p>
                  </div>

                  {/* CTA */}

                  <div className="mt-7">
                    <Button
                      type="button"
                      onClick={handleReportIssue}
                      disabled={isUserLoading}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-5 py-6 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                    >
                      {isUserLoading
                        ? "Checking account..."
                        : "Create a Complaint"}

                      {!isUserLoading && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      )}
                    </Button>

                    <p className="mt-3 text-center text-xs text-slate-400">
                      Help improve your community by reporting local issues.
                    </p>

                    {!isUserLoading && user && user.role !== "CITIZEN" && (
                      <p className="mt-2 text-center text-xs text-amber-600">
                        Only citizens can submit complaints.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================
                INFORMATION CARDS
            ===================================== */}

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {/* Category */}

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Tag className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                    {complaint.category.name}
                  </p>
                </div>
              </div>

              {/* Location */}

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Location
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                    {complaint.location}
                  </p>
                </div>
              </div>

              {/* Reported */}

              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                    Reported
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            COMPLAINT JOURNEY
        ========================================= */}

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* =====================================
                PROGRESS
            ===================================== */}

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Progress
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Complaint journey
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Follow the progress of this complaint through the CityCare
                resolution process.
              </p>

              {/* Desktop Progress */}

              <div className="mt-12 hidden sm:block">
                <div className="relative">
                  {/* Background line */}

                  <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200" />

                  {/* Progress line */}

                  <div
                    className="absolute left-0 top-4 h-0.5 bg-emerald-500 transition-all duration-500"
                    style={{
                      width:
                        currentStatusIndex <= 0
                          ? "0%"
                          : `${
                              (currentStatusIndex / (statusSteps.length - 1)) *
                              100
                            }%`,
                    }}
                  />

                  <div className="relative grid grid-cols-4">
                    {statusSteps.map((step, index) => {
                      const isCompleted = currentStatusIndex >= index;

                      const isCurrent = currentStatusIndex === index;

                      return (
                        <div key={step.key} className="flex flex-col">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                              isCompleted
                                ? "bg-emerald-500 text-white"
                                : "bg-slate-200 text-slate-400"
                            } ${isCurrent ? "ring-8 ring-emerald-500/10" : ""}`}
                          >
                            {isCompleted ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <span className="h-2 w-2 rounded-full bg-current" />
                            )}
                          </div>

                          <p
                            className={`mt-4 text-sm font-semibold ${
                              isCompleted ? "text-slate-900" : "text-slate-400"
                            }`}
                          >
                            {step.label}
                          </p>

                          {isCurrent && (
                            <p className="mt-1 text-xs font-medium text-emerald-600">
                              Current status
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile Progress */}

              <div className="mt-10 space-y-7 sm:hidden">
                {statusSteps.map((step, index) => {
                  const isCompleted = currentStatusIndex >= index;

                  const isCurrent = currentStatusIndex === index;

                  return (
                    <div key={step.key} className="relative flex gap-4">
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`absolute left-[15px] top-8 h-10 w-0.5 ${
                            currentStatusIndex > index
                              ? "bg-emerald-500"
                              : "bg-slate-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>

                      <div>
                        <p
                          className={`font-semibold ${
                            isCompleted ? "text-slate-900" : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </p>

                        {isCurrent && (
                          <p className="mt-1 text-xs font-medium text-emerald-600">
                            Current status
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =====================================
                RIGHT CTA
            ===================================== */}

            <aside className="lg:pt-8">
              <div className="lg:sticky lg:top-8">
                <div className="rounded-[28px] bg-slate-950  p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/10 bg-primary">
                    <FileWarning className="h-5 w-5 text-white " />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">
                    See another issue?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white">
                    Help make your community better by reporting another issue
                    through CityCare.
                  </p>

                  <Button
                    type="button"
                    onClick={handleReportIssue}
                    disabled={isUserLoading}
                    className="mt-6 w-full rounded-xl bg-primary py-5 text-white hover:bg-slate-700"
                  >
                    {isUserLoading
                      ? "Checking account..."
                      : "Create a Complaint"}

                    {!isUserLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>

                  {!isUserLoading && user && user.role !== "CITIZEN" && (
                    <p className="mt-3 text-center text-xs text-white">
                      Only citizens can submit complaints.
                    </p>
                  )}
                </div>

                <Link
                  href="/complaints"
                  className="group mt-5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Browse all complaints
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* =========================================
          CREATE COMPLAINT DIALOG
      ========================================= */}

      <CreateComplaintDialog
        open={isCreateComplaintOpen}
        onOpenChange={setIsCreateComplaintOpen}
      />
    </>
  );
};

export default ComplaintDetailsPage;
