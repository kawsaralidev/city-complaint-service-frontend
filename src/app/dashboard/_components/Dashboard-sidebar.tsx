"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  FolderTree,
  House,
  LayoutDashboard,
  MessageSquareWarning,
  Settings,
  Users,
  X,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/auth.hook";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const [mounted, setMounted] = useState(false);

  const { data: userResponse } = useCurrentUser();

  const user = userResponse?.data;
  const role = user?.role;

  // Wait until the component is mounted on the client
  useEffect(() => {
    setMounted(true);
  }, []);

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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[240px] shrink-0 flex-col border-r border-secondary bg-background transition-transform duration-200 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-[64px] items-center justify-between border-b border-secondary px-5">
          {/* Logo */}
          <Link href="/" onClick={onClose} className="flex items-center">
            <Image
              src="/citycarelogo.png"
              alt="CityCare"
              width={150}
              height={45}
              priority
              className="h-auto w-[130px] sm:w-[150px]"
            />
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
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <House className="h-[18px] w-[18px]" />
            <span>Home</span>
          </Link>
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex h-10 w-full items-center gap-3 rounded-lg bg-secondary/10 px-3 text-sm font-medium text-secondary"
          >
            <LayoutDashboard className="h-[18px] w-[18px]" />
            <span>Dashboard</span>
          </Link>

          {/* Admin Menu */}
          {mounted && role === "ADMIN" && (
            <>
              <Link
                href="/dashboard/admin-dashboard/users"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Users className="h-[18px] w-[18px]" />
                <span>Users</span>
              </Link>

              <Link
                href="/dashboard/admin-dashboard/categories"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <FolderTree className="h-[18px] w-[18px]" />
                <span>Categories</span>
              </Link>

              <Link
                href="/dashboard/admin-dashboard/complaints"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MessageSquareWarning className="h-[18px] w-[18px]" />
                <span>Complaints</span>
              </Link>

              <Link
                href="/dashboard/admin-dashboard/services"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BriefcaseBusiness className="h-[18px] w-[18px]" />
                <span>Services</span>
              </Link>
            </>
          )}

          {/* Officer Menu */}
          {mounted && role === "OFFICER" && (
            <>
              <Link
                href="/dashboard/officer-dashboard/complaints"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MessageSquareWarning className="h-[18px] w-[18px]" />
                <span>Complaints</span>
              </Link>

              <Link
                href="/dashboard/officer-dashboard/service-requests"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ClipboardList className="h-[18px] w-[18px]" />
                <span>Service Requests</span>
              </Link>

              <Link
                href="/dashboard/officer-dashboard/services"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BriefcaseBusiness className="h-[18px] w-[18px]" />
                <span>Services</span>
              </Link>
            </>
          )}

          {/* Citizen Menu */}
          {mounted && role === "CITIZEN" && (
            <>
              <Link
                href="/dashboard/citizen-dashboard/complaints"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MessageSquareWarning className="h-[18px] w-[18px]" />
                <span>My Complaints</span>
              </Link>

              <Link
                href="/dashboard/citizen-dashboard/services"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BriefcaseBusiness className="h-[18px] w-[18px]" />
                <span>Services</span>
              </Link>

              <Link
                href="/dashboard/citizen-dashboard/service-requests"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ClipboardList className="h-[18px] w-[18px]" />
                <span>My Requests</span>
              </Link>

              <Link
                href="/dashboard/citizen-dashboard/payments"
                onClick={onClose}
                className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <CreditCard className="h-[18px] w-[18px]" />
                <span>Payments</span>
              </Link>
            </>
          )}

          {/* Settings */}
          {mounted && (
            <Link
              href="/dashboard/settings"
              onClick={onClose}
              className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Settings className="h-[18px] w-[18px]" />
              <span>Settings</span>
            </Link>
          )}
        </nav>

        {/* User Area */}
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {/* User Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
              {mounted && user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {mounted ? user?.name || "User" : "User"}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {mounted ? user?.role || "User" : "User"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
