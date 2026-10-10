"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Separator } from "@/components/ui/separator";

import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/auth.schema";

import { useRegister } from "@/hooks/auth.hook";

import GoogleAuthButton from "@/app/(public)/(authentication)/google-auth/google-auth-button";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("OTP sent to your email.");

      // Save email for OTP verification
      sessionStorage.setItem("registrationEmail", response.data.email);

      const redirect = searchParams.get("redirect");

      if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
        sessionStorage.setItem("registrationRedirect", redirect);
      } else {
        sessionStorage.removeItem("registrationRedirect");
      }

      router.push("/verify-register-email");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Full Name
        </label>

        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-secondary"
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base outline-none transition focus:border-secondary"
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-base outline-none transition focus:border-secondary"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground"
        >
          Confirm Password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-base outline-none transition focus:border-secondary"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
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

      {/* Submit */}
      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-shadow hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?
        <Link
          href={
            searchParams.get("redirect")
              ? `/login?redirect=${encodeURIComponent(
                  searchParams.get("redirect")!,
                )}`
              : "/login"
          }
          className="font-semibold text-secondary hover:underline"
        >
          Login
        </Link>
      </p>

      <Separator />

      <GoogleAuthButton />
    </form>
  );
}
