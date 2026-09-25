"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth.hook";
import UserMenu from "@/components/shared/user-menu";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: userResponse, isLoading } = useCurrentUser();
  const user = userResponse?.data;

  // Check active navigation item
  const isActive = (path: string) => pathname === path;

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
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
          {!isLoading && user && <UserMenu />}

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
