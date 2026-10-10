"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth.hook";
import DashboardSidebarMenu from "./Dashboard-sidebar-menu";

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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[240px] shrink-0 flex-col  bg-secondary transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex bg-white/97 h-[64px] shrink-0 items-center justify-between border-b border-white/60 px-5">
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
            className="rounded-md p-1.5 text-secondary-foreground/70 transition-colors hover:bg-secondary-foreground/10 hover:text-secondary-foreground md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <DashboardSidebarMenu role={role} mounted={mounted} onClose={onClose} />

        {/* User Area */}
        <div className="shrink-0 border-t border-secondary-foreground/10 p-2">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            {/* User Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-foreground text-sm font-medium text-secondary">
              {mounted && user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-secondary-foreground">
                {mounted ? user?.name || "User" : "User"}
              </p>

              <p className="truncate text-[11px] text-secondary-foreground/70">
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
