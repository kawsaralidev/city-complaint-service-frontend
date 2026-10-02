"use client";

import { useState } from "react";

import { FileText, ImagePlus, MapPin, Send, Tag } from "lucide-react";

import { useCategories } from "@/hooks/category.hook";
import { useCreateComplaint } from "@/hooks/complaint.hook";

interface ComplaintFormProps {
  onCancel?: () => void;
}

const ComplaintForm = ({ onCancel }: ComplaintFormProps) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const createComplaintMutation = useCreateComplaint();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const complaintCategories =
    categories?.filter(
      (category) => category.type === "COMPLAINT" && category.isActive,
    ) ?? [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    if (!categoryId) {
      return;
    }

    if (!location.trim()) {
      return;
    }

    if (!description.trim()) {
      return;
    }

    createComplaintMutation.mutate(
      {
        title: title.trim(),
        categoryId,
        location: location.trim(),
        description: description.trim(),
        image,
      },
      {
        onSuccess: () => {
          setTitle("");
          setCategoryId("");
          setLocation("");
          setDescription("");
          setImage(null);

          onCancel?.();
        },
      },
    );
  };

  const isSubmitting = createComplaintMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
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
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Damaged road near the main market"
          className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>

      {/* Category */}
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
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={categoriesLoading || isSubmitting}
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
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter the location of the problem"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
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
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe the problem clearly and provide any useful details..."
          rows={5}
          disabled={isSubmitting}
          className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-3 text-sm leading-6 text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <p className="text-right text-xs text-muted-foreground">
          {description.length} characters
        </p>
      </div>

      {/* Image */}
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
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
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
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
        >
          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />

          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </div>
    </form>
  );
};

export default ComplaintForm;
