"use client";

import Image from "next/image";
import { Mail, User } from "lucide-react";
import { useState } from "react";

import { useCurrentUser } from "@/hooks/auth.hook";
import EditProfileDialog from "@/components/user-profile/edit-profile-dialog";

const ProfilePage = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: userResponse, isLoading } = useCurrentUser();
  const user = userResponse?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Profile information is not available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">My Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View and manage your profile information.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="flex items-center gap-4 border-b border-border p-6">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.name || "User"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <User className="h-7 w-7" />
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-foreground">
                {user.name}
              </h2>

              <p className="truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-6 p-6">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 h-5 w-5 text-secondary" />

              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-secondary" />

              <div>
                <p className="text-xs text-muted-foreground">Email</p>

                <p className="mt-1 text-sm font-medium text-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Role</p>

              <p className="mt-1 text-sm font-medium text-foreground">
                {user.role}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setEditDialogOpen(true)}
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:opacity-90"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProfileDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        currentName={user.name}
        currentImage={user.imageUrl}
      />
    </>
  );
};

export default ProfilePage;
