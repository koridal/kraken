"use client";

import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

export default function VideosPage() {
  const { points, spendPoints, hasCompletedAnyLesson, recordVideoWatched } =
    useProgress();
  const videos = content.videos;

  const handleWatch = (video) => {
    if (!hasCompletedAnyLesson) {
       
      alert("Finish at least one learning mission to unlock videos.");
      return;
    }
    const ok = spendPoints(video.pointsCost);
    if (!ok) {
       
      alert("You need more pearls to watch this video. Try another mission.");
      return;
    }
    recordVideoWatched();
    const iframe = document.getElementById(`video-${video.id}`);
    if (iframe) {
      iframe.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="badge-label border-cyan-300/70 bg-slate-950/70 text-[0.65rem] text-cyan-100/90">
          Kraken video reef
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
          Watch ocean stories with your pearls
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-base">
          Use pearls you earned from learning missions to unlock Kraken
          stories, deep-sea lights, and more ocean adventures.
        </p>
        <p className="text-xs text-cyan-100/90">
          Current pearls:{" "}
          <span className="font-semibold text-cyan-200">{points}</span>
        </p>
      </header>

      {!hasCompletedAnyLesson && (
        <div className="rounded-3xl border border-amber-400/40 bg-amber-500/10 p-4 text-xs text-amber-100 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <p className="font-semibold">
            Learning gate closed. Videos are frosted for now.
          </p>
          <p className="mt-1">
            Complete at least one learning mission to open the video reef and
            start spending pearls.
          </p>
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2">
        {videos.map((video) => (
          <article
            key={video.id}
            className={`relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-2xl ${
              !hasCompletedAnyLesson ? "frosted-locked" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/90">
                  Kraken video
                </p>
                <h2 className="mt-1 text-sm font-semibold text-sky-50 md:text-base">
                  {video.title}
                </h2>
                <p className="mt-1 text-xs text-slate-200/80">
                  {video.description}
                </p>
                <p className="mt-1 text-[0.7rem] text-slate-300/80">
                  Cost:{" "}
                  <span className="font-semibold text-cyan-200">
                    {video.pointsCost} pearls
                  </span>{" "}
                  · Duration: {video.duration}
                </p>
                <p className="mt-1 text-[0.7rem] text-cyan-100/90">
                  Hint: {video.hint}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleWatch(video)}
                className="pill-accent text-xs font-semibold text-cyan-50 hover:-translate-y-0.5 hover:brightness-110"
              >
                Spend pearls and watch
              </button>
              <p className="max-w-40 text-[0.7rem] text-slate-200/80">
                Watching with care and curiosity matters more than watching
                fast.
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/80">
              <iframe
                id={`video-${video.id}`}
                title={video.title}
                src={video.embedUrl}
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-48 w-full"
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}


