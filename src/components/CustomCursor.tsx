"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const [label, setLabel] = useState("SYSTEM ONLINE");

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for data-cursor attribute first (highest priority)
            const cursorData = target.getAttribute("data-cursor") || target.closest("[data-cursor]")?.getAttribute("data-cursor");

            if (cursorData) {
                setIsHovering(true);
                setLabel(cursorData);
                return;
            }

            // Check for specific element types
            const link = target.closest("a");
            const button = target.closest("button");

            if (link) {
                setIsHovering(true);
                const href = link.getAttribute("href") || "";
                if (href.includes("github.com")) setLabel("GITHUB PROFILE FOUND");
                else if (href.includes("linkedin.com")) setLabel("LINKEDIN PROFILE FOUND");
                else if (href.includes("twitter.com") || href.includes("x.com")) setLabel("TWITTER PROFILE FOUND");
                else if (href.startsWith("mailto:")) setLabel("EMAIL DETECTED");
                else setLabel("LINK DETECTED");
            } else if (button) {
                setIsHovering(true);
                setLabel("INTERACTION DETECTED");
            } else if (
                target.tagName === "P" ||
                target.tagName === "H1" ||
                target.tagName === "H2" ||
                target.tagName === "H3" ||
                target.tagName === "SPAN"
            ) {
                // Only show for text if it has significant content and isn't just a wrapper
                if (target.textContent && target.textContent.trim().length > 0) {
                    setIsHovering(true);
                    setLabel("TEXT DETECTED");
                } else {
                    setIsHovering(false);
                }
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference hidden md:block"
            suppressHydrationWarning
            animate={{
                x: position.x - 24,
                y: position.y - 24,
                scale: isClicking ? 0.9 : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.5,
            }}
        >
            {/* Reticle Container */}
            <div className="relative w-12 h-12">
                {/* Top Left Corner */}
                <motion.div
                    className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary"
                    animate={{ x: isHovering ? -4 : 0, y: isHovering ? -4 : 0 }}
                />
                {/* Top Right Corner */}
                <motion.div
                    className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary"
                    animate={{ x: isHovering ? 4 : 0, y: isHovering ? -4 : 0 }}
                />
                {/* Bottom Left Corner */}
                <motion.div
                    className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary"
                    animate={{ x: isHovering ? -4 : 0, y: isHovering ? 4 : 0 }}
                />
                {/* Bottom Right Corner */}
                <motion.div
                    className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary"
                    animate={{ x: isHovering ? 4 : 0, y: isHovering ? 4 : 0 }}
                />

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary -translate-x-1/2 -translate-y-1/2 rounded-full" />

                {/* Label */}
                <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-black text-[10px] font-mono font-bold px-1 py-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                >
                    {label}
                </motion.div>
            </div>
        </motion.div>
    );
}
