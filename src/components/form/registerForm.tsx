"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/auth.schema";
import { useRegister } from "@/hooks/auth.hook";
import GoogleAuthButton from "@/app/(public)/(authentication)/google-auth/google-auth-button";

export function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();

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

      // Save email for OTP verification
      sessionStorage.setItem("registrationEmail", response.data.email);

      router.push("/verify-register-email");
    } catch (error) {
      console.error("Registration failed:", error);
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
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
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
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
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

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
        />

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

        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
        />

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
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-secondary hover:underline"
        >
          Login
        </Link>
      </p>
      <Separator></Separator>

      <GoogleAuthButton />
    </form>
  );
}
