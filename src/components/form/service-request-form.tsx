"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileImage,
  FileText,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Pencil,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { useActiveServices } from "@/hooks/service.hook";
import { useCreateServiceRequest } from "@/hooks/service-request.hook";

import {
  serviceRequestSchema,
  type ServiceRequestFormValues,
} from "@/lib/validations/service-request.schema";
import Image from "next/image";

interface ServiceRequestFormProps {
  serviceId: string;
}

const steps = [
  {
    number: 1,
    title: "Service",
    description: "Choose service",
  },
  {
    number: 2,
    title: "Details",
    description: "Request information",
  },
  {
    number: 3,
    title: "Review",
    description: "Confirm request",
  },
];

const ServiceRequestForm = ({ serviceId }: ServiceRequestFormProps) => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    watch,
    formState: { errors },
  } = useForm<ServiceRequestFormValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      serviceId,
      location: "",
      description: "",
    },
  });

  const values = watch();

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(undefined);
    setImagePreview(null);
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

  /*
   * Loading state
   */
  if (isServicesLoading) {
    return (
      <div className="min-h-[70vh] bg-muted/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="animate-pulse space-y-5">
            <div className="h-24 rounded-3xl bg-muted" />
            <div className="h-[520px] rounded-3xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  /*
   * Service not found
   */
  if (!service) {
    return (
      <div className="min-h-[70vh] bg-muted/20 px-4 py-12 sm:px-6">
        <div className="mx-auto flex min-h-[50vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-3xl bg-background p-8 text-center shadow-xl shadow-black/5 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-2xl font-bold tracking-tight">
              Service not found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              The service you are looking for is no longer available. Please
              choose another service.
            </p>

            <button
              type="button"
              onClick={() => router.push("/services")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            >
              Browse Services
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        <div className="mb-7">
          <button
            type="button"
            onClick={handleBack}
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm transition-all group-hover:bg-primary/10 group-hover:text-primary">
              <ArrowLeft className="h-4 w-4" />
            </span>
            Back
          </button>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Service Request
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Request a city service
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Complete the steps below to submit your service request.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm sm:flex">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Secure request
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MODERN STEPPER */}
        {/* ===================================================== */}

        <div className="mb-5 rounded-3xl bg-background p-4 shadow-lg shadow-black/[0.04] sm:p-5">
          <div className="flex items-center">
            {steps.map((item, index) => {
              const isActive = step === item.number;
              const isCompleted = step > item.number;

              return (
                <div
                  key={item.number}
                  className="flex min-w-0 flex-1 items-center"
                >
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <div
                      className={[
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 sm:h-10 sm:w-10",
                        isCompleted
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : isActive
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "bg-muted text-muted-foreground",
                      ].join(" ")}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        item.number
                      )}
                    </div>

                    <div className="hidden min-w-0 sm:block">
                      <p
                        className={[
                          "text-xs font-bold sm:text-sm",
                          isActive || isCompleted
                            ? "text-foreground"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {item.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-muted sm:mx-6">
                      <div
                        className={[
                          "h-full rounded-full bg-primary transition-all duration-500",
                          step > item.number ? "w-full" : "w-0",
                        ].join(" ")}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 sm:hidden">
            <div>
              <p className="text-xs font-bold">
                Step {step}: {steps[step - 1]?.title}
              </p>

              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {steps[step - 1]?.description}
              </p>
            </div>

            <span className="text-xs font-semibold text-primary">{step}/3</span>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MAIN FORM */}
        {/* ===================================================== */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden rounded-3xl bg-background shadow-xl shadow-black/[0.05]">
            {/* ================================================= */}
            {/* STEP 1 */}
            {/* ================================================= */}

            {step === 1 && (
              <>
                <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Step 01
                      </p>

                      <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                        Confirm your service
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Make sure this is the service you want to request.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-6 sm:px-8 sm:pb-8">
                  {/* Service showcase */}
                  <div className="relative overflow-hidden rounded-3xl bg-muted/30">
                    {/* Image */}
                    {service.imageUrl ? (
                      <div className="relative h-56 sm:h-72">
                        <Image
                          src={service.imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute left-5 top-5">
                          <span className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            CityCare Service
                          </span>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 sm:left-7 sm:right-7">
                          <div className="max-w-2xl">
                            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                              {service.name}
                            </h3>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                              {service.description ||
                                "No description available."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-background sm:h-72">
                        <div className="text-center">
                          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background text-primary shadow-lg">
                            <ShieldCheck className="h-8 w-8" />
                          </div>

                          <p className="mt-4 text-sm font-semibold">
                            {service.name}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Service details */}
                    <div className="bg-background p-5 sm:p-7">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Selected service
                          </p>

                          <p className="mt-1 text-lg font-bold">
                            {service.name}
                          </p>
                        </div>

                        {/* Fee */}
                        <div className="flex items-center gap-4 rounded-2xl bg-primary/[0.07] px-5 py-3.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
                            <span className="text-sm font-bold">৳</span>
                          </div>

                          <div>
                            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                              Base fee
                            </p>

                            <p className="text-xl font-bold tracking-tight">
                              ৳{service.baseFee}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Small info row */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-muted/40 px-4 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Service
                          </p>

                          <p className="mt-1 truncate text-sm font-semibold">
                            {service.name}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/40 px-4 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Processing
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            CityCare Team
                          </p>
                        </div>

                        <div className="rounded-2xl bg-muted/40 px-4 py-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Payment
                          </p>

                          <p className="mt-1 text-sm font-semibold">
                            Secure Checkout
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <input type="hidden" {...register("serviceId")} />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end bg-muted/20 px-5 py-4 sm:px-8">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </>
            )}

            {/* ================================================= */}
            {/* STEP 2 */}
            {/* ================================================= */}

            {step === 2 && (
              <>
                <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Step 02
                      </p>

                      <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                        Tell us about your request
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Provide the information our team needs to handle your
                        request.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-7 sm:px-8 sm:pb-9">
                  <div className="mx-auto max-w-3xl space-y-7">
                    {/* Location */}
                    <div>
                      <label
                        htmlFor="location"
                        className="mb-2.5 flex items-center gap-2 text-sm font-semibold"
                      >
                        <MapPin className="h-4 w-4 text-primary" />
                        Service location
                      </label>

                      <input
                        id="location"
                        type="text"
                        placeholder="Enter the exact location"
                        {...register("location")}
                        className={[
                          "h-12 w-full rounded-xl bg-muted/30 border border-slate-300 px-4 text-sm outline-none transition-all",
                          "placeholder:text-muted-foreground/60",
                          "focus:bg-background focus:ring-4 focus:ring-primary/10",
                          errors.location
                            ? "bg-destructive/5 ring-2 ring-destructive/20"
                            : "",
                        ].join(" ")}
                      />

                      {errors.location ? (
                        <p className="mt-2 text-xs font-medium text-destructive">
                          {errors.location.message}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Include street, area or any useful location detail.
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="mb-2.5 flex items-center  gap-2 text-sm font-semibold"
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        Request description
                      </label>

                      <textarea
                        id="description"
                        rows={6}
                        placeholder="Describe the problem or explain what you need..."
                        {...register("description")}
                        className={[
                          "w-full border border-slate-300 resize-none rounded-xl bg-muted/30 px-4 py-3.5 text-sm leading-6 outline-none transition-all",
                          "placeholder:text-muted-foreground/60",
                          "focus:bg-background focus:ring-4 focus:ring-primary/10",
                          errors.description
                            ? "bg-destructive/5 ring-2 ring-destructive/20"
                            : "",
                        ].join(" ")}
                      />

                      {errors.description ? (
                        <p className="mt-2 text-xs font-medium text-destructive">
                          {errors.description.message}
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Give enough information so the city team can
                          understand the issue.
                        </p>
                      )}
                    </div>

                    {/* Image */}
                    <div>
                      <div className="mb-2.5 flex items-center justify-between">
                        <label
                          htmlFor="image"
                          className="flex items-center gap-2 text-sm font-semibold"
                        >
                          <ImageIcon className="h-4 w-4 text-primary" />
                          Supporting image
                        </label>

                        <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                          Optional
                        </span>
                      </div>

                      {!imagePreview ? (
                        <label
                          htmlFor="image"
                          className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-muted/30 px-6 py-10 text-center transition-all duration-200 hover:bg-primary/[0.04]"
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm transition-all group-hover:scale-105 group-hover:text-primary">
                            <Upload className="h-6 w-6" />
                          </div>

                          <p className="mt-4 text-sm font-semibold">
                            Upload a supporting image
                          </p>

                          <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                            A photo can help the CityCare team understand your
                            request faster.
                          </p>

                          <span className="mt-4 rounded-xl bg-background px-4 py-2 text-xs font-semibold shadow-sm transition group-hover:text-primary">
                            Choose image
                          </span>

                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="overflow-hidden rounded-2xl bg-muted/30">
                          <div className="relative h-60 sm:h-72">
                            <div className="relative h-full w-full">
                              <Image
                                src={imagePreview}
                                alt="Selected request image"
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                              <div className="flex items-end justify-between gap-4">
                                <div className="min-w-0 text-white">
                                  <div className="flex items-center gap-2">
                                    <FileImage className="h-4 w-4 shrink-0" />

                                    <p className="truncate text-sm font-semibold">
                                      {selectedImage?.name}
                                    </p>
                                  </div>

                                  <p className="mt-1 text-xs text-white/70">
                                    {selectedImage
                                      ? `${(
                                          selectedImage.size /
                                          1024 /
                                          1024
                                        ).toFixed(2)} MB`
                                      : ""}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={removeImage}
                                  className="shrink-0 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-foreground backdrop-blur transition hover:bg-white"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-muted"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
                  >
                    Review request
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </>
            )}

            {/* ================================================= */}
            {/* STEP 3 */}
            {/* ================================================= */}

            {step === 3 && (
              <>
                <div className="px-5 pb-5 pt-6 sm:px-8 sm:pb-6 sm:pt-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Step 03
                      </p>

                      <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                        Review your request
                      </h2>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Check everything once before submitting.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-7 sm:px-8 sm:pb-9">
                  <div className="mx-auto max-w-3xl space-y-4">
                    {/* Main summary */}
                    <div className="rounded-2xl bg-muted/30 p-5 sm:p-6">
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                            <ShieldCheck className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Selected service
                            </p>

                            <h3 className="mt-1 truncate text-lg font-bold">
                              {service.name}
                            </h3>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-background px-5 py-3 text-left shadow-sm sm:text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            Service fee
                          </p>

                          <p className="mt-0.5 text-xl font-bold">
                            ৳{service.baseFee}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-background p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary" />
                            Location
                          </div>

                          <p className="mt-2 text-sm font-semibold leading-6">
                            {values.location || "No location provided"}
                          </p>
                        </div>

                        <div className="rounded-xl bg-background p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            Attachment
                          </div>

                          <p className="mt-2 truncate text-sm font-semibold">
                            {selectedImage
                              ? selectedImage.name
                              : "No image attached"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="rounded-2xl bg-background p-5 shadow-sm sm:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />

                          <p className="text-sm font-semibold">
                            Request description
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-primary transition hover:bg-primary/10"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                      </div>

                      <div className="mt-4 rounded-xl bg-muted/30 p-4">
                        <p className="text-sm leading-6 text-muted-foreground">
                          {values.description || "No description provided."}
                        </p>
                      </div>
                    </div>

                    {/* Confirmation */}
                    <div className="flex gap-3 rounded-2xl bg-primary/[0.06] p-4 sm:p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ShieldCheck className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">Ready to submit</p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Your request will be sent to the CityCare team for
                          review. You can track its progress from your
                          dashboard.
                        </p>
                      </div>
                    </div>

                    {/* Error */}
                    {createServiceRequestMutation.isError && (
                      <div className="rounded-2xl bg-destructive/5 p-4">
                        <p className="text-sm font-medium text-destructive">
                          Failed to submit the service request. Please try
                          again.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col-reverse gap-3 bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={createServiceRequestMutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold shadow-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={createServiceRequestMutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {createServiceRequestMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Security note */}
          <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Your information is securely handled by CityCare.
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequestForm;
