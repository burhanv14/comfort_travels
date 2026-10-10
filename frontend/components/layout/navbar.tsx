"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu,
  Moon,
  Sun,
  Phone,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const filteredLinks = NAV_LINKS.filter(
  (link) => !["About", "Contact"].includes(link.label)
);

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();

  // Spread the transformation across a longer scroll distance.
  const progress = useTransform(
    scrollY,
    [0, 1000],
    [0, 1],
    { clamp: true }
  );

  // Navbar dimensions
  const navWidth = useTransform(
    progress,
    [0, 1],
    ["100%", "94%"]
  );

  const navMaxWidth = useTransform(
    progress,
    [0, 1],
    [3000, 1040]
  );

  const navHeight = useTransform(
    progress,
    [0, 1],
    [65, 62]
  );

  const navTop = useTransform(
    progress,
    [0, 1],
    [0, 16]
  );

  const navRadius = useTransform(
    progress,
    [0, 1],
    [0, 999]
  );

  const navPadding = useTransform(
    progress,
    [0, 1],
    [24, 18]
  );

  // Opaque at the top; subtle glass only as the capsule forms.
  const navBackground = useTransform(
    progress,
    [0, 0.5, 1],
    [
      theme === "dark"
        ? "rgba(10,10,10,1)"
        : "rgba(255,255,255,1)",
      theme === "dark"
        ? "rgba(10,10,10,0.98)"
        : "rgba(255,255,255,0.98)",
      theme === "dark"
        ? "rgba(18,18,18,0.82)"
        : "rgba(255,255,255,0.82)",
    ]
  );

  const navShadow = useTransform(
    progress,
    [0, 1],
    [
      "0px 0px 0px rgba(0,0,0,0)",
      "0px 10px 40px -12px rgba(0,0,0,0.22)",
    ]
  );

  const navBorder = useTransform(
    progress,
    [0, 1],
    [
      "rgba(128,128,128,0)",
      "rgba(128,128,128,0.24)",
    ]
  );

  const logoSize = useTransform(
    progress,
    [0, 1],
    [64, 44]
  );

  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      style={{ paddingTop: navTop }}
    >
      <motion.nav
        aria-label="Main navigation"
        className={cn(
          "relative flex w-full items-center justify-between",
          "border px-4 sm:px-6",
          "transform-gpu"
        )}
        style={{
          width: navWidth,
          maxWidth: navMaxWidth,
          height: navHeight,
          borderRadius: navRadius,
          paddingLeft: navPadding,
          paddingRight: navPadding,
          backgroundColor: navBackground,
          boxShadow: navShadow,
          borderColor: navBorder,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${APP_NAME} home`}
          className="relative z-10 flex shrink-0 items-center"
        >
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: logoSize,
              height: logoSize,
            }}
          >
            <Image
              src="/CT_LOGO.png"
              alt={APP_NAME}
              width={96}
              height={96}
              priority
              className="h-full w-full rounded-xl object-contain"
            />
          </motion.div>
        </Link>

        {/* Desktop navigation */}
        <div className="relative z-10 hidden items-center gap-0.5 lg:flex">
          {filteredLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium",
                  "transition-colors duration-300",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                )}
              >
                {link.label}

                {isActive && (
                  <span className="absolute inset-x-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="relative z-10 flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="relative size-9 rounded-full"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden gap-1.5 rounded-full md:inline-flex"
          >
            <a href="tel:+917674836398">
              <Phone className="size-3.5" />
              Call Us
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="hidden gap-1.5 rounded-full sm:inline-flex"
          >
            <Link href="/contact">
              Enquire Now
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-80 border-l border-border/60 bg-background/95 backdrop-blur-2xl"
            >
              <SheetTitle className="sr-only">
                Navigation Menu
              </SheetTitle>

              <Separator className="my-7" />

              <div className="flex flex-col gap-1">
                {filteredLinks.map((link) => (
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

                    {pathname === link.href && (
                      <span className="size-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  className="w-full gap-2 rounded-xl"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                  >
                    Enquire Now
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full gap-2 rounded-xl"
                >
                  <a href="tel:+917674836398">
                    <Phone className="size-4" />
                   +91 76748 36398
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </motion.header>
  );
}