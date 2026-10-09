"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, KeyRound } from "lucide-react";

import { useChangePassword } from "@/hooks/user.hook";
import { toast } from "@/components/ui/toast";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/lib/validations/change-password.schema";

const ChangePasswordPage = () => {
  const changePasswordMutation = useChangePassword();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await changePasswordMutation.mutateAsync(data);

      toast.add({
        title: "Password changed successfully.",
        type: "success",
      });

      reset();
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "Failed to change password. Please try again.",
        type: "error",
      });
    }
  };

  const isPending = changePasswordMutation.isPending;

  return (
    <div className="w-full space-y-6 p-7">
      {/* Page Header */}
      <div>
        <Link
          href="/dashboard/settings"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Settings
        </Link>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/5 px-3 py-1.5 text-xs font-medium text-secondary">
          <KeyRound className="h-3.5 w-3.5" />
          Account Security
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Change Password
        </h1>

        <p className="mt-1.5 text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      {/* Change Password Form */}
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium text-foreground"
            >
              Current Password
            </label>

            <div className="relative">
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                autoComplete="current-password"
                disabled={isPending}
                aria-invalid={Boolean(errors.currentPassword)}
                aria-describedby={
                  errors.currentPassword ? "current-password-error" : undefined
                }
                {...register("currentPassword")}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  showCurrentPassword
                    ? "Hide current password"
                    : "Show current password"
                }
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.currentPassword && (
              <p
                id="current-password-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-foreground"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                autoComplete="new-password"
                disabled={isPending}
                aria-invalid={Boolean(errors.newPassword)}
                aria-describedby={
                  errors.newPassword ? "new-password-error" : undefined
                }
                {...register("newPassword")}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  showNewPassword ? "Hide new password" : "Show new password"
                }
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.newPassword && (
              <p
                id="new-password-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.newPassword.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Use at least 8 characters, including uppercase, lowercase, a
              number, and a special character.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm New Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                autoComplete="new-password"
                disabled={isPending}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                {...register("confirmPassword")}
                className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={isPending}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p
                id="confirm-password-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {changePasswordMutation.isError && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
            >
              {changePasswordMutation.error instanceof Error
                ? changePasswordMutation.error.message
                : "Failed to change password. Please try again."}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary px-5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
