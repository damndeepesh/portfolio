"use client";

import { useEffect, useState } from "react";

export default function EncryptedMode() {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "e" && !e.metaKey && !e.ctrlKey && !e.altKey) {
                // Avoid triggering when typing in inputs
                if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

                setIsEnabled((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    useEffect(() => {
        if (isEnabled) {
            document.body.classList.add("encrypted-mode");

            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
            // Expanded selector to catch more elements, including those in bento grids
            const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, button, li, div");

            elements.forEach((el) => {
                // Skip if element is marked to ignore encryption
                if (el.closest("[data-no-encrypt]")) return;

                const textNodes: Node[] = [];
                el.childNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
                        textNodes.push(node);
                    }
                });

                if (textNodes.length > 0) {
                    textNodes.forEach((node) => {
                        if (!(node as any)._originalText) {
                            (node as any)._originalText = node.textContent;
                        }
                        const storedText = (node as any)._originalText;

                        // Scramble
                        node.textContent = storedText.split('').map((char: string) =>
                            char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
                        ).join('');
                    });

                    // Add hover listener to decrypt all nodes in this element
                    const handleHover = () => {
                        let iterations = 0;
                        const maxLen = Math.max(...textNodes.map(n => ((n as any)._originalText || "").length));

                        const interval = setInterval(() => {
                            textNodes.forEach((node) => {
                                const storedText = (node as any)._originalText;
                                node.textContent = storedText.split('').map((char: string, index: number) => {
                                    if (index < iterations) return storedText[index];
                                    return chars[Math.floor(Math.random() * chars.length)];
                                }).join('');
                            });

                            if (iterations >= maxLen) clearInterval(interval);
                            iterations += 2;
                        }, 30);

                        el.removeEventListener("mouseover", handleHover);
                    };

                    // Attach the listener only once
                    if (!(el as any)._decryptHandler) {
                        el.addEventListener("mouseover", handleHover);
                        (el as any)._decryptHandler = handleHover; // Store handler for removal
                    }
                }
            });
        } else {
            document.body.classList.remove("encrypted-mode");

            // Restore original text
            const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, a, button, li, div");
            elements.forEach((el) => {
                el.childNodes.forEach((node) => {
                    if (node.nodeType === Node.TEXT_NODE && (node as any)._originalText) {
                        node.textContent = (node as any)._originalText;
                    }
                });

                if ((el as any)._decryptHandler) {
                    el.removeEventListener("mouseover", (el as any)._decryptHandler);
                    delete (el as any)._decryptHandler;
                }
            });
        }
    }, [isEnabled]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${isEnabled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} data-no-encrypt>
            <div className="bg-primary text-black font-mono text-xs px-2 py-1 font-bold">
                ENCRYPTED MODE ACTIVE
            </div>
        </div>
    );
}
