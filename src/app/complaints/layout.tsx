import { Header } from "@/components/shared/header";
import { ReactNode } from "react";

interface ComplaintsLayoutProps {
  children: ReactNode;
}

const ComplaintsLayout = ({ children }: ComplaintsLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-center px-6 py-5">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CityCare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ComplaintsLayout;
