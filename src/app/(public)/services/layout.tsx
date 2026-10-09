import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicPageMetadata.services;

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
