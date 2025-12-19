"use client";

import Link from "next/link";
import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

export default function HomePreviewGrid() {
  const { hasCompletedAnyLesson } = useProgress();
  const videos = content.videos;
  const game = content.game;
  const home = content.home;

  return (
    <section className="mt-10 grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,2fr)]">
      <div className="space-y-4 rounded-3xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Learning first
            </h2>
            <p className="mt-1 text-sm text-slate-300/80">
              Finish one mission to unlock the deep-sea fun.
            </p>
          </div>
          <Link
            href="/learning"
            className="rounded-full border border-cyan-300/70 bg-cyan-400/15 px-4 py-1.5 text-xs font-semibold text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.65)] backdrop-blur-md hover:-translate-y-0.5 hover:bg-cyan-400/25"
          >
            Go to missions
          </Link>
        </div>
        <ul className="mt-2 space-y-2 text-xs text-slate-200/80">
          {home.highlightItems.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4 rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
              Locked previews
            </h2>
            <p className="mt-1 text-sm text-slate-300/80">
              Videos and the game stay frosted until you learn.
            </p>
          </div>
        </div>

        <div className="grid gap-3 text-xs md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-slate-600/70 bg-slate-950/80 p-3 shadow-[0_16px_32px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/20 via-slate-900/50 to-slate-950/90 backdrop-blur-[2px]" />
            <div className="relative space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-300/80">
                  Videos
                </span>
                <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[0.65rem] text-slate-100/90">
                  Locked
                </span>
              </div>
              <p className="font-medium text-slate-50/90">
                {videos[0]?.title}
              </p>
              <p className="text-[0.7rem] text-slate-300/80">
                {videos[0]?.description}
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-600/70 bg-slate-950/80 p-3 shadow-[0_16px_32px_rgba(15,23,42,0.9)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-100/20 via-slate-900/50 to-slate-950/90 backdrop-blur-[2px]" />
            <div className="relative space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-300/80">
                  Game
                </span>
                <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[0.65rem] text-slate-100/90">
                  Locked
                </span>
              </div>
              <p className="font-medium text-slate-50/90">{game.title}</p>
              <p className="text-[0.7rem] text-slate-300/80">
                {game.shortDescription}
              </p>
            </div>
          </div>
        </div>

        <p className="text-[0.72rem] text-slate-300/80">
          {home.lockedPreviewTitle}{" "}
          <span className="font-medium text-slate-100/90">
            {hasCompletedAnyLesson
              ? "You already opened the gate. Use your pearls to explore!"
              : home.lockedPreviewDescription}
          </span>
        </p>
      </div>
    </section>
  );
}


