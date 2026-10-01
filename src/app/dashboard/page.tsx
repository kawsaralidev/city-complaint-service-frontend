"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCurrentUser } from "@/hooks/auth.hook";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="min-h-[calc(100vh-64px)] bg-muted/20">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Dashboard Header Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Dashboard Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background p-5"
            >
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-64" />

                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between"
                    >
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
