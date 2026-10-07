"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  MapPin,
  Search,
  ArrowUpDown,
  Eye,
} from "lucide-react";

import { usePublicComplaints } from "@/hooks/complaint.hook";
import type { Complaint } from "@/types/complaint";

const PAGE_LIMIT = 9;

const getStatusStyle = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "border-blue-200 bg-blue-50 text-blue-600";

    case "ASSIGNED":
      return "border-purple-200 bg-purple-50 text-purple-600";

    case "IN_PROGRESS":
      return "border-primary/20 bg-primary/10 text-primary";

    case "COMPLETED":
      return "border-green-200 bg-green-50 text-green-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
};

const formatStatus = (status: string) => {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

const ComplaintsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialSort = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSort);
  const [page, setPage] = useState(initialPage);

  // Debounce search
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (sortOrder !== "desc") {
      params.set("sortOrder", sortOrder);
    }

    if (page > 1) {
      params.set("page", String(page));
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }, [search, sortOrder, page, pathname, router]);

  const {
    data: complaintsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = usePublicComplaints({
    page,
    limit: PAGE_LIMIT,
    search: search || undefined,
    sortOrder,
  });

  const complaints = complaintsResponse?.complaints ?? [];

  const pagination = complaintsResponse?.pagination;

  const totalComplaints = pagination?.total ?? 0;

  const totalPages = pagination?.totalPages ?? 1;

  const handlePreviousPage = () => {
    if (page > 1 && !isFetching) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages && !isFetching) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    setPage(1);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* =========================================
          HERO
      ========================================= */}
      <section className="border-b border-border bg-gradient-to-b from-primary/[0.06] via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardList className="h-7 w-7" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Citizen Complaints
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Explore City Complaints
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Browse reported issues in the community, follow their progress,
              and see how CityCare is helping improve everyday city life.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          CONTENT
      ========================================= */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header + Controls */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Public complaints
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              Recent Reports
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {isLoading
                ? "Loading complaints..."
                : `${totalComplaints} complaint${
                    totalComplaints === 1 ? "" : "s"
                  } available`}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            {/* Search */}
            <div className="relative min-w-0 flex-1 sm:min-w-[280px]">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search complaints..."
                className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <select
                value={sortOrder}
                onChange={(event) =>
                  handleSortChange(event.target.value as "asc" | "desc")
                }
                className="h-11 w-full appearance-none rounded-xl border border-border bg-card pl-10 pr-9 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 sm:w-[160px]"
              >
                <option value="desc">Newest first</option>

                <option value="asc">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================
            LOADING
        ========================================= */}
        {isLoading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-2 animate-pulse bg-muted" />

                <div className="space-y-4 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />

                  <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />

                  <div className="space-y-2">
                    <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                  </div>

                  <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =========================================
            ERROR
        ========================================= */}
        {!isLoading && isError && (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-border bg-card px-6">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                Unable to load complaints
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Something went wrong while loading public complaints. Please try
                again.
              </p>

              <button
                type="button"
                onClick={() => refetch()}
                className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* =========================================
            EMPTY
        ========================================= */}
        {!isLoading && !isError && complaints.length === 0 && (
          <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <ClipboardList className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                No complaints found
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {search
                  ? "Try using a different search term."
                  : "There are currently no public complaints to display."}
              </p>
            </div>
          </div>
        )}

        {/* =========================================
            COMPLAINT CARDS
        ========================================= */}
        {!isLoading && !isError && complaints.length > 0 && (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {complaints.map((complaint) => (
                <article
                  key={complaint.id}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
                >
                  {/* Top accent */}
                  <div className="h-1.5 bg-primary/80" />

                  <div className="p-5">
                    {/* Category + Status */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                        {complaint.category?.name ?? "General"}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                          complaint.status,
                        )}`}
                      >
                        {formatStatus(complaint.status)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 line-clamp-2 text-lg font-bold leading-7 text-foreground transition-colors group-hover:text-primary">
                      {complaint.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {complaint.description}
                    </p>

                    {/* Location */}
                    <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                      <span className="line-clamp-2">{complaint.location}</span>
                    </div>

                    {/* Date */}
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />

                      <span>Reported {formatDate(complaint.createdAt)}</span>
                    </div>

                    {/* Action */}
                    <Link
                      href={`/complaints/${complaint.id}`}
                      className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      <Eye className="h-4 w-4" />
                      View Complaint
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* =========================================
                  PAGINATION
              ========================================= */}
            {totalPages > 1 && (
              <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-semibold text-foreground">{page}</span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={page === 1 || isFetching}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </button>

                  <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground">
                    {page}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={page >= totalPages || isFetching}
                    className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ComplaintsPage;
