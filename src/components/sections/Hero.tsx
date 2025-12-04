"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="h-screen flex flex-col justify-center items-center relative overflow-hidden">
            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4">
                <div className="mb-6 overflow-hidden">
                    <motion.p
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="text-primary font-mono text-sm tracking-widest uppercase"
                    >
                        System Online
                    </motion.p>
                </div>

                <div className="overflow-hidden">
                    <TextReveal
                        text="DEEPESH"
                        className="text-6xl md:text-[12vw] leading-[0.8] font-bold font-display tracking-tighter text-white mix-blend-difference"
                        delay={0.1}
                    />
                </div>

                <div className="overflow-hidden">
                    <TextReveal
                        text="GUPTA"
                        className="text-6xl md:text-[12vw] leading-[0.8] font-bold font-display tracking-tighter text-transparent stroke-text"
                        delay={0.2}
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-8"
                >
                    <p className="max-w-md text-center text-muted-foreground font-light">
                        Turning complex data into intelligent solutions. Focused on LLMs, Agents, and Computer Vision.
                    </p>

                    <div className="flex gap-4">
                        <MagneticButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                            View Work
                        </MagneticButton>
                        <MagneticButton
                            className="bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"
                            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            Contact
                        </MagneticButton>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
}
