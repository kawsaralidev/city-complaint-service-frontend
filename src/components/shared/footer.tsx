import Link from "next/link";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";

import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "Home", href: "/" },
    { label: "Complaints", href: "/complaints" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
    { label: "Register", href: "/register" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full px-[4vw] sm:px-[5vw] 2xl:px-[6vw]">
        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              href="#"
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

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              A simple and reliable platform for connecting citizens with
              essential city complaints and services.
            </p>

            {/* Trust points */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Simple online access
              </div>

              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Transparent service process
              </div>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>

            <ul className="mt-5 space-y-3">
              {footerLinks.Support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                <p className="text-sm leading-6 text-white/55">
                  CityCare Service Center
                  <br />
                  Your local city administration
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />

                <span className="text-sm text-white/55">
                  support@citycare.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />

                <span className="text-sm text-white/55">+880 1766554433</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              <div className="mt-6 flex items-center gap-2">
                <a
                  href="asd"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-white/60 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  f
                </a>

                <a
                  href="as"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-white/60 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  ig
                </a>

                <a
                  href="as"
                  aria-label="LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-white/60 transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CityCare. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy
            </Link>

            <Link href="#" className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
