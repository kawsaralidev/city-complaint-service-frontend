"use client";

import { Bell, Menu } from "lucide-react";

import UserMenu from "@/components/shared/user-menu";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between shadow-[0_2px_5px_rgba(128,128,128,0.18)] bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open dashboard menu"
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-semibold text-foreground sm:text-lg">
            Dashboard
          </h1>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Welcome back to your dashboard
          </p>
        </div>
      </div>

      <div>
        <UserMenu />
      </div>
    </header>
  );
};

export default DashboardHeader;
