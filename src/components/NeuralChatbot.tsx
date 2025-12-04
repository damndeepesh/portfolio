"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { resume } from "@/data/resume";
import { gradesData } from "@/data/grades";

type Message = {
    role: "user" | "assistant";
    content: string;
};

import { useLockdown } from "@/context/LockdownContext";

export default function NeuralChatbot() {
    const { triggerLockdown } = useLockdown();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm Deepesh's Neural Assistant. Ask me anything about his skills, projects, or academic performance." }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;

        // Check for profanity immediately
        // Check for profanity immediately
        const badWords = [
            "fuck", "shit", "bitch", "asshole", "cunt", "dick", "pussy", "bastard", "whore", "slut",
            "cock", "motherfucker", "tits", "boobs", "wanker", "bollocks", "arsehole", "prick", "twat",
            "dyke", "faggot", "nigger", "kike", "chink", "spic", "wetback", "skank", "hoe",
            "cum", "jizz", "sex", "porn", "xxx", "nsfw",
            "kill yourself", "kys", "suicide", "rape", "murder", "terrorist", "bomb",
            "nazi", "hitler", "retard", "idiot", "stupid", "dumb"
        ];

        // Use regex to check for whole words to avoid false positives (e.g., "studied" containing "die")
        const isProfane = badWords.some(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            return regex.test(userMessage);
        });

        // specific check for "die" as a standalone word, as it was causing issues
        if (isProfane || /\bdie\b/i.test(userMessage)) {
            triggerLockdown();
            return;
        }

        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsTyping(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const response = generateResponse(userMessage, messages);
            setMessages(prev => [...prev, { role: "assistant", content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    const generateResponse = (query: string, history: Message[]): string => {
        try {
            const q = query.toLowerCase();
            const lastMessage = history.length > 0 ? history[history.length - 1].content.toLowerCase() : "";

            // 1. Identity & Greetings
            if (q.includes("who is damndeepesh")) {
                return "'damndeepesh' is the online handle/username Deepesh uses for his GitHub, LinkedIn, and other developer profiles. It's his digital identity.";
            }
            if (q.match(/\b(who is deepesh|who is he|tell me about deepesh)\b/)) {
                return `${resume.about} He is passionate about building scalable AI systems and solving complex problems.`;
            }
            if (q.match(/\b(who are you|what is this|bot|ai|assistant)\b/)) {
                return "I am Deepesh's Neural Assistant, a custom-built AI running directly in your browser. I have full access to his professional background, skills, project portfolio, and academic records. Ask me anything!";
            }
            if (q.match(/\b(hi|hello|hey|greetings|sup)\b/)) {
                return "Hello! I'm online and ready. You can ask me about Deepesh's 'projects', 'tech stack', 'experience', or his 'grades' and 'CGPA'.";
            }

            // 2. Academic / Grades (NEW)
            if (q.match(/\b(cgpa|gpa|grade|score|marks|academic|result|performance)\b/)) {
                return `Deepesh has a **CGPA of ${gradesData.cgpa}** with a total of **${gradesData.totalCredits} Credits**. \n\nYou can ask about specific semesters, e.g., "How was semester 1?" or "Show me semester 7 grades".`;
            }

            // Semester specific queries
            const semMatch = q.match(/semester\s*(\d+)|sem\s*(\d+)/);
            if (semMatch) {
                const semId = parseInt(semMatch[1] || semMatch[2]);
                const semester = gradesData.semesters.find(s => s.id === semId);

                if (semester) {
                    const subjects = semester.subjects.map(s => `• ${s.name} (${s.grade})`).join("\n");
                    return `**Semester ${semId} Performance**:\nSGPA: **${semester.sgpa}**\n\nSubjects:\n${subjects}`;
                } else {
                    return `I couldn't find records for Semester ${semId}. Deepesh has records for Semesters 1-8.`;
                }
            }

            // Contextual follow-up for "what about semester X?"
            if (q.match(/what about semester (\d+)|what about sem (\d+)/)) {
                const semId = parseInt(q.match(/(\d+)/)![0]);
                const semester = gradesData.semesters.find(s => s.id === semId);
                if (semester) {
                    const subjects = semester.subjects.map(s => `• ${s.name} (${s.grade})`).join("\n");
                    return `**Semester ${semId} Performance**:\nSGPA: **${semester.sgpa}**\n\nSubjects:\n${subjects}`;
                }
            }


            // 3. Domain Expertise (AI/ML/GenAI)
            if (q.match(/\b(ai|ml|genai|generative ai|machine learning|artificial intelligence|llm|computer vision)\b/)) {
                return "Yes, absolutely! Deepesh is a specialized **AI/ML Engineer**. He knows everything from **Machine Learning** to **Generative AI**, including **Large Language Models (LLMs)**, **Computer Vision**, and **RAG Systems**. He builds end-to-end intelligent systems.";
            }

            // 4. Contact & Socials (Specific User Request)
            if (q.includes("linkedin")) {
                return `You can connect with Deepesh on LinkedIn here: ${resume.contact.linkedin}`;
            }
            if (q.includes("github")) {
                return `Check out his code repositories on GitHub: ${resume.contact.github}`;
            }
            if (q.match(/\b(contact|email|reach|hire)\b/)) {
                return `The best way to reach Deepesh is via email at ${resume.contact.email}. You can also find him on LinkedIn: ${resume.contact.linkedin}`;
            }

            // 4. Dynamic Project Search
            // Check if the user is asking about a specific project by name
            const matchedProject = resume.projects.find(p => q.includes(p.title.toLowerCase()));
            if (matchedProject) {
                return `**${matchedProject.title}**: ${matchedProject.description} \n\n🛠 **Tech Stack**: ${matchedProject.tech.join(", ")}. \n🔗 [View Project](${matchedProject.link})`;
            }

            // 5. General Project Inquiries
            if (q.match(/\b(project|projects|work|portfolio|build|built)\b/)) {
                const projectNames = resume.projects.map(p => p.title).join(", ");
                return `Deepesh has built several impactful projects, including: **${projectNames}**. \n\nAsk me about a specific one, for example: "Tell me about ${resume.projects[0].title}".`;
            }

            // 6. Skills & Technologies (Deep Search)
            // Check if the query mentions any skill from the resume
            const allSkills = [
                ...resume.skills.languages,
                ...resume.skills.frameworks,
                ...resume.skills.tools,
                ...resume.skills.domains
            ];
            const matchedSkill = allSkills.find(skill => q.includes(skill.toLowerCase()));

            if (matchedSkill) {
                return `Yes, Deepesh is proficient in **${matchedSkill}**. It's part of his core stack, which includes ${resume.skills.languages.slice(0, 3).join(", ")} and frameworks like ${resume.skills.frameworks.slice(0, 3).join(", ")}.`;
            }

            if (q.match(/\b(skill|stack|tech|technologies|language|framework|tool)\b/)) {
                return `**Core Stack**: ${resume.skills.languages.join(", ")}.\n**Frameworks**: ${resume.skills.frameworks.join(", ")}.\n**Domains**: ${resume.skills.domains.join(", ")}.`;
            }

            // 7. Experience
            if (q.match(/\b(experience|job|work|company|career|intern|internship)\b/)) {
                const latest = resume.experience[0];
                return `Deepesh is currently a **${latest.role}** at **${latest.company}** (${latest.period}). \n\nHe focuses on: ${latest.description}`;
            }

            // 8. Education
            if (q.match(/\b(study|studied|education|college|university|degree|school|bachelor|master)\b/)) {
                // @ts-ignore
                const edu = (resume as any).education[0];
                return `Deepesh completed his **${edu.degree}** from **${edu.institution}**, ${edu.location}. \n\nHe graduated with a **CGPA of ${gradesData.cgpa}**.`;
            }

            // 9. Resume / CV
            if (q.match(/\b(resume|cv|download)\b/)) {
                return "You can view his full professional background on this site, or check the 'About' section for a summary. (PDF download coming soon!)";
            }

            // 10. Fun / Easter Eggs
            if (q.includes("gravity")) {
                return "Ah, you found the gravity command? Type `gravity()` in the console to see the world crumble.";
            }
            if (q.includes("secret")) {
                return "There are secrets hidden everywhere. Try typing 'ai' on your keyboard...";
            }

            // Fallback
            return "I'm analyzing your query... I can tell you about Deepesh's **projects**, **skills**, **experience**, or his **academic grades**. What would you like to know?";

        } catch (error) {
            console.error("Neural Chatbot Error:", error);
            return "⚠️ **System Error**: Neural link unstable. My logic processors encountered an unexpected anomaly. Please try asking something else.";
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-4 md:right-8 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-black/90 border border-primary/30 backdrop-blur-xl rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-primary/10">
                            <div className="flex items-center gap-2">
                                <Bot className="text-primary" size={20} />
                                <span className="font-display font-bold text-white">Neural Companion</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 neural-scrollbar" data-lenis-prevent>
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-primary text-white rounded-br-none"
                                        : "bg-white/10 text-white/90 rounded-bl-none border border-white/5"
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-black/50">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask about Deepesh..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2 bg-primary rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/80 transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-4 md:right-8 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,85,0,0.5)] z-50 hover:shadow-[0_0_30px_rgba(255,85,0,0.8)] transition-shadow"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>

            <style jsx global>{`
                .neural-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .neural-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .neural-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 85, 0, 0.5);
                    border-radius: 10px;
                }
                .neural-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 85, 0, 0.8);
                }
            `}</style>
        </>
    );
}
