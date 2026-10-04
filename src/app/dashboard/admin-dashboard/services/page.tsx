"use client";

import { useState } from "react";
import {
  useAllServices,
  useCreateService,
  useUpdateService,
} from "@/hooks/service.hook";

import type { Service } from "@/types/service";
import RoleGuard from "../../guard/role-guard";

const AdminServicesPage = () => {
  const [search, setSearch] = useState("");
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [baseFee, setBaseFee] = useState("");

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

  const services = data?.data ?? [];
  const pagination = data?.pagination;

  const resetForm = () => {
    setSelectedService(null);
    setName("");
    setDescription("");
    setBaseFee("");
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setName(service.name);
    setDescription(service.description ?? "");
    setBaseFee(service.baseFee);
  };

  const handleSubmit = () => {
    if (!name.trim() || !baseFee) {
      return;
    }

    if (selectedService) {
      updateServiceMutation.mutate({
        id: selectedService.id,
        data: {
          name: name.trim(),
          description: description.trim() || undefined,
          baseFee: Number(baseFee),
        },
      });

      resetForm();
      return;
    }

    createServiceMutation.mutate({
      name: name.trim(),
      description: description.trim() || undefined,
      baseFee: Number(baseFee),
    });

    resetForm();
  };

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
        <div>
          <h1 className="text-2xl font-bold">Service Management</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage city services.
          </p>
        </div>

        {/* Service Form */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              {selectedService ? "Update Service" : "Create Service"}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="service-name"
                className="mb-1 block text-sm font-medium"
              >
                Service Name
              </label>

              <input
                id="service-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter service name"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

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
                value={baseFee}
                onChange={(event) => setBaseFee(event.target.value)}
                placeholder="Enter base fee"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>

            <div>
              <label
                htmlFor="service-description"
                className="mb-1 block text-sm font-medium"
              >
                Description
              </label>

              <input
                id="service-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter description"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleSubmit}
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
        </div>

        {/* Filters */}
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Filters</h2>

          <div className="grid gap-4 md:grid-cols-4">
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search service..."
              className="rounded-md border px-3 py-2 text-sm outline-none"
            />

            <input
              type="number"
              min="0"
              value={minFee}
              onChange={(event) => {
                setMinFee(event.target.value);
                setPage(1);
              }}
              placeholder="Minimum fee"
              className="rounded-md border px-3 py-2 text-sm outline-none"
            />

            <input
              type="number"
              min="0"
              value={maxFee}
              onChange={(event) => {
                setMaxFee(event.target.value);
                setPage(1);
              }}
              placeholder="Maximum fee"
              className="rounded-md border px-3 py-2 text-sm outline-none"
            />

            <select
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value as "asc" | "desc");
                setPage(1);
              }}
              className="rounded-md border px-3 py-2 text-sm outline-none"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Service List */}
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">All Services</h2>
          </div>

          {isLoading && (
            <div className="p-6 text-sm text-muted-foreground">
              Loading services...
            </div>
          )}

          {isError && (
            <div className="p-6 text-sm text-red-500">
              Failed to load services.
            </div>
          )}

          {!isLoading && !isError && services.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No services found.
            </div>
          )}

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
                              ? "rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700"
                              : "rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600"
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
