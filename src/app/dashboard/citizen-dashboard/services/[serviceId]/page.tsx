"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import RoleGuard from "../../../guard/role-guard";
import { useActiveServices } from "@/hooks/service.hook";

const CitizenServiceDetailsPage = () => {
  const params = useParams();

  const serviceId =
    typeof params.serviceId === "string" ? params.serviceId : "";

  const { data, isLoading, isError } = useActiveServices({
    page: 1,
    limit: 100,
  });

  const service = data?.data.find((item) => item.id === serviceId);

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="p-6">
        {/* Back Button */}
        <Link
          href="/dashboard/citizen-dashboard/services"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to Services
        </Link>

        {/* Loading */}
        {isLoading && (
          <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-7 w-1/3 rounded bg-gray-200" />

              <div className="h-4 w-full rounded bg-gray-200" />

              <div className="h-4 w-4/5 rounded bg-gray-200" />

              <div className="h-10 w-32 rounded bg-gray-200" />
            </div>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="font-semibold text-red-700">
              Failed to load service
            </h2>

            <p className="mt-1 text-sm text-red-600">Please try again later.</p>
          </div>
        )}

        {/* Service Not Found */}
        {!isLoading && !isError && !service && (
          <div className="mt-6 rounded-lg border bg-white p-10 text-center shadow-sm">
            <h2 className="text-lg font-semibold">Service not found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              This service may no longer be available.
            </p>

            <Link
              href="/dashboard/citizen-dashboard/services"
              className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Browse Services
            </Link>
          </div>
        )}

        {/* Service Details */}
        {!isLoading && !isError && service && (
          <div className="mt-6 max-w-3xl rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{service.name}</h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description || "No description available."}
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Active
              </span>
            </div>

            <div className="mt-8 rounded-lg bg-muted/50 p-5">
              <p className="text-sm text-muted-foreground">Base Fee</p>

              <p className="mt-1 text-3xl font-bold">৳{service.baseFee}</p>
            </div>

            <div className="mt-6 border-t pt-6">
              <h2 className="text-lg font-semibold">Request this service</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Submit a service request with your location and additional
                information.
              </p>

              <Link
                href={`/dashboard/citizen-dashboard/services/${service.id}/request`}
                className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Request This Service
              </Link>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

export default CitizenServiceDetailsPage;
