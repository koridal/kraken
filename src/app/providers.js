"use client";

import { ProgressProvider } from "@/context/ProgressContext";

export function Providers({ children }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}


