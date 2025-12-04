"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FAKE_CODE = `
// INITIATING SYSTEM CORE...
// LOADING NEURAL INTERFACE...

import { Consciousness } from '@universe/mind';
import { Reality } from '@physics/spacetime';

class DeepeshPortfolio extends Reality {
  constructor() {
    super();
    this.skills = ['AI', 'ML', 'FullStack', 'SystemDesign'];
    this.passion = Infinity;
    this.coffeeLevel = 100;
  }

  async init() {
    console.log("Welcome to the matrix...");
    await this.loadAssets();
    await this.connectNeuralNet();
    
    // Optimizing for maximum awesomeness
    this.optimizeUX();
  }

  optimizeUX() {
    return "Experience Unlocked";
  }
}

// DECRYPTING USER DATA...
// ACCESS GRANTED.

export default new DeepeshPortfolio();
`;

export default function SourceCodeTyper() {
    const [isOpen, setIsOpen] = useState(false);
    const [displayedCode, setDisplayedCode] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "?" && !isOpen) {
                setIsOpen(true);
                setDisplayedCode("");
                setCurrentIndex(0);
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && currentIndex < FAKE_CODE.length) {
            const timeout = setTimeout(() => {
                setDisplayedCode((prev) => prev + FAKE_CODE[currentIndex]);
                setCurrentIndex((prev) => prev + 1);

                // Auto-scroll to bottom
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, 20); // Typing speed

            return () => clearTimeout(timeout);
        }
    }, [isOpen, currentIndex]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[200] bg-black/95 text-green-500 font-mono p-8 overflow-hidden"
                >
                    <div className="max-w-4xl mx-auto h-full flex flex-col relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-0 right-0 p-2 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex-1 overflow-auto mt-12" ref={containerRef}>
                            <pre className="whitespace-pre-wrap text-lg md:text-xl">
                                {displayedCode}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-3 h-6 bg-green-500 ml-1 align-middle"
                                />
                            </pre>
                        </div>

                        <div className="mt-4 text-sm text-green-500/50 text-center">
                            PRESS ESC TO CLOSE
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
