"use client";

import { useRef } from "react";

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

  return (
    <div className="mt-5 space-y-4">
      {directChannels.map((channel) => {
        const Icon = channel.icon;
        const isExternal = channel.href.startsWith("http");

        return (
          <a
            key={channel.label}
            href={channel.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="group block rounded-xl border border-border bg-card-muted px-4 py-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:bg-card-hover hover:shadow-[0_16px_40px_rgba(59,130,246,0.12)]"
            onMouseEnter={() => iconRefs.current[channel.label]?.startAnimation()}
            onMouseLeave={() => iconRefs.current[channel.label]?.stopAnimation()}
          >
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
          </a>
        );
      })}
    </div>
  );
}
