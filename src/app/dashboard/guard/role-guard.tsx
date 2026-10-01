"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";

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

  const { data: userResponse, isLoading } = useCurrentUser();

  const user = userResponse?.data;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    // Not logged in
    if (!user) {
      router.replace("/login");
      return;
    }

    // Logged in, but wrong role
    if (user.role !== requiredRole) {
      router.replace("/dashboard");
    }
  }, [isLoading, user, requiredRole, router]);

  if (isLoading) {
    return loadingFallback;
  }

  if (user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
