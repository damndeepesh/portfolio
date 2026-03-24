"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import ThemeToggle from "./theme-toggle";

const capabilityGroups = [
  {
    title: "LLM & Retrieval",
    items:
      "RAG systems, LLM fine-tuning, prompt engineering, LangChain, LlamaIndex, Hugging Face, FAISS, Pinecone, and Chroma.",
  },
  {
    title: "Computer Vision",
    items:
      "OpenCV, YOLO, object detection, tracking pipelines, semantic chunking, and document intelligence workflows.",
  },
  {
    title: "ML Engineering & Cloud",
    items:
      "Python, SQL, FastAPI, Docker, Kubernetes, MLflow, GCP, Vertex AI, and Cloud Run deployment workflows.",
  },
  {
    title: "Data & Experimentation",
    items:
      "TensorFlow / Keras, Scikit-learn, XGBoost, Pandas, NumPy, Matplotlib, Seaborn, and Plotly.",
  },
];

const projects = [
  {
    title: "ComputerUSE",
    label: "AI computer control agent",
    description:
      "An autonomous agent that combines screen understanding with LLM reasoning to plan and execute UI actions.",
    stack: "Vision models, LLM planning, UI automation",
    href: "https://github.com/damndeepesh/ComputerUSE",
  },
  {
    title: "ResearchDigest",
    label: "AI research analysis platform",
    description:
      "Natural-language search and AI summarization for research papers, with semantic retrieval and automated insight extraction.",
    stack: "Hugging Face, semantic search, full-stack web architecture",
    href: "https://github.com/damndeepesh/ResearchDigest",
  },
  {
    title: "QuickTrack",
    label: "Real-time object detection",
    description:
      "A Streamlit application for YOLOv8-based object detection and tracking with interactive controls and exportable results.",
    stack: "YOLOv8, Streamlit, real-time inference",
    href: "https://github.com/damndeepesh/QuickTrack",
  },
  {
    title: "MultiPDF ChatBot",
    label: "Document intelligence system",
    description:
      "A LangChain-based RAG workflow for question answering across multiple PDFs using FAISS and semantic chunking.",
    stack: "LangChain, FAISS, PDF processing, retrieval pipelines",
    href: "https://github.com/damndeepesh/MultiPdfChatBot",
  },
];

const experiences = [
  {
    title: "AI Research Engineer Intern",
    company: "Magure India Pvt. Ltd.",
    period: "Feb 2026 – Present",
    description:
      "Working on applied AI research and intelligent systems with a focus on practical experimentation and product-oriented development.",
  },
  {
    title: "Localization Engineering Intern",
    company: "Andovar",
    period: "Jul 2024 to May 2025",
    description:
      "Automated file processing workflows across JSON, XML, TMX, PPTX, and DOCX, reducing manual work by 40% while improving delivery speed and consistency in localization pipelines.",
  },
];

const socials = [
  { label: "GitHub", href: "https://www.github.com/damndeepesh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/damndeepesh" },
  { label: "Kaggle", href: "https://www.kaggle.com/damndeepesh" },
  { label: "Email", href: "mailto:hello@deepeshgupta.dev" },
];

const sectionTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function PortfolioPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [emailCopied, setEmailCopied] = useState(false);
  const currentYear = new Date().getFullYear();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(
    heroScrollProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 56],
  );
  const heroOpacity = useTransform(
    heroScrollProgress,
    [0, 0.85],
    [1, shouldReduceMotion ? 1 : 0.45],
  );
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setShowLoader(false);
    }, shouldReduceMotion ? 250 : 2800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!emailCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setEmailCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [emailCopied]);

  useEffect(() => {
    const getTheme = () => {
      const savedTheme = window.localStorage.getItem("portfolio-theme");

      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    const updateTheme = () => {
      setResolvedTheme(getTheme());
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);
    window.addEventListener("storage", updateTheme);

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
      window.removeEventListener("storage", updateTheme);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@deepeshgupta.dev");
      setEmailCopied(true);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <main
      id="top"
      className="min-h-screen bg-[radial-gradient(circle_at_top,left_top,var(--surface),transparent_38%),var(--background)] text-[color:var(--foreground)]"
    >
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:var(--background)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="relative flex w-full max-w-2xl flex-col items-center px-8">
              <motion.img
                src="/deepesh-signature.svg"
                alt="Deepesh signature"
                className="relative z-10 w-full max-w-[38rem]"
                style={{ filter: resolvedTheme === "dark" ? "invert(1)" : "none" }}
                initial={{
                  opacity: 0,
                  clipPath: "inset(0 100% 0 0)",
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  clipPath: "inset(0 0% 0 0)",
                  y: 0,
                }}
                transition={{ duration: 1.75, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={
          shouldReduceMotion
            ? undefined
            : !showLoader
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(10px)" }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-[color:var(--foreground)]/70"
          style={{ scaleX: progressScaleX }}
        />
        <div aria-hidden="true" className="texture-overlay" />
        <section
          ref={heroRef}
          className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 lg:px-12"
        >
        <header className="flex items-center justify-between border-b border-[color:var(--border)] pb-5">
          <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
            Deepesh Gupta
          </p>
          <ThemeToggle />
        </header>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex flex-1 flex-col justify-center py-20 sm:py-24 lg:py-28"
        >
          <motion.p
            className="text-sm uppercase tracking-[0.32em] text-[color:var(--muted)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.05 }}
          >
            AI/ML Engineer
          </motion.p>
          <motion.h1
            className="mt-5 max-w-3xl text-[clamp(3.8rem,10vw,7.2rem)] font-semibold leading-[0.95] tracking-[-0.07em]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.12 }}
          >
            Deepesh
            <br />
            Gupta
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-[clamp(1.3rem,2vw,1.9rem)] leading-[1.35] tracking-[-0.03em] text-[color:var(--foreground)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.2 }}
          >
            Building practical AI systems across LLM applications, retrieval workflows, and computer vision.
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-base leading-8 text-[color:var(--muted)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.25 }}
          >
            Currently focused on object detection, active on Kaggle, and happiest building with coffee nearby and music in the background.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.28 }}
          >
            <motion.a
              href="mailto:hello@deepeshgupta.dev"
              className="inline-flex h-11 items-center rounded-full bg-[color:var(--foreground)] px-5 text-sm font-medium text-[color:var(--background)] transition hover:opacity-90"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              Get in touch
            </motion.a>
            <motion.a
              href="https://www.github.com/damndeepesh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium transition hover:border-[color:var(--foreground)]"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              View GitHub
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/damndeepesh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium transition hover:border-[color:var(--foreground)]"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              LinkedIn
            </motion.a>
            <motion.a
              href="/resume"
              className="inline-flex h-11 items-center rounded-full border border-[color:var(--border)] px-5 text-sm font-medium transition hover:border-[color:var(--foreground)]"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
            >
              Resume
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-6 border-t border-[color:var(--border)] pt-8 lg:grid-cols-[1.1fr_0.9fr]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ ...sectionTransition, delay: 0.34 }}
          >
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Currently
              </p>
              <div className="mt-4 grid gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Role
                  </p>
                  <p className="mt-1 text-base leading-7">
                    AI Research Engineer at Magure India Pvt. Ltd.
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Focus
                  </p>
                  <p className="mt-1 text-base leading-7">
                    Object detection, practical AI systems, and applied ML workflows
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Outside work
                  </p>
                  <p className="mt-1 text-base leading-7">
                    Kaggle experiments, coffee, and music
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Background
                </p>
                <p className="mt-3 max-w-xs text-base leading-7">
                  B.Tech in Computer Science (AI & ML), KK Modi University
                </p>
              </div>
              <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-6 py-6">
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  Availability
                </p>
                <p className="mt-3 max-w-xs text-base leading-7">
                  Open to AI/ML engineering and applied LLM roles
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </section>

        <motion.section
          className="border-t border-[color:var(--border)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={sectionTransition}
        >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
              About
            </p>
          </div>
          <div className="space-y-10">
            <p className="max-w-4xl text-[clamp(1.8rem,3vw,3rem)] leading-[1.2] tracking-[-0.04em] text-balance">
              AI/ML engineer specializing in computer vision and generative AI.
            </p>
            <p className="max-w-3xl text-lg leading-9 text-[color:var(--muted)]">
              I&apos;ve worked across object detection, RAG systems, document intelligence, and research-oriented AI tooling. My focus is building practical systems that combine strong experimentation with production-minded engineering.
            </p>
          </div>
        </div>
        </motion.section>

        <motion.section
          className="border-t border-[color:var(--border)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
        >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Experience
            </p>
          </div>
          <div className="grid max-w-4xl gap-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.company}-${experience.title}`}
                className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-7 py-8 sm:px-9"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "var(--foreground)",
                        backgroundColor: "var(--surface)",
                      }
                }
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...sectionTransition, delay: shouldReduceMotion ? 0 : index * 0.08 }}
              >
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(220px,0.9fr)] lg:items-start">
                  <h2 className="max-w-[18ch] text-[clamp(1.8rem,2.6vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.04em]">
                    {experience.title}
                  </h2>
                  <p className="max-w-[18rem] text-sm leading-7 text-[color:var(--muted)] lg:justify-self-end lg:text-right">
                    {experience.company} · {experience.period}
                  </p>
                </div>
                <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
                  {experience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.section>

        <motion.section
          className="border-t border-[color:var(--border)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
        >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Projects
            </p>
          </div>
          <div className="grid gap-8">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-7 py-8 sm:px-9"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        borderColor: "var(--foreground)",
                        backgroundColor: "var(--surface)",
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...sectionTransition }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-medium tracking-[-0.03em]">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                      {project.label}
                    </p>
                  </div>
                </div>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                  {project.description}
                </p>
                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {project.stack}
                  </p>
                  <motion.a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm uppercase tracking-[0.18em] text-[color:var(--foreground)] transition hover:text-[color:var(--muted)]"
                    whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                  >
                    View GitHub
                    <motion.span
                      className="ml-2 inline-block"
                      whileHover={shouldReduceMotion ? undefined : { x: 2 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        </motion.section>

        <motion.section
          className="border-t border-[color:var(--border)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
        >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Capabilities
            </p>
          </div>
          <div className="grid gap-8">
            {capabilityGroups.map((group, index) => (
              <motion.div
                key={group.title}
                className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--panel)] px-7 py-8 sm:px-9"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                        borderColor: "var(--foreground)",
                        backgroundColor: "var(--surface)",
                      }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{ ...sectionTransition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              >
                <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  {group.title}
                </p>
                <p className="mt-4 max-w-3xl text-xl leading-9 tracking-[-0.02em]">
                  {group.items}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        </motion.section>

        <motion.section
          className="border-t border-[color:var(--border)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={sectionTransition}
        >
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-6 py-24 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12 lg:py-32">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Contact
            </p>
          </div>
          <div className="space-y-8">
            <p className="max-w-4xl text-[clamp(1.8rem,3vw,3rem)] leading-[1.2] tracking-[-0.04em] text-balance">
              Available for AI/ML engineering roles, applied LLM work, and intelligent product builds.
            </p>
            <p className="max-w-3xl text-lg leading-9 text-[color:var(--muted)]">
              Working on LLMs, retrieval systems, document intelligence, or computer vision? Let&apos;s connect.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-3 md:flex-nowrap">
              <motion.button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex h-11 shrink-0 items-center rounded-full bg-[color:var(--foreground)] px-4 text-sm font-medium text-[color:var(--background)] transition hover:opacity-90"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={sectionTransition}
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
              >
                {emailCopied ? "Email copied" : "hello@deepeshgupta.dev"}
              </motion.button>
              {socials.slice(0, 3).map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 shrink-0 items-center rounded-full border border-[color:var(--border)] px-4 text-sm font-medium transition hover:border-[color:var(--foreground)]"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ ...sectionTransition, delay: shouldReduceMotion ? 0 : (index + 1) * 0.06 }}
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        </motion.section>

        <footer className="border-t border-[color:var(--border)]">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[0.64fr_0.36fr] lg:items-end lg:px-12">
            <div>
              <p className="text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.06em]">
                DG
              </p>
              <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--muted)]">
                Coffee | Music | Research
              </p>
              <p className="mt-5 text-sm text-[color:var(--muted)]">
                © {currentYear} Deepesh Gupta. All rights reserved.
              </p>
            </div>
            <motion.div
              className="grid gap-3 text-sm text-[color:var(--muted)] lg:justify-items-end"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ ...sectionTransition, delay: 0.08 }}
            >
              <p>Based in India</p>
              <p>Open to opportunities</p>
              <a
                href="#top"
                className="text-[color:var(--foreground)] transition hover:text-[color:var(--muted)]"
              >
                Back to top
              </a>
            </motion.div>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
