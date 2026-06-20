"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  const savedTheme = window.localStorage.getItem(STORAGE_KEY);
  return savedTheme === "light" || savedTheme === "dark" ? savedTheme : null;
}

function getSnapshot(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleChange = () => {
    if (!getStoredTheme()) {
      callback();
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  mediaQuery.addEventListener("change", handleChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(
    subscribe,
    getSnapshot,
    () => null,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme ?? getSystemTheme();
  }, [theme]);

  const toggleTheme = () => {
    const currentTheme = theme ?? getSystemTheme();
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(
      new StorageEvent("storage", { key: STORAGE_KEY, newValue: nextTheme }),
    );
  };

  const label = theme
    ? theme === "light"
      ? "Dark mode"
      : "Light mode"
    : "Theme";

  const ariaLabel = theme
    ? `Switch to ${theme === "light" ? "dark" : "light"} mode`
    : "Toggle color mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 items-center rounded-full border border-[color:var(--border)] px-4 text-sm text-[color:var(--muted)] transition hover:border-[color:var(--foreground)] hover:text-[color:var(--foreground)]"
      aria-label={ariaLabel}
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>{label}</span>
    </button>
  );
}
