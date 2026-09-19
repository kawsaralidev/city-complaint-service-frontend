"use client";

import { ReactNode, useState } from "react";
import DashboardHeader from "./_components/Dashboard-header";
import DashboardSidebar from "./_components/Dashboard-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Dashboard Sidebar */}
        <DashboardSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Dashboard Header */}
          <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

          {/* Dashboard Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
