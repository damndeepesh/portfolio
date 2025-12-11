"use client";

import { motion } from "framer-motion";
import { resume } from "@/data/resume";
import MagneticButton from "@/components/ui/MagneticButton";
import BookMeeting from "@/components/BookMeeting";
import { ArrowUpRight } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function Contact() {
    return (
        <section id="contact" className="min-h-screen flex flex-col justify-between py-20 px-4 bg-black relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <p className="text-primary font-mono mb-8 tracking-widest uppercase">What's Next?</p>
                    <div className="mb-12">
                        <TextReveal text="LET'S WORK" className="text-[10vw] leading-[0.8] font-bold font-display tracking-tighter text-white block" />
                        <TextReveal text="TOGETHER" className="text-[10vw] leading-[0.8] font-bold font-display tracking-tighter text-white/20 block" delay={0.2} />
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <a href={`mailto:${resume.contact.email}`} className="cursor-hover" suppressHydrationWarning>
                            <MagneticButton className="h-16 px-8 text-lg bg-primary text-white border-none hover:bg-white hover:text-black">
                                Email Me
                            </MagneticButton>
                        </a>
                        <BookMeeting />
                        <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="cursor-hover" suppressHydrationWarning>
                            <MagneticButton className="h-16 px-8 text-lg bg-transparent border border-white/20 text-white hover:bg-white hover:text-black">
                                LinkedIn <ArrowUpRight className="ml-2" />
                            </MagneticButton>
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground text-sm">
                <p>© {new Date().getFullYear()} Deepesh Gupta. All rights reserved.</p>
                <div className="flex gap-8">
                    <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover" suppressHydrationWarning>Github</a>
                    <a href={resume.contact.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover" suppressHydrationWarning>Twitter</a>
                    <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover" suppressHydrationWarning>LinkedIn</a>
                </div>
            </div>
        </section>
    );
}
