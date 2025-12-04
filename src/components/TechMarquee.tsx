"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";

export default function TechMarquee() {
    const allSkills = [
        ...resume.skills.languages,
        ...resume.skills.frameworks,
        ...resume.skills.tools,
        ...resume.skills.domains
    ];

    // Duplicate the list to create a seamless loop
    const marqueeItems = [...allSkills, ...allSkills, ...allSkills];

    return (
        <section className="py-20 bg-black overflow-hidden border-y border-white/5 relative z-20">
            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

                <motion.div
                    className="flex gap-16 w-max"
                    animate={{ x: "-33.33%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeItems.map((skill, index) => (
                        <div key={`${skill}-${index}`} className="flex items-center gap-16">
                            <span
                                className="text-4xl md:text-6xl font-display font-bold text-transparent stroke-text hover:text-primary transition-colors cursor-default whitespace-nowrap uppercase tracking-tighter"
                                style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)" }}
                            >
                                {skill}
                            </span>
                            <span className="text-primary/20 text-2xl">✦</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
