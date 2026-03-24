"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { SemesterResult } from "./data";

type ResultDashboardProps = {
  profile: {
    studentName: string;
    universityId: string;
    programmeName: string;
    batch: string;
    overallCgpa: number;
    grandTotalMarks: number;
    grandTotalOutOf: number;
    totalCreditsTaken: number;
    totalCreditsTransfer: number;
    overallCredits: number;
    result: string;
  };
  semesters: SemesterResult[];
};

function linePoints(values: number[], width: number, height: number, padding: number) {
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const min = Math.min(...values) - 0.4;
  const max = Math.max(...values) + 0.2;

  return values
    .map((value, index) => {
      const x = padding + (index / (values.length - 1)) * innerWidth;
      const y = padding + ((max - value) / (max - min || 1)) * innerHeight;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function ResultDashboard({
  profile,
  semesters,
}: ResultDashboardProps) {
  const [selectedId, setSelectedId] = useState(semesters.at(-1)?.id ?? semesters[0].id);
  const [activePoint, setActivePoint] = useState<{
    x: number;
    y: number;
    value: number;
    label: string;
    metric: "SGPA" | "CGPA";
  } | null>(null);

  const selectedSemester = useMemo(
    () => semesters.find((semester) => semester.id === selectedId) ?? semesters[0],
    [selectedId, semesters],
  );

  const sgpaValues = semesters.map((semester) => semester.sgpa);
  const cgpaValues = semesters.map((semester) => semester.cgpa ?? null);
  const marksPercentages = semesters.map((semester) =>
    Number(((semester.marksObtained / semester.totalMarks) * 100).toFixed(1)),
  );

  const sgpaLine = linePoints(sgpaValues, 560, 220, 24);
  const cgpaLine = linePoints(
    cgpaValues.map((value, index) => value ?? sgpaValues[index]),
    560,
    220,
    24,
  );

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Final CGPA</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{profile.overallCgpa.toFixed(2)}</p>
        </div>
        <div className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Grand Total</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
            {profile.grandTotalMarks}
            <span className="text-lg text-[color:var(--muted)]"> / {profile.grandTotalOutOf}</span>
          </p>
        </div>
        <div className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Credits</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{profile.overallCredits.toFixed(2)}</p>
        </div>
        <div className="rounded-[1.8rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Result</p>
          <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">{profile.result}</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">CGPA Journey</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">Semester-wise SGPA and cumulative CGPA progression.</p>
            </div>
          </div>
          <div className="relative mt-6">
            {activePoint ? (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-xs shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
                style={{ left: activePoint.x, top: activePoint.y - 12 }}
              >
                <p className="uppercase tracking-[0.16em] text-[color:var(--muted)]">
                  {activePoint.metric}
                </p>
                <p className="mt-1 text-sm text-[color:var(--foreground)]">
                  {activePoint.label}: {activePoint.value.toFixed(2)}
                </p>
              </div>
            ) : null}
            <svg viewBox="0 0 560 220" className="w-full">
            <polyline
              points={sgpaLine}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points={cgpaLine}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {sgpaValues.map((value, index) => {
              const [x, y] = sgpaLine.split(" ")[index].split(",");
              return (
                <circle
                  key={`sgpa-${index}`}
                  cx={x}
                  cy={y}
                  r="7"
                  fill="transparent"
                  onMouseEnter={() =>
                    setActivePoint({
                      x: Number(x),
                      y: Number(y),
                      value,
                      label: semesters[index].label,
                      metric: "SGPA",
                    })
                  }
                  onMouseLeave={() => setActivePoint(null)}
                />
              );
            })}
            {sgpaValues.map((value, index) => {
              const [x, y] = sgpaLine.split(" ")[index].split(",");
              return <circle key={`sgpa-visual-${index}`} cx={x} cy={y} r="4" fill="currentColor" fillOpacity="0.35" />;
            })}
            {cgpaValues.map((value, index) => {
              if (value === null) {
                return null;
              }

              const [x, y] = cgpaLine.split(" ")[index].split(",");
              return (
                <g key={`cgpa-${index}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="7"
                    fill="transparent"
                    onMouseEnter={() =>
                      setActivePoint({
                        x: Number(x),
                        y: Number(y),
                        value,
                        label: semesters[index].label,
                        metric: "CGPA",
                      })
                    }
                    onMouseLeave={() => setActivePoint(null)}
                  />
                  <circle cx={x} cy={y} r="4" fill="currentColor" />
                </g>
              );
            })}
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[color:var(--foreground)]" /> CGPA</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[color:var(--foreground)]/35" /> SGPA</span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Marks Percentage</p>
          <div className="mt-6 space-y-4">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{semester.label}</span>
                  <span className="text-[color:var(--muted)]">{marksPercentages[index]}%</span>
                </div>
                <div className="h-2 rounded-full bg-[color:var(--surface)]">
                  <motion.div
                    className="h-full rounded-full bg-[color:var(--foreground)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${marksPercentages[index]}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Semester Explorer</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Select any semester to inspect marks, grades, credits, and subject-wise performance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <button
                key={semester.id}
                type="button"
                onClick={() => setSelectedId(semester.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedSemester.id === semester.id
                    ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                    : "border border-[color:var(--border)] text-[color:var(--foreground)]"
                }`}
              >
                {semester.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-[1.4rem] border border-[color:var(--border)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Exam Session</p>
            <p className="mt-3 text-lg">{selectedSemester.examSession}</p>
          </div>
          <div className="rounded-[1.4rem] border border-[color:var(--border)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">SGPA</p>
            <p className="mt-3 text-lg">{selectedSemester.sgpa.toFixed(2)}</p>
          </div>
          <div className="rounded-[1.4rem] border border-[color:var(--border)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">CGPA</p>
            <p className="mt-3 text-lg">{selectedSemester.cgpa?.toFixed(2) ?? "Not issued"}</p>
          </div>
          <div className="rounded-[1.4rem] border border-[color:var(--border)] px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Marks</p>
            <p className="mt-3 text-lg">
              {selectedSemester.marksObtained} / {selectedSemester.totalMarks}
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[color:var(--border)]">
          <div className="grid grid-cols-[1.1fr_0.55fr_0.55fr_0.55fr_0.55fr] bg-[color:var(--surface)] px-5 py-3 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            <span>Course</span>
            <span>Marks</span>
            <span>Grade</span>
            <span>Credits</span>
            <span>Points</span>
          </div>
          <div className="divide-y divide-[color:var(--border)]">
            {selectedSemester.courses.map((course) => (
              <div
                key={course.code}
                className="grid grid-cols-[1.1fr_0.55fr_0.55fr_0.55fr_0.55fr] gap-3 px-5 py-4 text-sm"
              >
                <div>
                  <p className="font-medium">{course.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[color:var(--muted)]">{course.code}</p>
                </div>
                <span>{course.marksObtained} / {course.maxMarks}</span>
                <span>{course.grade}</span>
                <span>{course.credits}</span>
                <span>{course.creditPoints.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Student Profile</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Name</p>
            <p className="mt-2">{profile.studentName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">University ID</p>
            <p className="mt-2">{profile.universityId}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Programme</p>
            <p className="mt-2">{profile.programmeName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Batch</p>
            <p className="mt-2">{profile.batch}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
