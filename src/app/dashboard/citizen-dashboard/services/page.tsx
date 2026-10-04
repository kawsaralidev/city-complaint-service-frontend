"use client";

import Link from "next/link";

import RoleGuard from "../../guard/role-guard";
import { useActiveServices } from "@/hooks/service.hook";

const CitizenServicesPage = () => {
  const { data, isLoading, isError } = useActiveServices({
    page: 1,
    limit: 50,
    sortOrder: "desc",
  });

  const services = data?.data ?? [];

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">Available Services</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Browse the services available in your city.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-lg border bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-5 w-2/3 rounded bg-gray-200" />

                <div className="mb-2 h-4 w-full rounded bg-gray-200" />

                <div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />

                <div className="h-9 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h2 className="font-semibold text-red-700">
              Failed to load services
            </h2>

            <p className="mt-1 text-sm text-red-600">Please try again later.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && services.length === 0 && (
          <div className="rounded-lg border bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold">No services available</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no active services available.
            </p>
          </div>
        )}

        {/* Service Cards */}
        {!isLoading && !isError && services.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{service.name}</h2>

                  <p className="mt-2 min-h-[48px] text-sm text-muted-foreground">
                    {service.description || "No description available."}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm text-muted-foreground">Base Fee</p>

                    <p className="mt-1 text-xl font-bold">৳{service.baseFee}</p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/citizen-dashboard/services/${service.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Service
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Information */}
        {data?.pagination && data.pagination.total > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Showing {services.length} of {data.pagination.total} services
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

export default CitizenServicesPage;
