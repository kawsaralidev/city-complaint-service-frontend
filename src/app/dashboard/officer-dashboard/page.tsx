import {
  ClipboardList,
  MessageSquareWarning,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

import RoleGuard from "../guard/role-guard";

const OfficerDashboardPage = () => {
  return (
    <RoleGuard requiredRole="OFFICER">
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-secondary">OFFICER PANEL</p>

          <h1 className="mt-1 text-2xl font-bold text-foreground">
            Officer Dashboard
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage complaints and service requests assigned to you.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Assigned Complaints */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Assigned Complaints
              </p>

              <MessageSquareWarning className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Complaints assigned to you
            </p>
          </div>

          {/* Pending Requests */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Pending Requests</p>

              <ClipboardList className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Requests waiting for action
            </p>
          </div>

          {/* Services */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Services</p>

              <BriefcaseBusiness className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Available services
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Completed</p>

              <CheckCircle2 className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Completed tasks
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default OfficerDashboardPage;
