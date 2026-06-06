"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

const navItems = [
  { href: "/", label: "Bio" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/certifications", label: "Certs" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="rounded-lg border border-border bg-card p-1.5 transition-colors group-hover:border-muted">
            <Terminal size={18} className="text-muted-foreground" />
          </div>
          <div className="leading-none">
            <span className="block text-lg tracking-tight text-foreground">
              Jay Palla
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active-pill"
                    className="absolute inset-0 rounded-md bg-card"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}

          <div className="mx-2 h-4 w-px bg-border" />

          <a
            href="https://github.com/TigerShock4982"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href="https://linkedin.com/in/jaypalla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-site-nav"
          className="rounded-md border border-border bg-card px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-site-nav"
          className="border-t border-border bg-background/95 md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "border-border-strong bg-card text-foreground"
                      : "border-transparent bg-card-muted text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-2 flex items-center gap-3 border-t border-border pt-4">
              <a
                href="https://github.com/TigerShock4982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jaypalla"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
