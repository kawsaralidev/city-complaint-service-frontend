"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";

const DashboardPage = () => {
  const router = useRouter();

  const { data: userResponse, isLoading } = useCurrentUser();

  const user = userResponse?.data;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role === "ADMIN") {
      router.replace("/dashboard/admin-dashboard");
      return;
    }

    if (user.role === "OFFICER") {
      router.replace("/dashboard/officer-dashboard");
      return;
    }

    if (user.role === "CITIZEN") {
      router.replace("/dashboard/citizen-dashboard");
      return;
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading dashboard...</p>
    </div>
  );
};

export default DashboardPage;
