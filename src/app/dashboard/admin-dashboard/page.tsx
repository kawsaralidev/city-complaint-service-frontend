"use client";

import {
  ClipboardList,
  FolderTree,
  MessageSquareWarning,
  Users,
} from "lucide-react";

import RoleGuard from "@/app/dashboard/guard/role-guard";
import { useAdminDashboardOverview } from "@/hooks/dashboard.hook";

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useAdminDashboardOverview();

  if (isLoading) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </RoleGuard>
    );
  }

  if (isError || !data) {
    return (
      <RoleGuard requiredRole="ADMIN">
        <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
          <p className="text-sm text-destructive">
            Failed to load dashboard data.
          </p>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard requiredRole="ADMIN">
      <div className="space-y-6 p-4 sm:p-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Admin Dashboard
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Overview of users, complaints, services and requests.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Users */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {data.users.total}
                </p>
              </div>

              <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">0</p>
              </div>

              <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                <FolderTree className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Complaints */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complaints</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {data.complaints.total}
                </p>
              </div>

              <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                <MessageSquareWarning className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Service Requests */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Service Requests
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {data.serviceRequests.total}
                </p>
              </div>

              <div className="rounded-lg bg-secondary/10 p-3 text-secondary">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminDashboardPage;
