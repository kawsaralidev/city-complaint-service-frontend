"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ImagePlus, MapPin, Send, Tag } from "lucide-react";

import { useCategories } from "@/hooks/category.hook";
import { useCreateComplaint } from "@/hooks/complaint.hook";
import {
  complaintSchema,
  type ComplaintFormValues,
} from "@/lib/validations/complaint.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ComplaintFormProps {
  onCancel?: () => void;
}

const ComplaintForm = ({ onCancel }: ComplaintFormProps) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const router = useRouter();
  const createComplaintMutation = useCreateComplaint();

  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      categoryId: "",
      location: "",
      description: "",
    },
  });

  const complaintCategories =
    categories?.filter(
      (category) => category.type === "COMPLAINT" && category.isActive,
    ) ?? [];

  const description = watch("description");

  const onSubmit = (values: ComplaintFormValues) => {
    createComplaintMutation.mutate(
      {
        title: values.title,
        categoryId: values.categoryId,
        location: values.location,
        description: values.description,
        image,
      },
      {
        onSuccess: () => {
          reset();
          setImage(null);

          toast.success("Complaint created successfully!");

          onCancel?.();

          router.push("/dashboard/citizen-dashboard/complaints");
        },
      },
    );
  };

  const isSubmitting = createComplaintMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Complaint Title */}
      <div className="space-y-2">
        <label
          htmlFor="complaint-title"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <FileText className="h-4 w-4 text-primary" />
          Complaint Title
        </label>

        <input
          id="complaint-title"
          type="text"
          placeholder="e.g. Damaged road near the main market"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "complaint-title-error" : undefined}
          {...register("title")}
          className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
        />

        {errors.title && (
          <p
            id="complaint-title-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Complaint Category */}
      <div className="space-y-2">
        <label
          htmlFor="complaint-category"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <Tag className="h-4 w-4 text-primary" />
          Category
        </label>

        <select
          id="complaint-category"
          disabled={categoriesLoading || isSubmitting}
          aria-invalid={Boolean(errors.categoryId)}
          aria-describedby={
            errors.categoryId ? "complaint-category-error" : undefined
          }
          {...register("categoryId")}
          className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">
            {categoriesLoading
              ? "Loading categories..."
              : "Select complaint category"}
          </option>

          {complaintCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p
            id="complaint-category-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.categoryId.message}
          </p>
        )}

        {!categoriesLoading && complaintCategories.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No active complaint categories are available right now.
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label
          htmlFor="complaint-location"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <MapPin className="h-4 w-4 text-primary" />
          Location
        </label>

        <input
          id="complaint-location"
          type="text"
          placeholder="Enter the location of the problem"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.location)}
          aria-describedby={
            errors.location ? "complaint-location-error" : undefined
          }
          {...register("location")}
          className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
        />

        {errors.location && (
          <p
            id="complaint-location-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.location.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label
          htmlFor="complaint-description"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <FileText className="h-4 w-4 text-primary" />
          Description
        </label>

        <textarea
          id="complaint-description"
          placeholder="Describe the problem clearly and provide any useful details..."
          rows={5}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "complaint-description-error" : undefined
          }
          {...register("description")}
          className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-3 text-sm leading-6 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:opacity-60"
        />

        {errors.description && (
          <p
            id="complaint-description-error"
            role="alert"
            className="text-xs text-destructive"
          >
            {errors.description.message}
          </p>
        )}

        <p className="text-right text-xs text-muted-foreground">
          {description.length} characters
        </p>
      </div>

      {/* Optional Image */}
      <div className="space-y-2">
        <label
          htmlFor="complaint-image"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <ImagePlus className="h-4 w-4 text-secondary" />
          Complaint Image
          <span className="font-normal text-muted-foreground">(Optional)</span>
        </label>

        <label
          htmlFor="complaint-image"
          className="group flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-5 py-6 text-center transition-all duration-200 hover:border-primary/30 hover:bg-primary/[0.03]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-all duration-200 group-hover:scale-105 group-hover:bg-secondary group-hover:text-secondary-foreground">
            <ImagePlus className="h-5 w-5" />
          </div>

          <p className="mt-3 text-sm font-semibold text-foreground">
            {image ? image.name : "Upload an image"}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {image
              ? "Click to choose a different image"
              : "Add a photo that helps explain the problem"}
          </p>

          <input
            id="complaint-image"
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isSubmitting}
            onChange={(event) => {
              setImage(event.target.files?.[0] ?? null);
            }}
          />
        </label>
      </div>

      {/* API Error */}
      {createComplaintMutation.error && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {createComplaintMutation.error.message ||
            "Failed to create complaint. Please try again."}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting || categoriesLoading}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
