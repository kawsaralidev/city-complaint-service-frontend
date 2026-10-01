"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth.schema";
import { useResetPassword } from "@/hooks/auth.hook";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const resetPasswordMutation = useResetPassword();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      return;
    }

    await resetPasswordMutation.mutateAsync({
      token,
      data,
    });
  };

  if (!token) {
    return (
      <div className="space-y-5 text-center">
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            Invalid or missing password reset link.
          </p>
        </div>

        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-secondary hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (resetPasswordMutation.isSuccess) {
    return (
      <div className="space-y-5 text-center">
        <div className="rounded-lg border border-secondary/20 bg-secondary/10 p-4">
          <p className="text-sm font-medium text-foreground">
            Your password has been reset successfully.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-block text-sm font-semibold text-secondary hover:underline"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* New Password */}
      <div className="space-y-2">
        <label
          htmlFor="new-password"
          className="text-sm font-medium text-foreground"
        >
          New Password
        </label>

        <div className="relative">
          <input
            id="new-password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            {...register("newPassword")}
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword((prev) => !prev)}
            disabled={resetPasswordMutation.isPending}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.newPassword && (
          <p className="text-sm text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirm-password"
          className="text-sm font-medium text-foreground"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
            disabled={resetPasswordMutation.isPending}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            disabled={resetPasswordMutation.isPending}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* API Error */}
      {resetPasswordMutation.isError && (
        <p className="text-sm text-destructive">
          Unable to reset your password. The link may be expired or invalid.
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={resetPasswordMutation.isPending}
        className="w-full rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-shadow hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {resetPasswordMutation.isPending
          ? "Resetting Password..."
          : "Reset Password"}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-secondary hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default ResetPasswordForm;
