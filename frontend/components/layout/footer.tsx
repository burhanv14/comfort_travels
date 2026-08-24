"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plane,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { APP_NAME, NAV_LINKS, SERVICES } from "@/lib/constants";
import { Newsletter } from "@/features/newsletter/components/newsletter";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl section-padding container-padding pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand column */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-500 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
                <Plane className="size-5 -rotate-45" />
              </div>
              <div>
                <span className="block text-base font-bold leading-none">{APP_NAME}</span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Premium Travel
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Your trusted partner for unforgettable journeys. We craft premium travel experiences with personalised service and unbeatable value.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Our Services</h3>
              <ul className="space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6 lg:col-span-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Contact Us</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  123 Travel Street, Mumbai, Maharashtra 400001
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-primary" />
                  <a href="tel:+919876543210" className="transition-colors hover:text-primary">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-primary" />
                  <a href="mailto:info@comforttravels.com" className="transition-colors hover:text-primary">
                    info@comforttravels.com
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm">
              <h4 className="text-sm font-semibold">Stay Updated</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Get travel deals and inspiration in your inbox.
              </p>
              <div className="mt-4">
                <Newsletter />
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
