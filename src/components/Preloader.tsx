"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    const fullText = "INITIALIZING SYSTEM...";

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 1000);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-primary font-mono"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl md:text-2xl tracking-widest"
                        >
                            {text}
                            <span className="animate-pulse">_</span>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-1 bg-primary/20 rounded-full overflow-hidden"
                        >
                            <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
