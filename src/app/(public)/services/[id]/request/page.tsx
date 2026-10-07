"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";
import ServiceRequestForm from "@/components/form/service-request-form";

const ServiceRequestPage = () => {
  const params = useParams();
  const router = useRouter();

  const { data, isLoading } = useCurrentUser();

  const serviceId = typeof params.id === "string" ? params.id : "";

  const user = data?.data;

  useEffect(() => {
    if (isLoading || !serviceId) {
      return;
    }

    if (!user) {
      const redirectUrl = `/services/${serviceId}/request`;

      router.replace(`/login?redirect=${encodeURIComponent(redirectUrl)}`);

      return;
    }

    if (user.role !== "CITIZEN") {
      router.replace(`/services/${serviceId}`);
    }
  }, [isLoading, serviceId, user, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Checking your account...
        </p>
      </div>
    );
  }

  if (!serviceId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Invalid service.</p>
      </div>
    );
  }

  if (!user || user.role !== "CITIZEN") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return <ServiceRequestForm serviceId={serviceId} />;
};

export default ServiceRequestPage;
