"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth.schema";

import { useForgotPassword } from "@/hooks/auth.hook";

import { toast } from "@/components/ui/toast";

const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await forgotPasswordMutation.mutateAsync(data.email);

      toast.add({
        title: "Password reset link sent to your email.",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "Unable to send the password reset link. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="forgot-password-email"
          className="text-sm font-medium text-foreground"
        >
          Email
        </label>

        <input
          id="forgot-password-email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={forgotPasswordMutation.isPending}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60"
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={forgotPasswordMutation.isPending}
        className="w-full rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-shadow hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
      </button>

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

export default ForgotPasswordForm;
