"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import { Code2, Cpu, Globe, Zap } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function About() {
    return (
        <section className="py-32 px-4 bg-black relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <TextReveal
                        text="About Me"
                        className="text-5xl md:text-7xl font-display font-bold text-white"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bio Card - Large */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300 relative overflow-hidden group"
                        data-cursor="BENTO BOX DETECTED"
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-4 flex items-center gap-2" data-cursor="TEXT DETECTED">
                            <Globe className="text-primary" /> The Mission
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed" data-cursor="TEXT DETECTED">
                            {resume.about}
                        </p>
                    </motion.div>

                    {/* Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-primary hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300 flex flex-col justify-center items-center text-center"
                        data-cursor="BENTO BOX DETECTED"
                    >
                        <span className="text-6xl font-display font-bold text-primary mb-2" data-cursor="TEXT DETECTED">{resume.projects.length}+</span>
                        <span className="text-white font-medium" data-cursor="TEXT DETECTED">Projects Completed</span>
                    </motion.div>

                    {/* Tech Stack - Tall */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:row-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300"
                        data-cursor="BENTO BOX DETECTED"
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2" data-cursor="TEXT DETECTED">
                            <Code2 className="text-primary" /> Arsenal
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-mono text-white/50 mb-3 uppercase tracking-wider" data-cursor="TEXT DETECTED">Languages</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.languages.map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-sm text-white border border-white/5" data-cursor="TEXT DETECTED">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-mono text-white/50 mb-3 uppercase tracking-wider" data-cursor="TEXT DETECTED">Frameworks</h4>
                                <div className="flex flex-wrap gap-2">
                                    {resume.skills.frameworks.map(skill => (
                                        <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-sm text-white border border-white/5" data-cursor="TEXT DETECTED">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Focus Areas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-primary hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all duration-300"
                        data-cursor="BENTO BOX DETECTED"
                    >
                        <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-2" data-cursor="TEXT DETECTED">
                            <Cpu className="text-primary" /> Core Focus
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {resume.skills.domains.map((domain, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5" data-cursor="TEXT DETECTED">
                                    <Zap size={16} className="text-primary" />
                                    <span className="text-white font-medium">{domain}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
