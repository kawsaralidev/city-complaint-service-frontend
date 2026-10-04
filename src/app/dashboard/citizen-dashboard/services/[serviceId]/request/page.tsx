"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RoleGuard from "../../../../guard/role-guard";
import { useActiveServices } from "@/hooks/service.hook";
import { useCreateServiceRequest } from "@/hooks/service-request.hook";

import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/lib/validations/service-request.schema";

const CitizenServiceRequestPage = () => {
  const params = useParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [image, setImage] = useState<File | undefined>();

  const serviceId =
    typeof params.serviceId === "string" ? params.serviceId : "";

  const { data, isLoading, isError } = useActiveServices({
    page: 1,
    limit: 100,
  });

  const createServiceRequestMutation = useCreateServiceRequest();

  const service = data?.data.find((item) => item.id === serviceId);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceId,
      location: "",
      description: "",
    },
  });

  const handleNext = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      const isValid = await trigger(["location", "description"]);

      if (!isValid) {
        return;
      }

      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((currentStep) => currentStep - 1);
    }
  };

  const onSubmit = (formData: ServiceRequestFormValues) => {
    createServiceRequestMutation.mutate(
      {
        serviceId: formData.serviceId,
        location: formData.location,
        description: formData.description || undefined,
        image,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/citizen-dashboard/service-requests");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <div className="p-6">
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />

          <div className="mt-6 h-64 animate-pulse rounded-lg bg-muted" />
        </div>
      </RoleGuard>
    );
  }

  if (isError) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <div className="p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
            Failed to load service information.
          </div>
        </div>
      </RoleGuard>
    );
  }

  if (!service) {
    return (
      <RoleGuard requiredRole="CITIZEN">
        <div className="p-6">
          <div className="rounded-lg border p-6">
            <h1 className="text-xl font-semibold">Service Not Found</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              The selected service is no longer available.
            </p>

            <Link
              href="/dashboard/citizen-dashboard/services"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        <div>
          <Link
            href={`/dashboard/citizen-dashboard/services/${service.id}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to Service
          </Link>

          <h1 className="mt-3 text-2xl font-bold">Request Service</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete the steps below to submit your service request.
          </p>
        </div>

        {/* Progress */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div
            className={`rounded-lg border p-4 ${
              step >= 1 ? "border-primary" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 1</p>
            <p className="text-sm text-muted-foreground">Service</p>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              step >= 2 ? "border-primary" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 2</p>
            <p className="text-sm text-muted-foreground">Request Details</p>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              step >= 3 ? "border-primary" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 3</p>
            <p className="text-sm text-muted-foreground">Review</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-xl border bg-background p-6"
        >
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Confirm Service</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Make sure you selected the correct service.
                </p>
              </div>

              <div className="rounded-lg border p-5">
                <h3 className="text-lg font-semibold">{service.name}</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description || "No description available."}
                </p>

                <div className="mt-5">
                  <p className="text-sm text-muted-foreground">Base Fee</p>

                  <p className="mt-1 text-2xl font-bold">৳{service.baseFee}</p>
                </div>
              </div>

              <input
                type="hidden"
                {...register("serviceId")}
                value={service.id}
              />
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Request Details</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Provide the information needed to process your request.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>

                <input
                  id="location"
                  {...register("location")}
                  placeholder="Enter service location"
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>

                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe your service requirement"
                  rows={5}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                />

                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Image
                  <span className="ml-1 text-muted-foreground">(Optional)</span>
                </label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0];

                    setImage(selectedFile);
                  }}
                  className="w-full rounded-md border p-2 text-sm"
                />

                {image && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Review Your Request</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Check your information before submitting.
                </p>
              </div>

              <div className="space-y-4 rounded-lg border p-5">
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>

                  <p className="font-medium">{service.name}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Base Fee</p>

                  <p className="font-medium">৳{service.baseFee}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Location</p>

                  <p className="font-medium">{getValues("location")}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Description</p>

                  <p className="font-medium">
                    {getValues("description") || "No description"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Image</p>

                  <p className="font-medium">
                    {image ? image.name : "No image"}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4 text-sm">
                After submission, your request will be sent to the
                administration for review.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-md border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={createServiceRequestMutation.isPending}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
              >
                {createServiceRequestMutation.isPending
                  ? "Submitting..."
                  : "Submit Request"}
              </button>
            )}
          </div>

          {createServiceRequestMutation.isError && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Failed to submit service request. Please try again.
            </div>
          )}
        </form>
      </div>
    </RoleGuard>
  );
};

export default CitizenServiceRequestPage;
