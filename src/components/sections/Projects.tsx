"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-4 bg-black relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 border-b border-white/10 pb-8 flex justify-between items-end">
                    <div className="flex flex-col">
                        <TextReveal text="Selected" className="text-5xl md:text-7xl font-display font-bold text-white" />
                        <TextReveal text="Works" className="text-5xl md:text-7xl font-display font-bold text-white" delay={0.2} />
                    </div>
                    <p className="text-muted-foreground max-w-xs text-right hidden md:block">
                        A collection of projects defining my journey in AI & Engineering.
                    </p>
                </div>

                <div className="flex flex-col">
                    {resume.projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            suppressHydrationWarning
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative border-b border-white/10 py-12 cursor-pointer transition-colors hover:bg-white/5 px-4 block"
                            data-cursor="GITHUB REPO DETECTED"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                <h3 className="text-3xl md:text-5xl font-display font-bold text-white group-hover:text-primary transition-colors" data-cursor="TEXT DETECTED">
                                    {project.title}
                                </h3>

                                <div className="flex flex-col md:items-end gap-2">
                                    <p className="text-muted-foreground md:text-right max-w-md" data-cursor="TEXT DETECTED">
                                        {project.description}
                                    </p>
                                    <div className="flex gap-2">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs border border-white/10 px-2 py-1 rounded-full text-white/60" data-cursor="TEXT DETECTED">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <ArrowUpRight className="absolute top-1/2 right-4 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2 duration-300" size={32} />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
