"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth.hook";
import UserMenu from "@/components/shared/user-menu";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: userResponse, isLoading } = useCurrentUser();
  const user = userResponse?.data;

  const isActive = (path: string) => pathname === path;

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-5">
        {/* ================================
            LOGO
            ================================ */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0 transition-opacity duration-200 hover:opacity-90"
          aria-label="CityCare Home"
        >
          <Image
            src="/citycarelogo.png"
            alt="CityCare"
            width={150}
            height={45}
            priority
            className="h-auto w-[125px] sm:w-[145px]"
          />
        </Link>

        {/* ================================
            DESKTOP NAVIGATION
            ================================ */}

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {/* Home */}
          <Link
            href="/"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/")
                ? "text-primary"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
            )}
          </Link>

          {/* Complaints */}
          <Link
            href="/complaints"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/complaints")
                ? "text-primary"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Complaints
            {isActive("/complaints") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
            )}
          </Link>

          {/* Services */}
          <Link
            href="/services"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/services")
                ? "text-primary"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Services
            {isActive("/services") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
            )}
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/about")
                ? "text-primary"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            About
            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
            )}
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              isActive("/contact")
                ? "text-primary"
                : "text-foreground/70 hover:text-primary"
            }`}
          >
            Contact
            {isActive("/contact") && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-primary" />
            )}
          </Link>
        </nav>

        {/* ================================
            RIGHT SIDE
            ================================ */}

        <div className="flex items-center gap-3">
          {/* Logged Out */}

          {!isLoading && !user && (
            <div className="hidden items-center gap-3 sm:flex">
              {/* Login */}
              <Link
                href="/login"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-secondary/5"
              >
                Login
              </Link>

              {/* Get Started */}
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}

          {/* Logged In */}

          {!isLoading && user && <UserMenu />}

          {/* Mobile Menu Button */}

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary md:hidden"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ================================
          MOBILE NAVIGATION
          ================================ */}

      {isMenuOpen && (
        <div className="border-t border-border/80 bg-background px-4 py-4 shadow-sm md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {/* Home */}
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`relative w-fit py-3 text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>

            {/* Complaints */}
            <Link
              href="/complaints"
              onClick={closeMobileMenu}
              className={`relative w-fit py-3 text-sm font-medium transition-colors duration-200 ${
                isActive("/complaints")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Complaints
              {isActive("/complaints") && (
                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>

            {/* Services */}
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className={`relative w-fit py-3 text-sm font-medium transition-colors duration-200 ${
                isActive("/services")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Services
              {isActive("/services") && (
                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className={`relative w-fit py-3 text-sm font-medium transition-colors duration-200 ${
                isActive("/about")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              About
              {isActive("/about") && (
                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className={`relative w-fit py-3 text-sm font-medium transition-colors duration-200 ${
                isActive("/contact")
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              Contact
              {isActive("/contact") && (
                <span className="absolute bottom-1 left-0 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>

            {/* Mobile Auth Buttons */}

            {!isLoading && !user && (
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                {/* Login */}
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-border px-4 py-3 text-center text-sm font-semibold text-secondary transition-colors hover:border-secondary/20 hover:bg-secondary/5"
                >
                  Login
                </Link>

                {/* Get Started */}
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
