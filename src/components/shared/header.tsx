"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useCurrentUser, useLogout } from "@/hooks/auth.hook";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: userResponse, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();

  const user = userResponse?.data;

  // Check active navigation item
  const isActive = (path: string) => pathname === path;

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      setIsProfileOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center">
          <Image
            src="/citycarelogo.png"
            alt="CityCare"
            width={150}
            height={45}
            priority
            className="h-auto w-[130px] sm:w-[150px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className={`border-b-2 py-1 text-sm font-medium transition ${
              isActive("/")
                ? "border-secondary text-secondary"
                : "border-transparent text-foreground/70 hover:text-secondary"
            }`}
          >
            Home
          </Link>

          <Link
            href="/complaints"
            className={`border-b-2 py-1 text-sm font-medium transition ${
              isActive("/complaints")
                ? "border-secondary text-secondary"
                : "border-transparent text-foreground/70 hover:text-secondary"
            }`}
          >
            Complaints
          </Link>

          <Link
            href="/services"
            className={`border-b-2 py-1 text-sm font-medium transition ${
              isActive("/services")
                ? "border-secondary text-secondary"
                : "border-transparent text-foreground/70 hover:text-secondary"
            }`}
          >
            Services
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Logged Out */}
          {!isLoading && !user && (
            <Link
              href="/login"
              className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-shadow hover:shadow-lg hover:shadow-secondary/25"
            >
              Login
            </Link>
          )}

          {/* Logged In */}
          {!isLoading && user && (
            <div className="relative">
              {/* User Avatar */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 rounded-full p-1 transition hover:bg-muted"
                aria-label="Open profile menu"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-secondary/20"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary ring-2 ring-secondary/20">
                    <CircleUserRound className="h-6 w-6" />
                  </div>
                )}

                <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 rounded-xl border border-border bg-background p-2 shadow-xl">
                  {/* User Information */}
                  <div className="border-b border-border px-3 py-3">
                    <p className="text-sm font-semibold text-foreground">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-secondary/10 hover:text-secondary"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />

                    {logoutMutation.isPending ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/70 transition hover:bg-secondary/10 hover:text-secondary md:hidden"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {/* Home */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive("/")
                  ? "bg-secondary/10 text-secondary"
                  : "text-foreground/80 hover:bg-secondary/10 hover:text-secondary"
              }`}
            >
              Home
            </Link>

            {/* Complaints */}
            <Link
              href="/complaints"
              onClick={closeMobileMenu}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive("/complaints")
                  ? "bg-secondary/10 text-secondary"
                  : "text-foreground/80 hover:bg-secondary/10 hover:text-secondary"
              }`}
            >
              Complaints
            </Link>

            {/* Services */}
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive("/services")
                  ? "bg-secondary/10 text-secondary"
                  : "text-foreground/80 hover:bg-secondary/10 hover:text-secondary"
              }`}
            >
              Services
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
