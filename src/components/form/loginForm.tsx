"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { loginSchema, type LoginFormData } from "@/lib/validations/auth.schema";

import { useDemoLogin, useLogin } from "@/hooks/auth.hook";

import GoogleAuthButton from "@/app/(public)/(authentication)/google-auth/google-auth-button";

import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();
  const demoLoginMutation = useDemoLogin();

  const [showPassword, setShowPassword] = useState(false);

  const getRedirectUrl = () => {
    const redirect = searchParams.get("redirect");

    if (redirect && redirect.startsWith("/") && !redirect.startsWith("//")) {
      return redirect;
    }

    return "/";
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      toast.add({
        title: "Login successful.",
        type: "success",
      });

      const user = response.data.user;

      if (user.role === "CITIZEN") {
        router.push(getRedirectUrl());
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);

      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "Login failed. Please check your email and password.",
        type: "error",
      });
    }
  };

  const handleDemoLogin = async (role: "CITIZEN" | "OFFICER" | "ADMIN") => {
    try {
      const response = await demoLoginMutation.mutateAsync(role);

      toast.add({
        title: `${role} demo login successful.`,
        type: "success",
      });

      const user = response.data.user;

      if (user.role === "CITIZEN") {
        router.push(getRedirectUrl());
        return;
      }

      router.push("/");
    } catch (error) {
      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "Demo login failed. Please try again.",
        type: "error",
      });
    }
  };

  const redirectParam = searchParams.get("redirect");

  const registerUrl = redirectParam
    ? `/register?redirect=${encodeURIComponent(redirectParam)}`
    : "/register";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-background p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your CityCare account
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...form.register("email")}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-secondary"
              />

              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
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
                  {...form.register("password")}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition focus:border-secondary"
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

              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-secondary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-shadow hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <p className="my-5 text-center text-sm text-muted-foreground">
            Don't have an account?
            <a
              href={registerUrl}
              className="ml-1 font-semibold text-secondary hover:underline"
            >
              Create an account
            </a>
          </p>

          <Separator />

          <GoogleAuthButton />

          {/* Demo Login */}
          <div className="mt-6 space-y-3">
            <p className="text-center text-sm font-medium text-muted-foreground">
              Demo Login
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("CITIZEN")}
                disabled={demoLoginMutation.isPending}
                className="rounded-lg border border-secondary bg-background px-3 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Citizen
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("OFFICER")}
                disabled={demoLoginMutation.isPending}
                className="rounded-lg border border-secondary bg-background px-3 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Officer
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin("ADMIN")}
                disabled={demoLoginMutation.isPending}
                className="rounded-lg border border-secondary bg-background px-3 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-secondary-foreground hover:shadow-lg hover:shadow-secondary/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          CityCare · City Complaint & Service Platform
        </p>
      </div>
    </main>
  );
}
