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
    <div className="h-screen overflow-hidden bg-background text-foreground">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Dashboard Main Area */}
      <div className="flex h-full min-w-0 flex-col md:ml-[240px]">
        {/* Dashboard Header */}
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable Dashboard Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
