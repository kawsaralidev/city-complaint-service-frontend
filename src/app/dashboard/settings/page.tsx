"use client";

import Link from "next/link";
import { KeyRound } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="w-full space-y-6 p-6 md:p-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      {/* Settings Options */}
      <div className="space-y-3">
        <Link
          href="/dashboard/settings/change-password"
          className="flex w-full items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
            <KeyRound className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-sm font-medium text-foreground">
              Change Password
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Change your account password.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
