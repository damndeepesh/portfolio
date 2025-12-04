"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gradesData } from "@/data/grades";
import { Lock, Unlock, ChevronDown, ChevronUp, Award, TrendingUp, BookOpen } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

export default function ResultPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [expandedSem, setExpandedSem] = useState<number | null>(null);

    const validPasswords = ["Deepesh1910@#", "4ugmrnxxfu", "result", "damndeepesh"];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (validPasswords.includes(password)) {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setPassword("");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-center text-white mb-2">Restricted Access</h1>
                    <p className="text-white/50 text-center mb-8">Enter authentication key to view academic records.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                                autoFocus
                            />
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm text-center">Access Denied: Invalid Key</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/80 transition-colors"
                        >
                            Authenticate
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <TextReveal text="Academic Performance" className="text-4xl md:text-6xl font-display font-bold text-white mb-4 justify-center" />
                    <p className="text-white/50">Bachelor of Computer Science • KK Modi University</p>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm uppercase tracking-wider">CGPA</p>
                            <p className="text-3xl font-display font-bold text-white" data-cursor="NUMERIC VALUE">{gradesData.cgpa}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Total Credits</p>
                            <p className="text-3xl font-display font-bold text-white" data-cursor="NUMERIC VALUE">{gradesData.totalCredits}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4"
                    >
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm uppercase tracking-wider">Status</p>
                            <p className="text-3xl font-display font-bold text-white">Graduated</p>
                        </div>
                    </motion.div>
                </div>

                {/* Performance Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl mb-12"
                >
                    <h3 className="text-xl font-display font-bold text-white mb-8">SGPA Progression</h3>
                    <div className="h-64 flex items-end justify-between gap-2 md:gap-4">
                        {gradesData.semesters.map((sem, i) => (
                            <div key={sem.id} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="relative w-full flex justify-center items-end h-48">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(sem.sgpa / 10) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                        className="w-full max-w-[40px] bg-white/10 rounded-t-lg group-hover:bg-primary transition-colors relative"
                                        data-cursor="GRADE GRAPH"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {sem.sgpa}
                                        </div>
                                    </motion.div>
                                </div>
                                <span className="text-white/50 text-xs md:text-sm">Sem {sem.id}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Detailed Semesters */}
                <div className="space-y-4">
                    <h3 className="text-xl font-display font-bold text-white mb-6">Detailed Breakdown</h3>
                    {gradesData.semesters.map((sem, i) => (
                        <motion.div
                            key={sem.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedSem(expandedSem === sem.id ? null : sem.id)}
                                className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white font-bold font-mono">
                                        {sem.id}
                                    </div>
                                    <div className="text-left">
                                        <h4 className="text-white font-bold">Semester {sem.id}</h4>
                                        <p className="text-white/50 text-sm">SGPA: <span className="text-primary" data-cursor="NUMERIC VALUE">{sem.sgpa}</span> • Credits: {sem.credits}</p>
                                    </div>
                                </div>
                                {expandedSem === sem.id ? <ChevronUp className="text-white/50" /> : <ChevronDown className="text-white/50" />}
                            </button>

                            <AnimatePresence>
                                {expandedSem === sem.id && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 border-t border-white/10">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/10">
                                                            <th className="py-3 font-medium">Code</th>
                                                            <th className="py-3 font-medium">Subject</th>
                                                            <th className="py-3 font-medium text-center">Marks</th>
                                                            <th className="py-3 font-medium text-center">Credits</th>
                                                            <th className="py-3 font-medium text-center">Grade</th>
                                                            <th className="py-3 font-medium text-center">Points</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {sem.subjects.map((sub, idx) => (
                                                            <tr key={`${sub.code}-${idx}`} className="border-b border-white/5 last:border-0 text-white/80 text-sm hover:bg-white/5 transition-colors">
                                                                <td className="py-3 font-mono text-white/50" data-cursor="COURSE CODE">{sub.code}</td>
                                                                <td className="py-3 font-medium" data-cursor="TEXT DETECTED">{sub.name}</td>
                                                                <td className="py-3 text-center font-mono text-white/70" data-cursor="NUMERIC VALUE">{sub.marks}</td>
                                                                <td className="py-3 text-center" data-cursor="NUMERIC VALUE">{sub.credits}</td>
                                                                <td className="py-3 text-center">
                                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${sub.grade === 'O' || sub.grade === 'A+' ? 'bg-green-500/20 text-green-400' :
                                                                        sub.grade === 'A' || sub.grade === 'B+' ? 'bg-blue-500/20 text-blue-400' :
                                                                            'bg-white/10 text-white'
                                                                        }`}>
                                                                        {sub.grade}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 text-center font-mono" data-cursor="NUMERIC VALUE">{sub.points}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
