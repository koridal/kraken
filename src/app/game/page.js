"use client";

import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";
import KrakenGame from "@/components/KrakenGame";

export default function GamePage() {
  const { points, hasCompletedAnyLesson } = useProgress();
  const config = content.game;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="badge-label border-cyan-300/70 bg-slate-950/70 text-[0.65rem] text-cyan-100/90">
          Kraken mini‑game
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
          Spend pearls to play in the deep
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-base">
          Use pearls you earned from learning missions to start a short game
          with the friendly Kraken. Tap or click glowing treasures before they
          sink.
        </p>
        <p className="text-xs text-cyan-100/90">
          Current pearls:{" "}
          <span className="font-semibold text-cyan-200">{points}</span> · Cost
          per play:{" "}
          <span className="font-semibold text-cyan-200">
            {config.pointsCost} pearls
          </span>
        </p>
      </header>

      {!hasCompletedAnyLesson && (
        <div className="rounded-3xl border border-amber-400/40 bg-amber-500/10 p-4 text-xs text-amber-100 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <p className="font-semibold">Learning gate closed for now.</p>
          <p className="mt-1">
            Complete at least one mission on the learning page to open this
            mini‑game.
          </p>
        </div>
      )}

      <section className="space-y-3 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
        <p className="text-xs text-slate-200/85">
          When you are ready, confirm that you want to spend pearls and start a
          short game round. Each treasure you catch is worth{" "}
          <span className="font-semibold text-cyan-200">
            {config.rewardPerTreasure} pearls
          </span>
          .
        </p>

        <KrakenGame />
      </section>
    </div>
  );
}


