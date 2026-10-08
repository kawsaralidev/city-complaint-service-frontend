"use client";

import Link from "next/link";

import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  CreditCard,
  FolderTree,
  House,
  LayoutDashboard,
  MessageSquareWarning,
  Settings,
  Users,
} from "lucide-react";

import { usePathname } from "next/navigation";

interface DashboardSidebarMenuProps {
  role?: "ADMIN" | "OFFICER" | "CITIZEN";
  mounted: boolean;
  onClose: () => void;
}

const DashboardSidebarMenu = ({
  role,
  mounted,
  onClose,
}: DashboardSidebarMenuProps) => {
  const pathname = usePathname();

  // Check active navigation item
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
      {/* Home */}
      <Link
        href="/"
        onClick={onClose}
        className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
          isActive("/")
            ? "bg-secondary-foreground/10 font-medium text-secondary-foreground"
            : "text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
        }`}
      >
        <House className="h-[18px] w-[18px]" />
        <span>Home</span>
      </Link>

      {/* Dashboard */}
      <Link
        href="/dashboard/admin-dashboard"
        onClick={onClose}
        className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
          isActive("/dashboard/admin-dashboard")
            ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
            : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
        }`}
      >
        <LayoutDashboard className="h-[18px] w-[18px]" />
        <span>Dashboard</span>
      </Link>

      {/* Admin Menu */}
      {mounted && role === "ADMIN" && (
        <>
          {/* Users */}
          <Link
            href="/dashboard/admin-dashboard/users"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/users")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <Users className="h-[18px] w-[18px]" />
            <span>Users</span>
          </Link>

          {/* Categories */}
          <Link
            href="/dashboard/admin-dashboard/categories"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/categories")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <FolderTree className="h-[18px] w-[18px]" />
            <span>Categories</span>
          </Link>

          {/* Complaints */}
          <Link
            href="/dashboard/admin-dashboard/complaints"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/complaints")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <MessageSquareWarning className="h-[18px] w-[18px]" />
            <span>Complaints</span>
          </Link>

          {/* Services */}
          <Link
            href="/dashboard/admin-dashboard/services"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/services")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <BriefcaseBusiness className="h-[18px] w-[18px]" />
            <span>Services</span>
          </Link>

          {/* Service Requests */}
          <Link
            href="/dashboard/admin-dashboard/service-requests"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/service-requests")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <ClipboardList className="h-[18px] w-[18px]" />
            <span>Service Requests</span>
          </Link>

          {/* Payments */}
          <Link
            href="/dashboard/admin-dashboard/payments"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/payments")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <CreditCard className="h-[18px] w-[18px]" />
            <span>Payments</span>
          </Link>

          {/* Reports */}

          <Link
            href="/dashboard/admin-dashboard/reports"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/reports")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <BarChart3 className="h-[18px] w-[18px]" />
            <span>Reports</span>
          </Link>

          {/* Audit logs */}
          <Link
            href="/dashboard/admin-dashboard/audit-logs"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/admin-dashboard/audit-logs")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <ClipboardList className="h-[18px] w-[18px]" />
            <span>Audit logs</span>
          </Link>
        </>
      )}

      {/* Officer Menu */}
      {mounted && role === "OFFICER" && (
        <>
          {/* Complaints */}
          <Link
            href="/dashboard/officer-dashboard/complaints"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/officer-dashboard/complaints")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <MessageSquareWarning className="h-[18px] w-[18px]" />
            <span>Complaints</span>
          </Link>

          {/* Service Requests */}
          <Link
            href="/dashboard/officer-dashboard/service-requests"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/officer-dashboard/service-requests")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <ClipboardList className="h-[18px] w-[18px]" />
            <span>Service Requests</span>
          </Link>
        </>
      )}

      {/* Citizen Menu */}
      {mounted && role === "CITIZEN" && (
        <>
          {/* My Complaints */}
          <Link
            href="/dashboard/citizen-dashboard/complaints"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/citizen-dashboard/complaints")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <MessageSquareWarning className="h-[18px] w-[18px]" />
            <span>My Complaints</span>
          </Link>

          {/* My Requests */}
          <Link
            href="/dashboard/citizen-dashboard/service-request"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/citizen-dashboard/service-request")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
          >
            <ClipboardList className="h-[18px] w-[18px]" />
            <span>Service Requests</span>
          </Link>

          {/* Payments */}
          <Link
            href="/dashboard/citizen-dashboard/payments"
            onClick={onClose}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
              isActive("/dashboard/citizen-dashboard/payments")
                ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
                : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
            }`}
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
          className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
            isActive("/dashboard/settings")
              ? "bg-secondary-foreground/15 font-medium text-secondary-foreground"
              : "text-secondary-foreground/70 hover:bg-secondary-foreground/15 hover:text-secondary-foreground"
          }`}
        >
          <Settings className="h-[18px] w-[18px]" />
          <span>Settings</span>
        </Link>
      )}
    </nav>
  );
};

export default DashboardSidebarMenu;
