import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicPageMetadata.complaints;

export default function ComplaintsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
