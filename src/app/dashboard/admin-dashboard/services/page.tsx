"use client";

import type { ChangeEvent, FormEvent } from "react";

import { useEffect, useMemo, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Activity,
  ArrowDownUp,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Edit3,
  ImageIcon,
  Loader2,
  Plus,
  Search,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useAllServices,
  useCreateService,
  useUpdateService,
} from "@/hooks/service.hook";

import type { Service } from "@/types/service";

import {
  serviceSchema,
  type ServiceFormValues,
} from "@/lib/validations/service.schema";

import RoleGuard from "../../guard/role-guard";

import { toast } from "sonner";

import Image from "next/image";

const PAGE_LIMIT = 10;

type SortOrder = "asc" | "desc";

const AdminServicesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // =========================================================
  // URL STATE
  // =========================================================

  const searchFromUrl = searchParams.get("search") ?? "";
  const minFeeFromUrl = searchParams.get("minFee") ?? "";
  const maxFeeFromUrl = searchParams.get("maxFee") ?? "";

  const sortFromUrl: SortOrder =
    searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  const pageFromUrl = Number(searchParams.get("page") ?? "1");

  const currentPage =
    Number.isInteger(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;

  // =========================================================
  // LOCAL FILTER STATE
  // =========================================================

  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const [minFeeInput, setMinFeeInput] = useState(minFeeFromUrl);
  const [maxFeeInput, setMaxFeeInput] = useState(maxFeeFromUrl);

  // =========================================================
  // CREATE / EDIT
  // =========================================================

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // =========================================================
  // IMAGE
  // =========================================================

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // =========================================================
  // QUERY
  // =========================================================

  const { data, isLoading, isError, isFetching, refetch } = useAllServices({
    page: currentPage,
    limit: PAGE_LIMIT,
    search: searchFromUrl || undefined,
    minFee: minFeeFromUrl ? Number(minFeeFromUrl) : undefined,
    maxFee: maxFeeFromUrl ? Number(maxFeeFromUrl) : undefined,
    sortOrder: sortFromUrl,
  });

  const createServiceMutation = useCreateService();

  const updateServiceMutation = useUpdateService();

  // =========================================================
  // FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      name: "",
      description: "",
      baseFee: "",
    },
  });

  // =========================================================
  // DATA
  // =========================================================

  const services = data?.data ?? [];

  const pagination = data?.pagination;

  const totalServices = pagination?.total ?? services.length;

  const activeServices = useMemo(
    () => services.filter((service) => service.isActive).length,
    [services],
  );

  const inactiveServices = useMemo(
    () => services.filter((service) => !service.isActive).length,
    [services],
  );

  // =========================================================
  // SYNC INPUT WITH URL
  // =========================================================

  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  useEffect(() => {
    setMinFeeInput(minFeeFromUrl);
  }, [minFeeFromUrl]);

  useEffect(() => {
    setMaxFeeInput(maxFeeFromUrl);
  }, [maxFeeFromUrl]);

  // =========================================================
  // UPDATE URL
  // =========================================================

  const updateUrl = (values: {
    search?: string;
    minFee?: string;
    maxFee?: string;
    sortOrder?: SortOrder;
    page?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.search !== undefined) {
      const value = values.search.trim();

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
    }

    if (values.minFee !== undefined) {
      const value = values.minFee.trim();

      if (value) {
        params.set("minFee", value);
      } else {
        params.delete("minFee");
      }
    }

    if (values.maxFee !== undefined) {
      const value = values.maxFee.trim();

      if (value) {
        params.set("maxFee", value);
      } else {
        params.delete("maxFee");
      }
    }

    if (values.sortOrder !== undefined) {
      if (values.sortOrder === "desc") {
        params.delete("sortOrder");
      } else {
        params.set("sortOrder", values.sortOrder);
      }
    }

    if (values.page !== undefined) {
      if (values.page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(values.page));
      }
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  // =========================================================
  // FILTER HANDLERS
  // =========================================================

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUrl({
      search: searchInput,
      page: 1,
    });
  };

  const handleMinFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setMinFeeInput(value);

    updateUrl({
      minFee: value,
      page: 1,
    });
  };

  const handleMaxFeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setMaxFeeInput(value);

    updateUrl({
      maxFee: value,
      page: 1,
    });
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUrl({
      sortOrder: event.target.value === "asc" ? "asc" : "desc",
      page: 1,
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setMinFeeInput("");
    setMaxFeeInput("");

    router.push(pathname);
  };

  const hasActiveFilters =
    Boolean(searchFromUrl) ||
    Boolean(minFeeFromUrl) ||
    Boolean(maxFeeFromUrl) ||
    sortFromUrl !== "desc";

  // =========================================================
  // FORM RESET
  // =========================================================

  const resetForm = () => {
    setSelectedService(null);

    setSelectedImage(null);

    setImagePreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    reset({
      name: "",
      description: "",
      baseFee: "",
    });

    setIsFormOpen(false);
  };

  // =========================================================
  // CREATE
  // =========================================================

  const handleCreate = () => {
    setSelectedService(null);

    setSelectedImage(null);

    setImagePreview(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    reset({
      name: "",
      description: "",
      baseFee: "",
    });

    setIsFormOpen(true);
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (service: Service) => {
    setSelectedService(service);

    setSelectedImage(null);

    setImagePreview(service.imageUrl ?? null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    reset({
      name: service.name,
      description: service.description ?? "",
      baseFee: service.baseFee,
    });

    setIsFormOpen(true);
  };

  // =========================================================
  // IMAGE
  // =========================================================

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================================================
  // CREATE / UPDATE
  // =========================================================

  const onSubmit = (formData: ServiceFormValues) => {
    if (selectedService) {
      updateServiceMutation.mutate(
        {
          id: selectedService.id,

          data: {
            name: formData.name,
            description: formData.description || undefined,
            baseFee: Number(formData.baseFee),
            image: selectedImage ?? undefined,
          },
        },

        {
          onSuccess: () => {
            toast.success("Service updated successfully.");

            resetForm();
          },

          onError: (error) => {
            toast.error(
              error instanceof Error
                ? error.message
                : "Failed to update service.",
            );
          },
        },
      );

      return;
    }

    createServiceMutation.mutate(
      {
        name: formData.name,
        description: formData.description || undefined,
        baseFee: Number(formData.baseFee),
        image: selectedImage ?? undefined,
      },

      {
        onSuccess: () => {
          toast.success("Service created successfully.");

          resetForm();
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to create service.",
          );
        },
      },
    );
  };

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  const handleToggleStatus = (service: Service) => {
    updateServiceMutation.mutate(
      {
        id: service.id,

        data: {
          isActive: !service.isActive,
        },
      },

      {
        onSuccess: () => {
          toast.success(
            service.isActive
              ? "Service deactivated successfully."
              : "Service activated successfully.",
          );
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update service status.",
          );
        },
      },
    );
  };

  const isSaving =
    createServiceMutation.isPending || updateServiceMutation.isPending;

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="space-y-6 p-7 pb-8">
          <div className="h-40 animate-pulse rounded-2xl bg-card shadow-sm" />

          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({
              length: 3,
            }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-card shadow-sm"
              />
            ))}
          </div>

          <div className="h-32 animate-pulse rounded-2xl bg-card shadow-sm" />

          <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="flex h-20 animate-pulse items-center gap-4 border-b border-border px-6 last:border-b-0"
              >
                <div className="h-11 w-11 rounded-xl bg-muted" />

                <div className="h-4 w-40 rounded bg-muted" />

                <div className="h-4 flex-1 rounded bg-muted" />

                <div className="h-4 w-20 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </RoleGuard>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (isError) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="p-7">
          <div className="rounded-2xl border border-destructive/20 bg-card px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <X className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-foreground">
              Failed to load services
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Something went wrong while loading the services. Please try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              <Activity className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="relative overflow-hidden shadow-sm">
        <div className="space-y-7 p-4 pb-8 sm:p-6 lg:p-7">
          {/* =====================================================
              HERO
          ====================================================== */}

          <section className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

            <div className="relative p-6 sm:p-7 lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-medium text-secondary">
                    Service Management{" "}
                  </div>

                  <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    City Services
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Manage city services, update service information, control
                    availability and keep everything organized for citizens.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCreate}
                  className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                  Create Service
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================
              STATISTICS
          ====================================================== */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Total */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Services
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {totalServices}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    All registered city services
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Active */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/25 hover:shadow-lg hover:shadow-secondary/5">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-secondary/10 blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Services
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {activeServices}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently available to citizens
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Check className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* Inactive */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-muted-foreground/25 hover:shadow-lg">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-muted blur-2xl transition-transform duration-500 group-hover:scale-150" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Inactive Services
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                    {inactiveServices}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Temporarily unavailable services
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-all duration-300 group-hover:scale-110">
                  <ToggleLeft className="h-5 w-5" />
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              FILTERS
          ====================================================== */}

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <SlidersHorizontal className="h-4 w-4" />
                  </div>

                  <h2 className="text-base font-bold text-foreground">
                    Search & Filters
                  </h2>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  Find services quickly using search, fee range or sorting.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-9 w-fit items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-muted-foreground transition hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="xl:col-span-1">
                <label
                  htmlFor="service-search"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Search Service
                </label>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="service-search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search service..."
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </form>

              {/* Minimum Fee */}
              <div>
                <label
                  htmlFor="minimum-fee"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Minimum Fee
                </label>

                <div className="relative">
                  <CircleDollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="minimum-fee"
                    type="number"
                    min="0"
                    value={minFeeInput}
                    onChange={handleMinFeeChange}
                    placeholder="Minimum fee"
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Maximum Fee */}
              <div>
                <label
                  htmlFor="maximum-fee"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Maximum Fee
                </label>

                <div className="relative">
                  <CircleDollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="maximum-fee"
                    type="number"
                    min="0"
                    value={maxFeeInput}
                    onChange={handleMaxFeeChange}
                    placeholder="Maximum fee"
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label
                  htmlFor="sort-order"
                  className="mb-2 block text-xs font-medium text-muted-foreground"
                >
                  Sort Order
                </label>

                <div className="relative">
                  <ArrowDownUp className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <select
                    id="sort-order"
                    value={sortFromUrl}
                    onChange={handleSortChange}
                    className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="desc">Newest First</option>

                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              SERVICE LIST
          ====================================================== */}

          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    All Services
                  </h2>

                  {isFetching && (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {totalServices} {totalServices === 1 ? "service" : "services"}{" "}
                  found
                </p>
              </div>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchFromUrl && (
                    <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      Search: {searchFromUrl}
                    </span>
                  )}

                  {minFeeFromUrl && (
                    <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                      Min: ৳{minFeeFromUrl}
                    </span>
                  )}

                  {maxFeeFromUrl && (
                    <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                      Max: ৳{maxFeeFromUrl}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ===================================================
                TABLE
            =================================================== */}

            {services.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-left">
                        <th className="w-[78px] px-5 py-4 text-xs font-semibold text-muted-foreground">
                          Image
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                          Service
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                          Description
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                          Base Fee
                        </th>

                        <th className="px-5 py-4 text-xs font-semibold text-muted-foreground">
                          Status
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-semibold text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                      {services.map((service) => (
                        <tr
                          key={service.id}
                          className="group transition-colors duration-200 hover:bg-muted/30"
                        >
                          {/* Image */}
                          <td className="px-5 py-3.5">
                            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
                              {service.imageUrl ? (
                                <Image
                                  src={service.imageUrl}
                                  alt={service.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                                  sizes="48px"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                  <ImageIcon className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Service */}
                          <td className="px-5 py-3.5">
                            <div className="min-w-[180px]">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {service.name}
                              </p>

                              <p className="mt-1 text-xs text-muted-foreground">
                                City service
                              </p>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="max-w-[360px] px-5 py-3.5">
                            <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                              {service.description ||
                                "No description available."}
                            </p>
                          </td>

                          {/* Fee */}
                          <td className="px-5 py-3.5">
                            <div className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-primary">
                              <CircleDollarSign className="h-3.5 w-3.5" />

                              <span className="text-sm font-semibold">
                                ৳{service.baseFee}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium ${
                                service.isActive
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  service.isActive
                                    ? "bg-secondary"
                                    : "bg-muted-foreground"
                                }`}
                              />

                              {service.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-3.5">
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(service)}
                                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:text-primary hover:shadow-md"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleToggleStatus(service)}
                                disabled={updateServiceMutation.isPending}
                                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                                  service.isActive
                                    ? "bg-accent/10 text-accent-foreground hover:bg-accent/20 hover:shadow-md"
                                    : "bg-secondary/10 text-secondary hover:bg-secondary/20 hover:shadow-md"
                                }`}
                              >
                                {updateServiceMutation.isPending ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : service.isActive ? (
                                  <ToggleLeft className="h-3.5 w-3.5" />
                                ) : (
                                  <ToggleRight className="h-3.5 w-3.5" />
                                )}

                                {service.isActive ? "Deactivate" : "Activate"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                {pagination && pagination.totalPages > 1 && (
                  <div className="flex flex-col gap-4 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Showing {(pagination.page - 1) * PAGE_LIMIT + 1} to{" "}
                        {Math.min(
                          pagination.page * PAGE_LIMIT,
                          pagination.total,
                        )}{" "}
                        of {pagination.total} services
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage <= 1 || isFetching}
                        onClick={() =>
                          updateUrl({
                            page: currentPage - 1,
                          })
                        }
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                        Previous
                      </button>

                      <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm">
                        {currentPage}
                      </div>

                      <button
                        type="button"
                        disabled={
                          currentPage >= pagination.totalPages || isFetching
                        }
                        onClick={() =>
                          updateUrl({
                            page: currentPage + 1,
                          })
                        }
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                  <ImageIcon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-foreground">
                  No services found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  No service matches your current search or filters.
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                      Clear Filters
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCreate}
                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    Create Service
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* =======================================================
            CREATE / EDIT DIALOG
        ======================================================= */}

        <Dialog
          open={isFormOpen}
          onOpenChange={(open) => {
            if (!open && !isSaving) {
              resetForm();
            }
          }}
        >
          <DialogContent className="max-h-[92vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-xl sm:max-w-[680px]">
            <DialogHeader>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {selectedService ? (
                  <Edit3 className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </div>

              <DialogTitle className="mt-3 text-xl text-foreground">
                {selectedService ? "Update Service" : "Create New Service"}
              </DialogTitle>

              <DialogDescription className="text-muted-foreground">
                {selectedService
                  ? "Update the service information below."
                  : "Add a new city service for citizens."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3">
              {/* Name */}
              <div>
                <label
                  htmlFor="service-name"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Service Name
                </label>

                <input
                  id="service-name"
                  {...register("name")}
                  placeholder="e.g. Footpath Repair Service"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />

                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Fee */}
              <div>
                <label
                  htmlFor="base-fee"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Base Fee
                </label>

                <div className="relative">
                  <CircleDollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="base-fee"
                    type="number"
                    min="0"
                    {...register("baseFee")}
                    placeholder="Enter base fee"
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                {errors.baseFee && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">
                    {errors.baseFee.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="service-description"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Description
                </label>

                <textarea
                  id="service-description"
                  {...register("description")}
                  placeholder="Describe this service..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />

                {errors.description && (
                  <p className="mt-1.5 text-xs font-medium text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="service-image"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Service Image
                </label>

                <label
                  htmlFor="service-image"
                  className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-sm transition-all hover:border-primary/30 hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ImageIcon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Choose service image
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or WebP
                    </p>
                  </div>

                  <input
                    ref={imageInputRef}
                    id="service-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>

                {imagePreview && (
                  <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-border bg-muted shadow-sm sm:h-72">
                    <Image
                      src={imagePreview}
                      alt="Service preview"
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 640px"
                    />

                    <div className="absolute left-3 top-3 rounded-md bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
                      Image Preview
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <DialogFooter className="gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSaving}
                  className="h-10 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}

                  {isSaving
                    ? "Saving..."
                    : selectedService
                      ? "Update Service"
                      : "Create Service"}
                </button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </RoleGuard>
  );
};

// =========================================================
// SMALL ICON
// =========================================================

const BriefcaseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />

      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

      <path d="M3 12h18" />

      <path d="M10 12v2h4v-2" />
    </svg>
  );
};

export default AdminServicesPage;
