"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";
import { ApiError } from "@/lib/api-error";

type UserRole = "ADMIN" | "OFFICER" | "CITIZEN";

interface RoleGuardProps {
  requiredRole: UserRole;
  children: ReactNode;
  loadingFallback?: ReactNode;
}

const RoleGuard = ({
  requiredRole,
  children,
  loadingFallback,
}: RoleGuardProps) => {
  const router = useRouter();

  const { data: userResponse, isLoading, isError, error } = useCurrentUser();

  const user = userResponse?.data;

  const isUnauthorized = error instanceof ApiError && error.status === 401;

  useEffect(() => {
    if (isLoading || isError) {
      if (isUnauthorized) {
        router.replace("/login");
      }

      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== requiredRole) {
      router.replace("/dashboard");
    }
  }, [isLoading, isError, isUnauthorized, user, requiredRole, router]);

  if (isLoading) {
    return (
      loadingFallback ?? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p>Loading...</p>
        </div>
      )
    );
  }

  if (isError) {
    if (isUnauthorized) {
      return null;
    }

    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 p-6 text-center">
        <h2 className="text-lg font-semibold">Unable to verify your session</h2>
        <p className="text-sm text-muted-foreground">
          A server or network error occurred. Please try again.
        </p>
      </div>
    );
  }

  if (!user || user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
