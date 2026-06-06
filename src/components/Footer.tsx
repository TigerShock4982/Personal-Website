import Link from "next/link";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import Container from "@/components/Container";

const stackItems = ["Next.js App Router", "Tailwind CSS", "shadcn/ui direction"];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/80">
      <Container className="py-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
                Root
              </p>
              <p className="mt-2 text-sm text-foreground-soft">
                &copy; 2026 Jay Palla.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link href="/privacy" className="transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="/contact" className="transition-colors hover:text-foreground">
                Contact
              </Link>
              <a
                href="https://github.com/TigerShock4982"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/jaypalla"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              System Stack
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {stackItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
