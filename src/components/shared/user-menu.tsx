"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCurrentUser, useLogout } from "@/hooks/auth.hook";

const UserMenu = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: userResponse } = useCurrentUser();
  const { mutate: logout, isPending } = useLogout();

  const user = userResponse?.data;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setOpen(false);

        toast.success("Logout successful.");

        router.push("/login");
      },

      onError: (error) => {
        toast.error(error instanceof Error
              ? error.message
              : "Logout failed. Please try again.");
      },
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt={user.name || "User"}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </div>

        <ChevronDown
          className={`hidden h-4 w-4 text-muted-foreground transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="flex items-center gap-3 border-b border-border px-4 py-4">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.name || "User"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.name || "User"}
              </p>

              <p className="mt-1 truncate text-xs text-muted-foreground">
                {user?.email || "Email not available"}
              </p>
            </div>
          </div>

          <div className="p-2">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <LayoutDashboard className="h-[18px] w-[18px] text-muted-foreground" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <User className="h-[18px] w-[18px] text-muted-foreground" />
              <span>Profile</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-[18px] w-[18px]" />
              <span>{isPending ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
