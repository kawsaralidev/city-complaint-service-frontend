import {
  ClipboardList,
  MessageSquareWarning,
  BriefcaseBusiness,
  CreditCard,
} from "lucide-react";

import RoleGuard from "../guard/role-guard";

const CitizenDashboardPage = () => {
  return (
    <RoleGuard requiredRole="CITIZEN">
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div>
          <p className="text-sm font-medium text-secondary">CITIZEN PANEL</p>

          <h1 className="mt-1 text-2xl font-bold text-foreground">
            Citizen Dashboard
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your complaints, service requests, and payments.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* My Complaints */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">My Complaints</p>

              <MessageSquareWarning className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Complaints submitted by you
            </p>
          </div>

          {/* Service Requests */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Service Requests</p>

              <ClipboardList className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Your service requests
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
              Available city services
            </p>
          </div>

          {/* Payments */}
          <div className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Payments</p>

              <CreditCard className="h-5 w-5 text-secondary" />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-foreground">0</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Your payment records
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default CitizenDashboardPage;
