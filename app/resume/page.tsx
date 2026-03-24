import Link from "next/link";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-12">
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
        >
          Back to portfolio
        </Link>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-32 sm:px-10 lg:px-12">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)]">
          <iframe
            title="Deepesh Gupta Resume"
            src="/Resume.pdf#view=FitH"
            className="h-[calc(100vh-9rem)] w-full"
          />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex justify-center px-6 pb-6">
        <div className="pointer-events-auto">
          <a
            href="/Resume.pdf"
            download
            className="inline-flex h-12 items-center rounded-full bg-[color:var(--foreground)] px-6 text-sm font-medium text-[color:var(--background)] shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition hover:scale-[1.02]"
          >
            Download resume
          </a>
        </div>
      </div>
    </main>
  );
}
