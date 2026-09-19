"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Settings,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[240px] shrink-0 flex-col border-r border-border bg-background transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[72px] items-center justify-between border-b border-border px-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 rounded-md transition-opacity hover:opacity-80"
          >
            {/* Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary-foreground">
              CS
            </div>

            {/* Brand Text */}
            <div>
              <h2 className="text-sm font-bold text-foreground">
                City Service
              </h2>

              <p className="text-[11px] text-muted-foreground">
                Complaint Platform
              </p>
            </div>
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-5">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex h-10 w-full items-center gap-3 rounded-lg bg-secondary/10 px-3 text-sm font-medium text-secondary"
          >
            <LayoutDashboard className="h-[18px] w-[18px]" />
            <span>Dashboard</span>
          </Link>

          {/* Complaints */}
          <Link
            href="/dashboard/complaints"
            onClick={onClose}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <MessageSquareWarning className="h-[18px] w-[18px]" />
            <span>Complaints</span>
          </Link>

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="h-[18px] w-[18px]" />
            <span>Settings</span>
          </Link>
        </nav>

        {/* User Area */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {/* User Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
              U
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                User
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                Citizen
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
