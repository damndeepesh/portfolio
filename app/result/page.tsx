import Link from "next/link";
import { cookies } from "next/headers";
import { lockResult, unlockResult } from "./actions";
import { isValidAccessToken, resultAccessCookie } from "./auth";
import { resultProfile, semesterResults } from "./data";
import ResultDashboard from "./result-dashboard";

type ResultPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const cookieStore = await cookies();
  const params = await searchParams;
  const isUnlocked = isValidAccessToken(cookieStore.get(resultAccessCookie)?.value);

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

            <form action={unlockResult} className="mt-10 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-[color:var(--muted)]">Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-transparent px-4 py-3 outline-none transition focus:border-[color:var(--foreground)]"
                  placeholder="Enter password"
                  required
                />
              </label>
              {params.error ? (
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
              Passwords are checked on the server and stored here only as hashes. The result page unlocks through an HTTP-only cookie so the raw passwords are not exposed in the browser bundle.
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
            <form action={lockResult}>
              <button
                type="submit"
                className="inline-flex h-11 items-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)]"
              >
                Lock page
              </button>
            </form>
          </div>
        </div>

        <div className="py-8">
          <ResultDashboard profile={resultProfile} semesters={semesterResults} />
        </div>
      </div>
    </main>
  );
}
