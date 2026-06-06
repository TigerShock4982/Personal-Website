"use client";

import { useRef } from "react";

import { DeltaTauIcon, type DeltaTauIconHandle } from "@/components/ui/deltatau";
import { GoodreadsIcon, type GoodreadsIconHandle } from "@/components/ui/goodreads";
import { MyAnimeListIcon, type MyAnimeListIconHandle } from "@/components/ui/myanimelist";
import { SpotifyIcon, type SpotifyIconHandle } from "@/components/ui/spotify";

type IconHandle =
  | DeltaTauIconHandle
  | GoodreadsIconHandle
  | MyAnimeListIconHandle
  | SpotifyIconHandle;

type InterestItem = {
  title: string;
  description: string;
  hoverClassName: string;
  icon: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> &
      React.RefAttributes<IconHandle> & {
        size?: number;
      }
  >;
};

const personalInterests: InterestItem[] = [
  {
    title: "Extracurriculars",
    description:
      "Space for student organizations, side commitments, and work outside the classroom.",
    hoverClassName:
      "hover:-translate-y-1 hover:border-red-500/85 hover:bg-red-600/6 hover:shadow-[0_16px_40px_rgba(239,68,68,0.18)]",
    icon: DeltaTauIcon,
  },
  {
    title: "Goodreads",
    description: "Reading log and long-form nonfiction interests.",
    hoverClassName:
      "hover:-translate-y-1 hover:border-amber-400/85 hover:bg-amber-500/6 hover:shadow-[0_16px_40px_rgba(245,158,11,0.18)]",
    icon: GoodreadsIcon,
  },
  {
    title: "Spotify",
    description: "Playlists, listening habits, and music outside engineering.",
    hoverClassName:
      "hover:-translate-y-1 hover:border-emerald-400/80 hover:bg-emerald-500/5 hover:shadow-[0_16px_40px_rgba(52,211,153,0.14)]",
    icon: SpotifyIcon,
  },
  {
    title: "MyAnimeList",
    description: "Animation and series tracking for personal interests.",
    hoverClassName:
      "hover:-translate-y-1 hover:border-blue-700/80 hover:bg-blue-700/8 hover:shadow-[0_16px_40px_rgba(37,99,235,0.16)]",
    icon: MyAnimeListIcon,
  },
];

export default function HomeInterestCards() {
  const iconRefs = useRef<Record<string, IconHandle | null>>({});

  return (
    <div className="mt-5 space-y-4">
      {personalInterests.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`group rounded-xl border border-border bg-card-muted px-4 py-4 transition-all duration-200 ${item.hoverClassName}`}
            onMouseEnter={() => iconRefs.current[item.title]?.startAnimation()}
            onMouseLeave={() => iconRefs.current[item.title]?.stopAnimation()}
          >
            <div className="flex items-start gap-3">
              <div className="pointer-events-none mt-0.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
                <Icon
                  ref={(instance) => {
                    iconRefs.current[item.title] = instance;
                  }}
                  size={24}
                />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground transition-colors group-hover:text-foreground-soft">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
