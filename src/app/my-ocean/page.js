"use client";

import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

export default function MyOceanPage() {
  const {
    points,
    completedLessons,
    videosWatched,
    gamesPlayed,
    hasCompletedAnyLesson,
  } = useProgress();
  const copy = content.myOcean;

  const firstMissionComplete = completedLessons.length > 0;
  const videoMilestone = videosWatched > 0;
  const gameMilestone = gamesPlayed > 0;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="badge-label border-cyan-300/70 bg-slate-950/70 text-[0.65rem] text-cyan-100/90">
          Your ocean journal
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
          {copy.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-base">
          {copy.subtitle}
        </p>
        <p className="text-xs text-cyan-100/90">
          Pearls saved:{" "}
          <span className="font-semibold text-cyan-200">{points}</span> ·
          Missions finished:{" "}
          <span className="font-semibold text-cyan-200">
            {completedLessons.length}
          </span>{" "}
          · Videos watched:{" "}
          <span className="font-semibold text-cyan-200">{videosWatched}</span>{" "}
          · Games played:{" "}
          <span className="font-semibold text-cyan-200">{gamesPlayed}</span>
        </p>
      </header>

      {!hasCompletedAnyLesson && (
        <div className="rounded-3xl border border-slate-600/80 bg-slate-950/80 p-4 text-xs text-slate-200/90 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <p className="font-semibold">Your ocean is waiting for its first wave.</p>
          <p className="mt-1">
            Start on the learning page to complete your first mission. As you
            learn and play, this page will fill with your progress.
          </p>
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-3">
        <article className="glass-card flex flex-col gap-2 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 text-xs text-slate-200/90">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-300/90">
            Learning waves
          </p>
          <p className="text-sm font-semibold text-sky-50">
            Missions completed
          </p>
          <p className="text-3xl font-semibold text-cyan-200">
            {completedLessons.length}
          </p>
          <p className="text-[0.78rem]">
            Each finished mission means one more clear idea about Krakens or
            the ocean that you understand well.
          </p>
        </article>

        <article className="glass-card flex flex-col gap-2 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 text-xs text-slate-200/90">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-300/90">
            Ocean screen time
          </p>
          <p className="text-sm font-semibold text-sky-50">
            Videos explored
          </p>
          <p className="text-3xl font-semibold text-cyan-200">
            {videosWatched}
          </p>
          <p className="text-[0.78rem]">
            Use videos slowly and with care, like a window into the ocean, not
            just something to play in the background.
          </p>
        </article>

        <article className="glass-card flex flex-col gap-2 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 text-xs text-slate-200/90">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-300/90">
            Playful currents
          </p>
          <p className="text-sm font-semibold text-sky-50">
            Game rounds played
          </p>
          <p className="text-3xl font-semibold text-cyan-200">
            {gamesPlayed}
          </p>
          <p className="text-[0.78rem]">
            Short, focused game rounds keep the deep sea fun while still
            leaving plenty of time for reading and rest.
          </p>
        </article>
      </section>

      <section className="space-y-3 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 text-xs text-slate-200/90 shadow-[0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-300/90">
          Milestones
        </p>
        <ul className="grid gap-3 md:grid-cols-3">
          {copy.milestones.map((milestone) => {
            const achieved =
              (milestone.id === "first-mission" && firstMissionComplete) ||
              (milestone.id === "video-unlock" && videoMilestone) ||
              (milestone.id === "game-played" && gameMilestone);

            return (
              <li
                key={milestone.id}
                className={`rounded-2xl border px-3 py-3 text-[0.8rem] ${
                  achieved
                    ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-100 shadow-[0_0_22px_rgba(52,211,153,0.8)]"
                    : "border-slate-600/80 bg-slate-950/80 text-slate-200/90"
                }`}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
                  {milestone.title}
                </p>
                <p className="mt-1">{milestone.description}</p>
                <p className="mt-2 text-[0.7rem]">
                  Status:{" "}
                  <span className="font-semibold">
                    {achieved ? "Reached" : "Not yet"}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}


