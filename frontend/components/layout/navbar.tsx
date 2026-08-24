"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Plane, Moon, Sun, Phone, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const primaryLinks = NAV_LINKS.slice(0, 6);

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/70 backdrop-blur-md"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between container-padding"
        aria-label="Main navigation"
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand-500 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <Plane className="size-5 -rotate-45" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-base font-bold leading-none tracking-tight">{APP_NAME}</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Premium Travel
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3.5 -bottom-[1.125rem] h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button asChild variant="outline" size="sm" className="hidden gap-1.5 rounded-lg md:inline-flex">
            <a href="tel:+919876543210">
              <Phone className="size-3.5" />
              Call Us
            </a>
          </Button>

          <Button asChild size="sm" className="hidden gap-1.5 rounded-lg sm:inline-flex">
            <Link href="/contact">
              Enquire Now
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 rounded-lg lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l border-border/60 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center gap-2.5 pt-2">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Plane className="size-4 -rotate-45" />
                </div>
                <span className="font-bold">{APP_NAME}</span>
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                    {pathname === link.href && <span className="size-1.5 rounded-full bg-primary" />}
                  </Link>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full gap-2">
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Enquire Now <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full gap-2">
                  <a href="tel:+919876543210">
                    <Phone className="size-4" /> +91 98765 43210
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
