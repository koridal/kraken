"use client";

import { useEffect, useState } from "react";
import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

const gameConfig = content.game;

export default function KrakenGame() {
  const {
    points,
    awardPoints,
    recordGamePlayed,
    hasCompletedAnyLesson,
    spendPoints,
  } = useProgress();

  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [treasure, setTreasure] = useState(null);
  const [message, setMessage] = useState(
    "Click glowing treasures before they sink. Each treasure gives you pearls.",
  );

  useEffect(() => {
    let timer;

    if (isPlaying && round < gameConfig.maxRounds) {
      timer = setTimeout(() => {
        setRound((prev) => prev + 1);
        setTreasure({
          id: round,
          x: 10 + Math.random() * 70,
          y: 10 + Math.random() * 70,
        });
      }, 900);
    }

    if (isPlaying && round >= gameConfig.maxRounds) {
      finishGame();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, round]);

  const startGame = () => {
    if (!hasCompletedAnyLesson) {
      // eslint-disable-next-line no-alert
      alert("Finish at least one learning mission to unlock the game.");
      return;
    }
    const ok = spendPoints(gameConfig.pointsCost);
    if (!ok) {
      // eslint-disable-next-line no-alert
      alert(
        "You need more pearls to start the game. Try another learning mission.",
      );
      return;
    }

    setIsPlaying(true);
    setRound(0);
    setScore(0);
    setTreasure(null);
    setMessage("Catch as many treasures as you can before they sink.");
  };

  const finishGame = () => {
    setIsPlaying(false);
    setTreasure(null);
    const totalReward = score * gameConfig.rewardPerTreasure;
    if (totalReward > 0) {
      awardPoints(totalReward);
      recordGamePlayed();
      setMessage(
        `Great job! You caught ${score} treasures and earned ${totalReward} pearls.`,
      );
    } else {
      setMessage("No treasures this time. Try again to earn more pearls!");
    }
  };

  const handleTreasureClick = () => {
    if (!isPlaying || !treasure) return;
    setScore((prev) => prev + 1);
    setTreasure(null);
  };

  return (
    <div className="glass-panel relative mt-4 flex flex-col gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-4">
      <div className="flex items-center justify-between gap-3 text-xs">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-300/90">
            {gameConfig.title}
          </p>
          <p className="mt-1 text-[0.8rem] text-slate-200/80">{message}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.7rem] text-slate-200/90">
            Round {Math.min(round + 1, gameConfig.maxRounds)} /{" "}
            {gameConfig.maxRounds}
          </span>
          <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[0.7rem] font-semibold text-cyan-100">
            Caught: {score}
          </span>
        </div>
      </div>

      <div className="relative mt-1 h-56 overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-sky-500/20 via-slate-900 to-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.95)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0,rgba(248,250,252,0.22),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(129,140,248,0.26),transparent_60%)] mix-blend-screen" />

        {treasure && (
          <button
            type="button"
            onClick={handleTreasureClick}
            style={{
              left: `${treasure.x}%`,
              top: `${treasure.y}%`,
            }}
            className="absolute z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/80 text-xl text-cyan-50 shadow-[0_0_30px_rgba(34,211,238,0.9)] transition-transform hover:scale-110"
          >
            ✦
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-between px-4 pb-2 text-[0.65rem] text-cyan-50/85">
          <span className="rounded-full bg-slate-950/80 px-3 py-1 backdrop-blur-md">
            Click the glowing pearl before it sinks.
          </span>
          <span className="hidden rounded-full bg-slate-950/80 px-3 py-1 backdrop-blur-md sm:inline-flex">
            Each catch = {gameConfig.rewardPerTreasure} pearls
          </span>
        </div>
      </div>

        <div className="flex items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={startGame}
          className="pill-accent text-xs font-semibold text-cyan-50 hover:-translate-y-0.5 hover:brightness-110"
        >
          {isPlaying ? "Restart game" : "Start game"}
        </button>
          <p className="max-w-xs text-[0.75rem] text-slate-200/80">
            One round costs{" "}
            <span className="font-semibold text-cyan-200">
              {gameConfig.pointsCost} pearls
            </span>
            . You currently have{" "}
            <span className="font-semibold text-cyan-200">{points}</span>{" "}
            pearls.
          </p>
      </div>
    </div>
  );
}


