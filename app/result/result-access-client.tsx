"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { resultProfile, semesterResults } from "./data";
import ResultDashboard from "./result-dashboard";

const storageKey = "deepesh-result-access";

const passwordHashes = [
  "a001e3bec7e0b4502514b31ca6ea66a94a4578c91efb56bbde1420d348618532",
  "d82f1cb13c3a8149affcbacde14c8fc8719edcd9ddc69c3c0cdc407f5965ffdf",
  "3b49e09e4dbac748865ed518f47d960c74a7b71836ebfe978d49c276f17acc04",
  "6595f26ee2bcf9c9ae80026e03da09abe62aa7fe559531f4a85e80daf5b11a29",
];

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return toHex(digest);
}

export default function ResultAccessClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const isUnlocked = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener("result-access-change", callback);

      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("result-access-change", callback);
      };
    },
    () => window.localStorage.getItem(storageKey) === "1",
    () => false,
  );

  async function handleUnlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const passwordHash = await sha256(password.trim());
    const isAllowed = passwordHashes.includes(passwordHash);

    if (!isAllowed) {
      setError(true);
      return;
    }

    window.localStorage.setItem(storageKey, "1");
    window.dispatchEvent(new Event("result-access-change"));
    setError(false);
    setPassword("");
  }

  function handleLock() {
    window.localStorage.removeItem(storageKey);
    window.dispatchEvent(new Event("result-access-change"));
  }

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-10 sm:px-10">
          <div className="w-full rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">Protected Result</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
              B.Tech CSE 2021-2025 result dashboard
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Enter any approved password to unlock the complete semester-wise result, charts, and structured grade breakdown.
            </p>

            <form onSubmit={handleUnlock} className="mt-10 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-[color:var(--muted)]">Password</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-transparent px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
                  placeholder="Enter password"
                  required
                />
              </label>
              {error ? (
                <p className="text-sm text-red-400">Incorrect password. Try again.</p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)]"
                >
                  Unlock result
                </button>
                <Link
                  href="/"
                  className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium transition hover:border-[color:var(--foreground)]"
                >
                  Back to portfolio
                </Link>
              </div>
            </form>

            <p className="mt-8 text-sm leading-7 text-[color:var(--muted)]">
              This is a client-side privacy gate for convenience. It keeps the page hidden in normal use, but it is not a strong security boundary.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border)] pb-5">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">KK Modi University</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">B.Tech CSE 2021-2025 Result</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium transition hover:border-[color:var(--foreground)]"
            >
              Back to portfolio
            </Link>
            <button
              type="button"
              onClick={handleLock}
              className="inline-flex h-11 items-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)]"
            >
              Lock page
            </button>
          </div>
        </div>

        <div className="py-8">
          <ResultDashboard profile={resultProfile} semesters={semesterResults} />
        </div>
      </div>
    </main>
  );
}
