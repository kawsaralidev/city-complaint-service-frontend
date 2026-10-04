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

const CreateServiceRequestPage = () => {
  const params = useParams();
  const router = useRouter();

  const serviceId =
    typeof params.serviceId === "string" ? params.serviceId : "";

  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();

  const { data, isLoading: isServicesLoading } = useActiveServices({
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
    if (step === 1) {
      router.back();
      return;
    }

    setStep((currentStep) => currentStep - 1);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedImage(undefined);
      return;
    }

    setSelectedImage(file);
  };

  const onSubmit = (formData: ServiceRequestFormValues) => {
    createServiceRequestMutation.mutate(
      {
        serviceId: formData.serviceId,
        location: formData.location,
        description: formData.description || undefined,
        image: selectedImage,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/citizen-dashboard/service-request");
        },
      },
    );
  };

  const values = getValues();

  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="space-y-6 p-6">
        <div>
          <Link
            href={`/dashboard/citizen-dashboard/services/${serviceId}`}
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Back to Service
          </Link>

          <h1 className="mt-3 text-2xl font-bold">Request a Service</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete the steps below to submit your service request.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div
            className={`rounded-lg border p-4 ${
              step === 1 ? "border-primary bg-primary/5" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 1</p>
            <p className="text-sm text-muted-foreground">Service</p>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              step === 2 ? "border-primary bg-primary/5" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 2</p>
            <p className="text-sm text-muted-foreground">Request Information</p>
          </div>

          <div
            className={`rounded-lg border p-4 ${
              step === 3 ? "border-primary bg-primary/5" : ""
            }`}
          >
            <p className="text-sm font-medium">Step 3</p>
            <p className="text-sm text-muted-foreground">Review</p>
          </div>
        </div>

        {/* Loading */}
        {isServicesLoading && (
          <div className="rounded-lg border p-6">
            <p className="text-sm text-muted-foreground">
              Loading service information...
            </p>
          </div>
        )}

        {/* Service not found */}
        {!isServicesLoading && !service && (
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Service not found</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              The selected service is no longer available.
            </p>

            <Link
              href="/dashboard/citizen-dashboard/services"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              Back to Services
            </Link>
          </div>
        )}

        {/* Wizard */}
        {!isServicesLoading && service && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border bg-background p-6 shadow-sm"
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Confirm Service</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Confirm the service you want to request.
                  </p>
                </div>

                <div className="rounded-lg border p-5">
                  <h3 className="text-lg font-semibold">{service.name}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description || "No description available."}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm text-muted-foreground">Base Fee</p>

                    <p className="mt-1 text-2xl font-bold">
                      ৳{service.baseFee}
                    </p>
                  </div>
                </div>

                <input type="hidden" {...register("serviceId")} />

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Request Information</h2>

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
                    type="text"
                    placeholder="Enter service location"
                    {...register("location")}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />

                  {errors.location && (
                    <p className="text-sm text-destructive">
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
                    rows={5}
                    placeholder="Describe what you need..."
                    {...register("description")}
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />

                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="text-sm font-medium">
                    Image (Optional)
                  </label>

                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full rounded-md border p-2 text-sm"
                  />

                  {selectedImage && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedImage.name}
                    </p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="rounded-md border px-5 py-2 text-sm"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground"
                  >
                    Review
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
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
                    <p className="text-sm text-muted-foreground">Location</p>

                    <p className="font-medium">{values.location}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>

                    <p className="font-medium">
                      {values.description || "No description provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Image</p>

                    <p className="font-medium">
                      {selectedImage ? selectedImage.name : "No image selected"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Service Fee</p>

                    <p className="text-xl font-bold">৳{service.baseFee}</p>
                  </div>
                </div>

                {createServiceRequestMutation.isError && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
                    <p className="text-sm text-destructive">
                      Failed to submit the service request. Please try again.
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={createServiceRequestMutation.isPending}
                    className="rounded-md border px-5 py-2 text-sm disabled:opacity-50"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={createServiceRequestMutation.isPending}
                    className="rounded-md bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-50"
                  >
                    {createServiceRequestMutation.isPending
                      ? "Submitting..."
                      : "Submit Request"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </RoleGuard>
  );
};

export default CreateServiceRequestPage;
