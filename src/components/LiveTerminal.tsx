"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function LiveTerminal() {
    const [lines, setLines] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const commands = [
            "> python train_model.py --epochs 100 --batch_size 32",
            "Initializing Neural Network...",
            "Loading dataset: Deepesh_Portfolio_Data.csv",
            "Dataset loaded: 10,000 samples",
            "Compiling model architecture...",
            "Model: Transformer-based LLM",
            "Starting training process...",
            "Epoch 1/100 - loss: 0.4523 - accuracy: 0.8210",
            "Epoch 2/100 - loss: 0.3812 - accuracy: 0.8540",
            "Epoch 3/100 - loss: 0.3105 - accuracy: 0.8920",
            "Epoch 4/100 - loss: 0.2541 - accuracy: 0.9210",
            "Epoch 5/100 - loss: 0.1982 - accuracy: 0.9540",
            "Epoch 6/100 - loss: 0.1523 - accuracy: 0.9710",
            "Epoch 7/100 - loss: 0.1102 - accuracy: 0.9850",
            "Optimization complete.",
            "Model saved to /models/portfolio_v1.h5",
            "> deploy --target production",
            "Deploying to Vercel Edge Network...",
            "Status: Live 🟢"
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < commands.length) {
                setLines(prev => [...prev, commands[currentIndex]]);
                currentIndex++;
            } else {
                // Reset after a delay
                setTimeout(() => {
                    setLines([]);
                    currentIndex = 0;
                }, 3000);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md mx-auto mt-12 bg-black/80 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md shadow-2xl"
        >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-white/40 font-mono">deepesh@portfolio:~/projects</span>
            </div>
            <div
                ref={scrollRef}
                className="p-4 h-64 overflow-y-auto font-mono text-xs md:text-sm text-green-400 space-y-1 scrollbar-hide"
            >
                {lines.map((line, i) => (
                    <div key={i} className="break-all">
                        <span className="opacity-50 mr-2">$</span>
                        {line}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </motion.div>
    );
}
