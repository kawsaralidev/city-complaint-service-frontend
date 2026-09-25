"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";

type UserRole = "ADMIN" | "OFFICER" | "CITIZEN";

interface RoleGuardProps {
  requiredRole: UserRole;
  children: ReactNode;
}

const RoleGuard = ({ requiredRole, children }: RoleGuardProps) => {
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

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking access...</p>
      </div>
    );
  }

  if (user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
