"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import KrakenCanvas from "@/components/KrakenCanvas";
import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

export default function KrakenHero() {
  const rootRef = useRef(null);
  const { points, hasCompletedAnyLesson } = useProgress();
  const home = content.home;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        delay: 0.1,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from(".hero-cta", {
        opacity: 0,
        y: 16,
        delay: 0.22,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
      });
      gsap.from(".hero-stats-item", {
        opacity: 0,
        y: 18,
        delay: 0.35,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="grid gap-10 pt-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2.4fr)] md:pt-10"
    >
      <div className="space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.5)] hero-cta">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          Learn. Earn pearls. Unlock the deep.
        </div>

        <div className="space-y-4">
          <h1 className="hero-heading text-balance text-4xl font-semibold tracking-tight text-sky-50 md:text-5xl">
            {home.heroTitle}
          </h1>
          <p className="hero-sub max-w-xl text-balance text-sm leading-relaxed text-slate-200/80 md:text-base">
            {home.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={home.primaryCtaHref}
            className="hero-cta rounded-full border border-cyan-300/80 bg-cyan-400/20 px-5 py-2.5 text-sm font-semibold text-cyan-50 shadow-[0_0_25px_rgba(34,211,238,0.65)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-cyan-400/30"
          >
            {home.primaryCtaLabel}
          </Link>
          <Link
            href={home.secondaryCtaHref}
            className="hero-cta rounded-full border border-slate-500/60 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-slate-50/90 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:text-cyan-100"
          >
            {home.secondaryCtaLabel}
          </Link>
        </div>

        <div className="mt-4 grid gap-3 text-xs text-slate-100/80 sm:grid-cols-2 sm:text-sm">
          {home.highlightItems.map((item) => (
            <div
              key={item}
              className="hero-stats-item flex items-start gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-3 shadow-[0_20px_40px_rgba(15,23,42,0.85)] backdrop-blur-xl"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan-400/10 text-[0.6rem] text-cyan-200 shadow-[0_0_14px_rgba(34,211,238,0.6)]">
                ✦
              </span>
              <p className="leading-snug">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-200/80">
          <span className="rounded-full border border-slate-600/70 bg-slate-950/70 px-3 py-1.5 backdrop-blur-md">
            Pearls collected:{" "}
            <span className="font-semibold text-cyan-200">{points}</span>
          </span>
          <span className="rounded-full border border-slate-600/60 bg-slate-950/70 px-3 py-1.5 backdrop-blur-md">
            Videos & game:{" "}
            <span className="font-semibold">
              {hasCompletedAnyLesson ? "Unlocked with pearls" : "Locked until first mission"}
            </span>
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute -inset-6 rounded-[2.1rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 via-sky-400/4 to-purple-500/12 shadow-[0_0_50px_rgba(56,189,248,0.55)] backdrop-blur-3xl" />
        <div className="relative">
          <KrakenCanvas />
          <div className="pointer-events-none absolute inset-x-6 bottom-4 flex items-center justify-between text-[0.7rem] text-cyan-50/85">
            <div className="rounded-full bg-slate-950/70 px-3 py-1.5 backdrop-blur-md">
              Learning gate:{" "}
              <span className="font-semibold">
                {hasCompletedAnyLesson ? "Open" : "Complete 1 mission"}
              </span>
            </div>
            <div className="hidden rounded-full bg-slate-950/70 px-3 py-1.5 backdrop-blur-md sm:inline-flex">
              3D Kraken powered by Three.js
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


