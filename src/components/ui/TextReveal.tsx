"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function TextReveal({ text, className, delay = 0, style }: TextRevealProps & { style?: React.CSSProperties }) {
    const [display, setDisplay] = useState(text.split("").map(() => "0").join("")); // Stable initial state
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (isInView && !hasAnimated.current) {
            hasAnimated.current = true;
            let iteration = 0;

            // Initial delay
            setTimeout(() => {
                const interval = setInterval(() => {
                    setDisplay(
                        text
                            .split("")
                            .map((letter, index) => {
                                if (index < iteration) {
                                    return text[index];
                                }
                                return chars[Math.floor(Math.random() * chars.length)];
                            })
                            .join("")
                    );

                    if (iteration >= text.length) {
                        clearInterval(interval);
                    }

                    iteration += 1 / 3; // Controls speed
                }, 30);
            }, delay * 1000);
        }
    }, [isInView, text, delay]);

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block font-display font-bold", className)}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay }}
            style={style}
        >
            {display}
        </motion.span>
    );
}
