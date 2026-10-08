"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";

import { useActiveServices } from "@/hooks/service.hook";

const PAGE_LIMIT = 12;

const ServicesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // =====================================================
  // URL STATE
  // =====================================================

  const searchFromUrl = searchParams.get("search") ?? "";

  const sortFromUrl = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  const [search, setSearch] = useState(searchFromUrl);

  // =====================================================
  // GET SERVICES
  // =====================================================

  const { data, isLoading, isFetching, isError, refetch } = useActiveServices({
    page: currentPage,
    limit: PAGE_LIMIT,
    search: searchFromUrl || undefined,
    sortOrder: sortFromUrl,
  });

  const services = data?.data ?? [];
  const pagination = data?.pagination;

  const totalServices = pagination?.total ?? 0;

  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);

  // =====================================================
  // SYNC SEARCH INPUT WITH URL
  // =====================================================

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  // =====================================================
  // UPDATE URL
  // =====================================================

  const updateUrl = (values: {
    search?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.search !== undefined) {
      const trimmedSearch = values.search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");
    }

    if (values.sortOrder !== undefined) {
      params.set("sortOrder", values.sortOrder);

      // Sorting always starts from page 1.
      params.set("page", "1");
    }

    if (values.page !== undefined) {
      params.set("page", values.page.toString());
    }

    const queryString = params.toString();

    router.push(queryString ? `/services?${queryString}` : "/services");
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search,
    });
  };

  // =====================================================
  // SORT
  // =====================================================

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl({
      sortOrder: event.target.value === "asc" ? "asc" : "desc",
    });
  };

  // =====================================================
  // PAGINATION
  // =====================================================

  const handlePreviousPage = () => {
    if (currentPage <= 1 || isFetching) return;

    updateUrl({
      page: currentPage - 1,
    });
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages || isFetching) return;

    updateUrl({
      page: currentPage + 1,
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || isFetching) {
      return;
    }

    updateUrl({
      page,
    });
  };

  // =====================================================
  // PAGINATION NUMBERS
  // =====================================================

  const getPageNumbers = () => {
    const pages: (number | "left-ellipsis" | "right-ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("left-ellipsis");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="min-h-screen bg-background pb-15">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden  bg-muted/20 ">
        {/* Decorative background */}

        <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />

              <span>City services made simple</span>
            </div>

            {/* Heading */}

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Essential services,
              <span className="block text-primary">all in one place.</span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Explore available city services, understand the process, and
              submit your request with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section
        id="services"
        className="mx-auto max-w-7xl px-4  sm:px-6  lg:px-8 "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          {/* Heading */}

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Available services
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Find the service you need
            </h2>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
              Browse available city services and choose the one that matches
              your needs.
            </p>
          </div>

          {/* Search */}

          <form onSubmit={handleSearch} className="w-full lg:max-w-md">
            <div className="flex h-11 overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
              <div className="flex items-center pl-3.5 text-muted-foreground">
                <Search className="h-4.5 w-4.5" />
              </div>
              <div className="relative flex min-w-0 flex-1 items-center">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search services..."
                  className="w-full bg-transparent px-3 pr-9 text-sm outline-none placeholder:text-muted-foreground"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      updateUrl({
                        search: "",
                      });
                    }}
                    aria-label="Clear search"
                    className="absolute right-2 inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="m-1 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* =====================================================
            TOOLBAR
        ====================================================== */}

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border/80 bg-card/70 p-3.5 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          {/* Result information */}

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BadgeCheck className="h-4 w-4 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                {isLoading
                  ? "Loading services..."
                  : `${totalServices} ${
                      totalServices === 1 ? "service" : "services"
                    } available`}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Showing up to {PAGE_LIMIT} services per page.
              </p>
            </div>
          </div>

          {/* Sort */}

          <div className="relative w-full sm:w-auto">
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <select
              value={sortFromUrl}
              onChange={handleSortChange}
              className="h-10 w-full appearance-none rounded-lg border border-border bg-background py-2 pl-3 pr-9 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-auto"
            >
              <option value="desc">Newest first</option>

              <option value="asc">Oldest first</option>
            </select>
          </div>
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {isLoading && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: PAGE_LIMIT }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="h-48 animate-pulse bg-muted sm:h-52" />

                <div className="space-y-3 p-5">
                  <div className="flex justify-between gap-3">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />

                    <div className="h-7 w-16 animate-pulse rounded-lg bg-muted" />
                  </div>

                  <div className="h-4 w-full animate-pulse rounded bg-muted" />

                  <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />

                  <div className="pt-2">
                    <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {isError && !isLoading && (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <span className="text-lg font-bold text-destructive">!</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Unable to load services
            </h3>

            <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
              We could not load the available services right now. Please try
              again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ====================================================== */}

        {!isLoading && !isError && services.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No services found
            </h3>

            <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
              We could not find any service matching your search. Try a
              different keyword.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                router.push("/services");
              }}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Clear search
            </button>
          </div>
        )}

        {/* =====================================================
            SERVICE GRID
        ====================================================== */}

        {!isLoading && !isError && services.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Image */}

                <Link
                  href={`/services/${service.id}`}
                  className="relative block h-48 overflow-hidden bg-muted sm:h-52"
                >
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-secondary/10">
                      <WalletCards className="h-12 w-12 text-primary/40" />
                    </div>
                  )}

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-80" />

                  {/* Status */}

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Available
                    </span>
                  </div>

                  {/* Image hover arrow */}

                  <div className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>

                {/* Content */}

                <div className="flex flex-1 flex-col p-5">
                  {/* Title + Fee */}

                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/services/${service.id}`} className="min-w-0">
                      <h3 className="line-clamp-2 text-lg font-bold leading-6 text-foreground transition-colors group-hover:text-primary">
                        {service.name}
                      </h3>
                    </Link>

                    <div className="shrink-0 rounded-lg bg-primary/10 px-2.5 py-1.5 text-sm font-bold text-primary">
                      ৳{service.baseFee}
                    </div>
                  </div>

                  {/* Description */}

                  <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {service.description ||
                      "Request this city service through CityCare."}
                  </p>

                  {/* Info */}

                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />

                    <span>Secure and trackable service request</span>
                  </div>

                  {/* CTA */}

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/services/${service.id}`}
                      className="group/button flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/15"
                    >
                      View Service
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        {!isLoading && !isError && services.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-card px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
            {/* Page information */}

            <div>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {services.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {totalServices}
                </span>{" "}
                services
              </p>

              <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Pagination controls */}

            <div className="flex items-center justify-between gap-1.5 sm:justify-end">
              {/* Previous */}

              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isFetching}
                aria-label="Previous page"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
              >
                <ChevronLeft className="h-4 w-4" />

                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page numbers */}

              <div className="flex items-center gap-1">
                {pageNumbers.map((page) => {
                  if (page === "left-ellipsis" || page === "right-ellipsis") {
                    return (
                      <span
                        key={page}
                        className="flex h-9 w-7 items-center justify-center text-xs text-muted-foreground"
                      >
                        ...
                      </span>
                    );
                  }

                  const isCurrent = page === currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      disabled={isFetching}
                      aria-label={`Go to page ${page}`}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-all ${
                        isCurrent
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "border border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next */}

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages || isFetching}
                aria-label="Next page"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
              >
                <span className="hidden sm:inline">Next</span>

                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ServicesPage;
