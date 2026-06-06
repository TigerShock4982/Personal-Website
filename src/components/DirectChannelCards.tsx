"use client";

import { useRef, useState } from "react";

import { GithubIcon, type GithubIconHandle } from "@/components/ui/github";
import { LinkedinIcon, type LinkedinIconHandle } from "@/components/ui/linkedin";
import { MailIcon, type MailIconHandle } from "@/components/ui/mail";

type IconHandle = GithubIconHandle | LinkedinIconHandle | MailIconHandle;

type ChannelItem = {
  label: string;
  value: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> &
      React.RefAttributes<IconHandle> & {
        size?: number;
      }
  >;
};

const directChannels: ChannelItem[] = [
  {
    label: "Email",
    value: "jaypalla22@gmail.com",
    href: "mailto:jaypalla22@gmail.com",
    icon: MailIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jaypalla",
    href: "https://linkedin.com/in/jaypalla",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "github.com/TigerShock4982",
    href: "https://github.com/TigerShock4982",
    icon: GithubIcon,
  },
];

export default function DirectChannelCards() {
  const iconRefs = useRef<Record<string, IconHandle | null>>({});
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("jaypalla22@gmail.com");
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <div className="mt-5 space-y-4">
      {directChannels.map((channel) => {
        const Icon = channel.icon;
        const isExternal = channel.href.startsWith("http");
        const isEmail = channel.label === "Email";
        const content = (
          <div className="flex items-start gap-3">
            <div className="pointer-events-none mt-0.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
              <Icon
                ref={(instance) => {
                  iconRefs.current[channel.label] = instance;
                }}
                size={22}
              />
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {channel.label}
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground-soft transition-colors group-hover:text-foreground">
                {channel.value}
              </p>
            </div>
          </div>
        );

        if (isEmail) {
          return (
            <div
              key={channel.label}
              className="group relative rounded-xl border border-border bg-card-muted transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:bg-card-hover hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]"
              onMouseEnter={() =>
                iconRefs.current[channel.label]?.startAnimation()
              }
              onMouseLeave={() =>
                iconRefs.current[channel.label]?.stopAnimation()
              }
            >
              <a
                href={channel.href}
                className="block min-w-0 px-4 py-4 pr-2"
                aria-label={`Open an email draft to ${channel.value}`}
              >
                {content}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="absolute right-3 top-3 rounded-md border border-border bg-background/80 px-2 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition-all hover:border-accent hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={`Copy ${channel.value} to clipboard`}
              >
                {emailCopied ? "Copied" : "Copy"}
              </button>
            </div>
          );
        }

        return (
          <a
            key={channel.label}
            href={channel.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group relative block rounded-xl border border-border bg-card-muted px-4 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:bg-card-hover hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]"
            onMouseEnter={() => iconRefs.current[channel.label]?.startAnimation()}
            onMouseLeave={() => iconRefs.current[channel.label]?.stopAnimation()}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
