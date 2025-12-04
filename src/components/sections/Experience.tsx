"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { resume } from "@/data/resume";
import { Plus, Minus } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function Experience() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 px-4 bg-black relative z-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-20">
                    <TextReveal text="Experience" className="text-5xl md:text-7xl font-display font-bold text-white" />
                </div>

                <div className="space-y-4">
                    {resume.experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border-b border-white/10 pb-4"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between py-6 group text-left"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                    <span className="text-primary font-mono text-sm tracking-wider">{job.period}</span>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-primary transition-colors">
                                        {job.company}
                                    </h3>
                                </div>
                                <div className="relative">
                                    <Plus className={`text-white transition-transform duration-300 ${openIndex === index ? "rotate-45 opacity-0" : "opacity-100"}`} />
                                    <Minus className={`text-white absolute top-0 left-0 transition-transform duration-300 ${openIndex === index ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"}`} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pt-2">
                                            <h4 className="text-xl text-white mb-4">{job.role}</h4>
                                            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                                                {job.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
