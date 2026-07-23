"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "gng-learning-theme";
const choices = [
  { value: "light" as const, label: "Light theme", icon: Sun },
  { value: "dark" as const, label: "Dark theme", icon: Moon },
  { value: "system" as const, label: "Use system theme", icon: Monitor },
];

function applyTheme(preference: ThemePreference) {
  const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.learningTheme =
    preference === "system" ? (systemIsDark ? "dark" : "light") : preference;
}

export default function LearningThemeControls() {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    setPreference(initial);
    applyTheme(initial);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if ((localStorage.getItem(STORAGE_KEY) ?? "system") === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const chooseTheme = (next: ThemePreference) => {
    setPreference(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <div className="learn-theme-control" aria-label="Color theme">
      {choices.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          title={label}
          aria-pressed={preference === value}
          onClick={() => chooseTheme(value)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
