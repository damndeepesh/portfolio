import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deepesh Gupta | AI/ML Engineer",
  description:
    "Portfolio of Deepesh Gupta, also known as damndeepesh, focused on generative AI, document intelligence, and computer vision systems.",
  icons: {
    icon: "/icon.svg",
  },
  metadataBase: new URL("https://deepeshgupta.dev"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Deepesh Gupta",
    "damndeepesh",
    "AI/ML Engineer",
    "Computer Vision",
    "Object Detection",
    "RAG Systems",
    "Document Intelligence",
    "Kaggle",
  ],
  openGraph: {
    title: "Deepesh Gupta | AI/ML Engineer",
    description:
      "Portfolio of Deepesh Gupta, also known as damndeepesh, featuring AI/ML engineering work across computer vision, RAG systems, and practical AI products.",
    url: "https://deepeshgupta.dev",
    siteName: "Deepesh Gupta Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Deepesh Gupta | AI/ML Engineer",
    description:
      "Portfolio of Deepesh Gupta, also known as damndeepesh, featuring computer vision, RAG systems, document intelligence, and practical AI engineering work.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
