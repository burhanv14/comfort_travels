"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Mail, Phone, MapPin } from "lucide-react";
import { APP_NAME, NAV_LINKS, SERVICES } from "@/lib/constants";
import { Newsletter } from "@/features/newsletter/components/newsletter";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl section-padding container-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Plane className="size-5" />
              </div>
              {APP_NAME}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for unforgettable journeys. We craft premium travel experiences with personalised service and unbeatable value.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "X", "YT"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label={`${label} link`}
                >
                  <span className="text-[10px] font-semibold">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                123 Travel Street, Mumbai, Maharashtra 400001
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href="mailto:info@comforttravels.com" className="hover:text-primary">info@comforttravels.com</a>
              </li>
            </ul>
            <div className="mt-6">
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/about" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
