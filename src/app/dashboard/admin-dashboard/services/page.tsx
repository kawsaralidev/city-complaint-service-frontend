"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const AdminServicesPage = () => {
  // Search, filter and pagination states
  const [search, setSearch] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  // Currently selected service for editing
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Service API hooks
  const { data, isLoading, isError } = useAllServices({
    page,
    limit: 10,
    search: search || undefined,
    minFee: minFee ? Number(minFee) : undefined,
    maxFee: maxFee ? Number(maxFee) : undefined,
    sortOrder,
  });

  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();

  // React Hook Form + Zod
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

  const services = data?.data ?? [];
  const pagination = data?.pagination;

  // Reset service form
  const resetForm = () => {
    setSelectedService(null);

    reset({
      name: "",
      description: "",
      baseFee: "",
    });
  };

  // Load selected service into form
  const handleEdit = (service: Service) => {
    setSelectedService(service);

    reset({
      name: service.name,
      description: service.description ?? "",
      baseFee: service.baseFee,
    });
  };

  // Create or update service
  const onSubmit = (data: ServiceFormValues) => {
    if (selectedService) {
      updateServiceMutation.mutate({
        id: selectedService.id,
        data: {
          name: data.name,
          description: data.description || undefined,
          baseFee: Number(data.baseFee),
        },
      });

      resetForm();
      return;
    }

    createServiceMutation.mutate({
      name: data.name,
      description: data.description || undefined,
      baseFee: Number(data.baseFee),
    });

    resetForm();
  };

  // Activate / deactivate service
  const handleToggleStatus = (service: Service) => {
    updateServiceMutation.mutate({
      id: service.id,
      data: {
        isActive: !service.isActive,
      },
    });
  };

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Service Management</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage city services.
          </p>
        </div>

        {/* Service Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              {selectedService ? "Update Service" : "Create Service"}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Service Name */}
            <div>
              <label
                htmlFor="service-name"
                className="mb-1 block text-sm font-medium"
              >
                Service Name
              </label>

              <input
                id="service-name"
                {...register("name")}
                placeholder="Enter service name"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Base Fee */}
            <div>
              <label
                htmlFor="base-fee"
                className="mb-1 block text-sm font-medium"
              >
                Base Fee
              </label>

              <input
                id="base-fee"
                type="number"
                min="0"
                {...register("baseFee")}
                placeholder="Enter base fee"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />

              {errors.baseFee && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.baseFee.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="service-description"
                className="mb-1 block text-sm font-medium"
              >
                Description
              </label>

              <input
                id="service-description"
                {...register("description")}
                placeholder="Enter description"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />

              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={
                createServiceMutation.isPending ||
                updateServiceMutation.isPending
              }
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {createServiceMutation.isPending ||
              updateServiceMutation.isPending
                ? "Saving..."
                : selectedService
                  ? "Update Service"
                  : "Create Service"}
            </button>

            {selectedService && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border px-4 py-2 text-sm font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Filters */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Filters</h2>

          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div>
              <label
                htmlFor="service-search"
                className="mb-1 block text-sm font-medium"
              >
                Search
              </label>

              <input
                id="service-search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search service..."
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Minimum Fee */}
            <div>
              <label
                htmlFor="minimum-fee"
                className="mb-1 block text-sm font-medium"
              >
                Minimum Fee
              </label>

              <input
                id="minimum-fee"
                type="number"
                min="0"
                value={minFee}
                onChange={(event) => {
                  setMinFee(event.target.value);
                  setPage(1);
                }}
                placeholder="Minimum fee"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Maximum Fee */}
            <div>
              <label
                htmlFor="maximum-fee"
                className="mb-1 block text-sm font-medium"
              >
                Maximum Fee
              </label>

              <input
                id="maximum-fee"
                type="number"
                min="0"
                value={maxFee}
                onChange={(event) => {
                  setMaxFee(event.target.value);
                  setPage(1);
                }}
                placeholder="Maximum fee"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="sort-order"
                className="mb-1 block text-sm font-medium"
              >
                Sort Order
              </label>

              <select
                id="sort-order"
                value={sortOrder}
                onChange={(event) => {
                  setSortOrder(event.target.value as "asc" | "desc");
                  setPage(1);
                }}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Service List */}
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">All Services</h2>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="p-6 text-sm text-muted-foreground">
              Loading services...
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="p-6 text-sm text-red-500">
              Failed to load services.
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && services.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No services found.
            </div>
          )}

          {/* Service Table */}
          {!isLoading && !isError && services.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b text-left text-sm">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Base Fee</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b last:border-b-0">
                      <td className="px-6 py-4 font-medium">{service.name}</td>

                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {service.description || "—"}
                      </td>

                      <td className="px-6 py-4">৳{service.baseFee}</td>

                      <td className="px-6 py-4">
                        <span
                          className={
                            service.isActive
                              ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                              : "rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                          }
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(service)}
                            className="rounded-md border px-3 py-1.5 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(service)}
                            disabled={updateServiceMutation.isPending}
                            className="rounded-md border px-3 py-1.5 text-sm"
                          >
                            {service.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t p-6">
              <p className="text-sm text-muted-foreground">
                Page {pagination.page} of {pagination.totalPages}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-md border px-3 py-1.5 text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminServicesPage;
