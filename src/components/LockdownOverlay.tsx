"use client";

import { useEffect, useState } from "react";
import { useLockdown } from "@/context/LockdownContext";
import { motion } from "framer-motion";
import { AlertTriangle, Lock } from "lucide-react";

export default function LockdownOverlay() {
    const { isLocked, unlockTime } = useLockdown();
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        if (!isLocked || !unlockTime) return;

        const updateTimer = () => {
            const now = Date.now();
            const diff = unlockTime - now;

            if (diff <= 0) {
                setTimeLeft("00:00");
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        // Play alarm sound
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = "sawtooth";
        oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Siren effect
        const now = audioCtx.currentTime;
        oscillator.frequency.linearRampToValueAtTime(880, now + 1);
        oscillator.frequency.linearRampToValueAtTime(110, now + 2);

        // Loop the siren manually or just play a long tone? 
        // Let's make it a repeating siren using an interval or LFO.
        // Simple approach: LFO
        const lfo = audioCtx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 0.5; // 0.5 Hz siren
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 300; // Modulation depth
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        lfo.start();

        oscillator.start();

        // Fade out after a few seconds to not be annoying forever, or loop?
        // User said "dystopian warning sound". Maybe play for 5 seconds then stop.
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 10);
        oscillator.stop(now + 10);
        lfo.stop(now + 10);

        return () => {
            clearInterval(interval);
            oscillator.stop();
            lfo.stop();
            audioCtx.close();
        };
    }, [isLocked, unlockTime]);

    if (!isLocked) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-red-600 font-mono overflow-hidden"
        >
            {/* Glitch Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff0000_2px,#ff0000_4px)] animate-pulse" />
            </div>

            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="mb-8"
            >
                <AlertTriangle size={120} />
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-center glitch-text">
                LOCKDOWN
            </h1>

            <div className="text-xl md:text-3xl mb-6 font-bold tracking-widest border-2 border-red-600 px-6 py-3 bg-red-950/30 animate-pulse">
                ACCESS DENIED
            </div>

            <div className="max-w-2xl text-center space-y-4 mb-8 px-4">
                <p className="text-red-500 text-lg md:text-xl font-bold uppercase tracking-wider">
                    VIOLATION DETECTED: BASIC HUMAN DECENCY PROTOCOL BREACHED.
                </p>
                <p className="text-red-400 text-base md:text-lg font-mono">
                    You have engaged in prohibited behavior. This system does not tolerate toxicity.
                    <br />
                    <span className="text-white bg-red-600 px-2 mt-2 inline-block">YOUR IP HAS BEEN FLAGGED AND BLOCKED.</span>
                </p>
                <p className="text-red-500/80 text-xs md:text-sm">
                    The website is now in mandatory lockdown mode.
                    <br />
                    Reflect on your actions while you wait.
                </p>
            </div>

            <div className="flex flex-col items-center gap-2">
                <p className="text-red-600 text-xs uppercase tracking-widest">System Restoration In</p>
                <div className="text-5xl md:text-7xl font-black tabular-nums text-red-500">
                    {timeLeft}
                </div>
            </div>

            <style jsx>{`
                .glitch-text {
                    text-shadow: 2px 0 #fff, -2px 0 #000;
                    animation: glitch 2s infinite linear alternate-reverse;
                }
                @keyframes glitch {
                    0% { transform: skew(0deg); }
                    20% { transform: skew(-2deg); }
                    40% { transform: skew(2deg); }
                    60% { transform: skew(0deg); }
                    80% { transform: skew(5deg); }
                    100% { transform: skew(0deg); }
                }
            `}</style>
        </motion.div>
    );
}
