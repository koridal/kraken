"use client";

import { useEffect, useMemo, useState } from "react";
import content from "@/data/siteContent.json";
import { useProgress } from "@/context/ProgressContext";

const levels = content.learning.levels;

export default function LearningPage() {
  const { awardPoints, markLessonComplete, completedLessons, points } = useProgress();
  const [activeLevelId, setActiveLevelId] = useState(levels[0]?.id);
  const [viewedCards, setViewedCards] = useState({});
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");

  const activeLevel = useMemo(
    () => levels.find((level) => level.id === activeLevelId) ?? levels[0],
    [activeLevelId],
  );

  const handleCardSelect = (cardId) => {
    setViewedCards((prev) => ({
      ...prev,
      [activeLevel.id]: {
        ...(prev[activeLevel.id] ?? {}),
        [cardId]: true,
      },
    }));
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [activeLevel.id]: {
        ...(prev[activeLevel.id] ?? {}),
        [questionId]: optionIndex,
      },
    }));
  };

  const handleCheckAndComplete = () => {
    const levelId = activeLevel.id;
    const levelViewed = viewedCards[levelId] ?? {};
    const levelAnswers = answers[levelId] ?? {};

    // Check if already completed
    const isAlreadyCompleted = completedLessons.includes(levelId);
    if (isAlreadyCompleted) {
      setFeedback("You already finished this mission. Great work!");
      return;
    }

    const allCardsSeen =
      activeLevel.cards.length > 0 &&
      activeLevel.cards.every((card) => levelViewed[card.id]);

    const allAnswered =
      activeLevel.quiz.length > 0 &&
      activeLevel.quiz.every((q) => levelAnswers[q.id] !== undefined);

    if (!allCardsSeen || !allAnswered) {
      setFeedback(
        "Read every card and choose an answer for each question before you finish the mission.",
      );
      return;
    }

    let correctCount = 0;
    activeLevel.quiz.forEach((q) => {
      if (levelAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const scoreRatio = correctCount / activeLevel.quiz.length;
    if (scoreRatio < 0.66) {
      setFeedback(
        "Nice try! Check your answers again. Try to get most questions correct before you finish.",
      );
      return;
    }

    // Award points and mark as complete
    const pointsToAward = Number(activeLevel.rewardPoints);
    console.log("Learning page: Completing level", levelId, "with reward points:", pointsToAward);
    console.log("Learning page: Current points before award:", points);
    
    if (!pointsToAward || pointsToAward <= 0) {
      console.error("Invalid reward points:", activeLevel.rewardPoints);
      setFeedback("Error: Invalid reward points. Please try again.");
      return;
    }
    
    markLessonComplete(levelId);
    awardPoints(pointsToAward);
    
    // Show feedback with a slight delay to ensure state update
    setTimeout(() => {
      setFeedback(
        `Mission complete! You earned ${pointsToAward} pearls. Check your total in the top bar!`,
      );
    }, 100);
  };

  const intro = content.learning;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="badge-label border-cyan-300/70 bg-slate-950/70 text-[0.65rem] text-cyan-100/90">
          Learning missions
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-sky-50 md:text-4xl">
          {intro.introTitle}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-200/80 md:text-base">
          {intro.introSubtitle}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
        <aside className="space-y-3 rounded-3xl border border-slate-700/80 bg-slate-950/70 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
            Missions
          </h2>
          <ul className="space-y-2 text-sm">
            {levels.map((level) => {
              const active = level.id === activeLevel.id;
              const done = completedLessons.includes(level.id);
              return (
                <li key={level.id}>
                  <button
                    type="button"
                    onClick={() => setActiveLevelId(level.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition ${
                      active
                        ? "border border-cyan-300/80 bg-cyan-400/15 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
                        : "border border-slate-700/70 bg-slate-900/70 text-slate-100/85 hover:border-cyan-300/60 hover:text-cyan-100"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300/90">
                        {level.levelLabel}
                      </p>
                      <p className="text-sm font-medium">{level.title}</p>
                      <p className="text-[0.7rem] text-slate-300/80">
                        Reward: {level.rewardPoints} pearls
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="rounded-full bg-slate-950/80 px-2 py-0.5 text-[0.65rem] text-slate-200/90">
                        {level.difficulty}
                      </span>
                      {done && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-200 shadow-[0_0_16px_rgba(52,211,153,0.6)]">
                          Complete
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="space-y-5 rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
          <header className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/90">
              {activeLevel.levelLabel}
            </p>
            <h2 className="text-lg font-semibold text-sky-50 md:text-xl">
              {activeLevel.title}
            </h2>
            <p className="max-w-2xl text-sm text-slate-200/80">
              {activeLevel.summary}
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/90">
                Story cards
              </h3>
              <ul className="space-y-3 text-sm">
                {activeLevel.cards.map((card) => (
                  <li key={card.id}>
                    <button
                      type="button"
                      onClick={() => handleCardSelect(card.id)}
                      className="glass-card flex w-full flex-col items-start gap-1.5 rounded-2xl border border-slate-600/80 bg-slate-900/80 px-3.5 py-3 text-left text-slate-100/90"
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-slate-300/90">
                          Card
                        </span>
                        {viewedCards[activeLevel.id]?.[card.id] && (
                          <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[0.65rem] text-emerald-200">
                            Read
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium">{card.title}</p>
                      <p className="text-[0.82rem] leading-relaxed text-slate-200/85">
                        {card.body}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/90">
                Quick quiz
              </h3>
              <ul className="space-y-3 text-sm">
                {activeLevel.quiz.map((q) => (
                  <li
                    key={q.id}
                    className="rounded-2xl border border-slate-600/80 bg-slate-900/80 p-3.5 shadow-[0_14px_30px_rgba(15,23,42,0.85)] backdrop-blur-xl"
                  >
                    <p className="mb-2 text-[0.9rem] font-medium text-slate-50">
                      {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((option, index) => {
                        const selected =
                          answers[activeLevel.id]?.[q.id] === index;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleAnswer(q.id, index)}
                            className={`w-full rounded-full px-3 py-1.5 text-left text-[0.8rem] transition ${
                              selected
                                ? "border border-cyan-300/80 bg-cyan-400/15 text-cyan-50 shadow-[0_0_16px_rgba(34,211,238,0.6)]"
                                : "border border-slate-600/80 bg-slate-950/80 text-slate-200/90 hover:border-cyan-300/70 hover:text-cyan-100"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
            <button
              type="button"
              onClick={handleCheckAndComplete}
              className="pill-accent text-xs font-semibold text-cyan-50 hover:-translate-y-0.5 hover:brightness-110"
            >
              Finish mission and earn pearls
            </button>
            <p className="max-w-sm text-[0.75rem] text-slate-200/80">
              To unlock Kraken videos and the mini-game, complete at least one
              mission and get most quiz questions correct.
            </p>
          </div>

          {feedback && (
            <p className="mt-1 text-[0.8rem] text-cyan-100/90">{feedback}</p>
          )}
        </section>
      </div>
    </div>
  );
}


