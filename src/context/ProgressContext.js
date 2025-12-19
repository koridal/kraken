"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ProgressContext = createContext(null);

const STORAGE_KEY = "kraken-world-progress-v1";

export function ProgressProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [videosWatched, setVideosWatched] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      if (typeof parsed.points === "number") {
        setPoints(parsed.points);
      }
      if (Array.isArray(parsed.completedLessons)) {
        setCompletedLessons(parsed.completedLessons);
      }
      if (typeof parsed.videosWatched === "number") {
        setVideosWatched(parsed.videosWatched);
      }
      if (typeof parsed.gamesPlayed === "number") {
        setGamesPlayed(parsed.gamesPlayed);
      }
    } catch (error) {
      console.error("Failed to load progress from storage", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      points,
      completedLessons,
      videosWatched,
      gamesPlayed,
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      console.log("Progress saved to localStorage:", payload);
    } catch (error) {
      console.error("Failed to save progress to storage", error);
    }
  }, [points, completedLessons, videosWatched, gamesPlayed]);

  // Debug: Log points changes
  useEffect(() => {
    console.log("Points state updated to:", points);
  }, [points]);

  const awardPoints = useCallback((amount) => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0 || isNaN(numAmount)) {
      console.warn("awardPoints called with invalid amount:", amount);
      return;
    }
    console.log("awardPoints: adding", numAmount, "points");
    setPoints((prev) => {
      const prevNum = Number(prev) || 0;
      const newPoints = prevNum + numAmount;
      console.log("awardPoints: previous points:", prevNum, "-> new points:", newPoints);
      return newPoints;
    });
  }, []);

  const spendPoints = (amount) => {
    if (!amount || amount <= 0) return true;
    let success = false;
    setPoints((prev) => {
      if (prev >= amount) {
        success = true;
        return prev - amount;
      }
      return prev;
    });
    return success;
  };

  const markLessonComplete = (lessonId) => {
    if (!lessonId) return;
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId],
    );
  };

  const recordVideoWatched = () => {
    setVideosWatched((prev) => prev + 1);
  };

  const recordGamePlayed = () => {
    setGamesPlayed((prev) => prev + 1);
  };

  const hasCompletedAnyLesson = completedLessons.length > 0;

  const value = {
    points,
    awardPoints,
    spendPoints,
    completedLessons,
    markLessonComplete,
    hasCompletedAnyLesson,
    videosWatched,
    recordVideoWatched,
    gamesPlayed,
    recordGamePlayed,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}


