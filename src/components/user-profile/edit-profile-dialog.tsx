"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useUpdateMyProfile } from "@/hooks/user.hook";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  currentName: string;
  currentImage?: string | null;
}

const EditProfileDialog = ({
  open,
  onClose,
  currentName,
  currentImage,
}: EditProfileDialogProps) => {
  const [name, setName] = useState(currentName);
  const [image, setImage] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(
    currentImage || null,
  );

  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  useEffect(() => {
    if (!open) {
      return;
    }

    setName(currentName);
    setImage(undefined);
    setImagePreview(currentImage || null);
  }, [open, currentName, currentImage]);

  useEffect(() => {
    if (!imagePreview || !imagePreview.startsWith("blob:")) {
      return;
    }

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (!open) {
    return null;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file");

      event.target.value = "";
      return;
    }

    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Name is required");

      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      toast.error("Name must be between 2 and 100 characters");

      return;
    }

    updateProfile(
      {
        name: trimmedName,
        image,
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");

          onClose();
        },
        onError: (error) => {
          toast.error(error instanceof Error
                ? error.message
                : "Failed to update profile");
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close edit profile dialog"
        disabled={isPending}
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/50"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="relative z-10 w-full max-w-md rounded-xl border border-border bg-background shadow-xl"
      >
        <div className="border-b border-border px-5 py-4">
          <h2
            id="edit-profile-title"
            className="text-lg font-semibold text-foreground"
          >
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your name and profile image.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                    unoptimized={imagePreview.startsWith("blob:")}
                  />
                ) : (
                  <User className="h-8 w-8" />
                )}
              </div>

              <label
                htmlFor="profile-image"
                className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Change Image
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isPending}
                className="hidden"
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </label>

              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isPending}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || !name.trim()}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileDialog;
