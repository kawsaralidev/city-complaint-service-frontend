"use client";

import Image from "next/image";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";
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
    if (open) {
      setName(currentName);
      setImage(undefined);
      setImagePreview(currentImage || null);
    }
  }, [open, currentName, currentImage]);

  if (!open) {
    return null;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.add({
        title: "Name is required",
        type: "error",
      });

      return;
    }

    updateProfile(
      {
        name: trimmedName,
        image,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Profile updated successfully",
            type: "success",
          });

          onClose();
        },
        onError: (error) => {
          toast.add({
            title:
              error instanceof Error
                ? error.message
                : "Failed to update profile",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-background shadow-xl">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Update your name and profile image.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5">
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isPending}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter your name"
              />
            </div>
          </div>

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
