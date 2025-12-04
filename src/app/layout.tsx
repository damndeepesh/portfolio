import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CinematicGrain from "@/components/CinematicGrain";
import NeuralChatbot from "@/components/NeuralChatbot";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import SourceCodeTyper from "@/components/SourceCodeTyper";
import EncryptedMode from "@/components/EncryptedMode";
import AITakeover from "@/components/AITakeover";
import HiddenResume from "@/components/HiddenResume";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepesh Gupta",
  description: "Portfolio of Deepesh Gupta, an AI/ML Engineer specializing in deep learning and intelligent systems.",
};

import { LockdownProvider } from "@/context/LockdownContext";
import LockdownOverlay from "@/components/LockdownOverlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-black text-white antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white`}
      >
        <LockdownProvider>
          <LockdownOverlay />
          <CinematicGrain />
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            <NeuralChatbot />
            <ConsoleEasterEgg />
            <SourceCodeTyper />
            <EncryptedMode />
            <AITakeover />
            <HiddenResume />
            {children}
          </SmoothScroll>
        </LockdownProvider>
      </body>
    </html>
  );
}
