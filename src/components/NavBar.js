"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/context/ProgressContext";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learn" },
  { href: "/videos", label: "Videos" },
  { href: "/game", label: "Game" },
  { href: "/my-ocean", label: "My Ocean" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { points } = useProgress();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.5)]">
            KW
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100">
            Kraken World
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative transition-colors ${
                  active
                    ? "text-cyan-200"
                    : "text-slate-200/70 hover:text-cyan-200"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-cyan-400 via-sky-300 to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-xs md:text-sm">
          <div className="rounded-full border border-cyan-300/40 bg-slate-900/70 px-3 py-1.5 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.45)]">
            <span className="mr-1 text-[0.6rem] uppercase tracking-[0.18em] text-cyan-300/80">
              Pearls
            </span>
            <span className="font-semibold">{points}</span>
          </div>
        </div>
      </div>
    </header>
  );
}


