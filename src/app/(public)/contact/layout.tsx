import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicPageMetadata.contact;

type ContactLayoutProps = {
  children: React.ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
