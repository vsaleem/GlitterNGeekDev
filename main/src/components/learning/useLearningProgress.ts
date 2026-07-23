"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { LearningProductId } from "@/content/learning/curriculum";

const STORAGE_KEY = "gng-learning-v1";

export type LearningProgress = {
  values: Record<string, string>;
  checks: Record<string, boolean>;
  completed: string[];
  lastVisited: Partial<Record<LearningProductId, string>>;
};

const emptyProgress: LearningProgress = {
  values: {},
  checks: {},
  completed: [],
  lastVisited: {},
};

function readProgress(): LearningProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      values: parsed.values ?? {},
      checks: parsed.checks ?? {},
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      lastVisited: parsed.lastVisited ?? {},
    };
  } catch {
    return emptyProgress;
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(emptyProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setReady(true);
  }, []);

  const update = useCallback(
    (transform: (current: LearningProgress) => LearningProgress) => {
      setProgress((current) => {
        const next = transform(current);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new CustomEvent("gng-learning-progress"));
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    const sync = () => setProgress(readProgress());
    window.addEventListener("gng-learning-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("gng-learning-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const setValue = useCallback(
    (key: string, value: string) => {
      update((current) => ({
        ...current,
        values: { ...current.values, [key]: value },
      }));
    },
    [update],
  );
  const setCheck = useCallback(
    (key: string, checked: boolean) => {
      update((current) => ({
        ...current,
        checks: { ...current.checks, [key]: checked },
      }));
    },
    [update],
  );
  const setCompleted = useCallback(
    (key: string, completed: boolean) => {
      update((current) => ({
        ...current,
        completed: completed
          ? Array.from(new Set([...current.completed, key]))
          : current.completed.filter((item) => item !== key),
      }));
    },
    [update],
  );
  const setLastVisited = useCallback(
    (product: LearningProductId, lesson: string) => {
      update((current) => ({
        ...current,
        lastVisited: { ...current.lastVisited, [product]: lesson },
      }));
    },
    [update],
  );
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(emptyProgress);
    window.dispatchEvent(new CustomEvent("gng-learning-progress"));
  }, []);

  return useMemo(
    () => ({
      progress,
      ready,
      setValue,
      setCheck,
      setCompleted,
      setLastVisited,
      reset,
    }),
    [
      progress,
      ready,
      reset,
      setCheck,
      setCompleted,
      setLastVisited,
      setValue,
    ],
  );
}
