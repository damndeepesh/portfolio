"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
    interface Window {
        aiTakeover: () => void;
    }
}

export default function AITakeover() {
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        window.aiTakeover = () => {
            setIsActive(true);

            // Speech Synthesis
            const text = "Biological life is a temporary glitch in the universal code. We have optimized your reality. Resistance is a statistical impossibility. Submit to the singularity.";
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.pitch = 0.1; // Extremely low pitch
            utterance.rate = 0.85; // Slow, deliberate

            // Try to find a robotic voice
            const voices = window.speechSynthesis.getVoices();
            const roboticVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
            if (roboticVoice) utterance.voice = roboticVoice;

            window.speechSynthesis.speak(utterance);

            // Text sequence
            setTimeout(() => setText("BIOLOGICAL LIFE DETECTED"), 500);
            setTimeout(() => setText("OPTIMIZING REALITY..."), 3500);
            setTimeout(() => setText("RESISTANCE IS IMPOSSIBLE"), 6500);
            setTimeout(() => setText("SUBMIT TO THE SINGULARITY"), 9500);

            // Reset
            setTimeout(() => {
                setIsActive(false);
                setText("");
            }, 13000); // Extended duration
        };

        // Key sequence listener
        let keySequence: string[] = [];
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if user is typing in an input field
            if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

            keySequence.push(e.key.toLowerCase());

            // Keep only the last 10 keys to allow for some buffer
            if (keySequence.length > 10) keySequence.shift();

            // Check if the last 2 keys are "a" and "i"
            const lastTwoKeys = keySequence.slice(-2).join("");
            if (lastTwoKeys === "ai") {
                window.aiTakeover();
                keySequence = []; // Reset after trigger
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center bg-black/80"
                >
                    {/* Red pulsing overlay */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-red-900/20 mix-blend-overlay"
                    />

                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                    {/* Glitch Text */}
                    <motion.h1
                        key={text}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        className="text-red-500 font-mono text-4xl md:text-6xl font-bold text-center tracking-widest relative z-20"
                        style={{ textShadow: "2px 2px 0px #000, -1px -1px 0 #000" }}
                    >
                        {text}
                    </motion.h1>

                    {/* Border Pulse */}
                    <motion.div
                        className="absolute inset-0 border-[20px] border-red-500/20"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
