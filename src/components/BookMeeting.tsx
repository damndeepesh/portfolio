"use client";

import { useEffect, useRef } from "react";
import MagneticButton from "./ui/MagneticButton";
import { Calendar } from "lucide-react";

declare global {
    interface Window {
        calendar?: {
            schedulingButton: {
                load: (config: any) => void;
            };
        };
    }
}

export default function BookMeeting() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptTargetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadGoogleCalendarScript = () => {
            // Load styles
            const link = document.createElement("link");
            link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
            link.rel = "stylesheet";
            document.head.appendChild(link);

            // Load script
            const jsScript = document.createElement("script");
            jsScript.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
            jsScript.async = true;
            jsScript.onload = () => {
                if (window.calendar && window.calendar.schedulingButton && scriptTargetRef.current) {
                    window.calendar.schedulingButton.load({
                        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2EIQXJtLcGPhIXlIpQIgy0G-yTqPBahCE7DY8FfC96Ibkglx5cQWFp-HiKlB-K-K9imbaYaNk_?gv=true', // Original URL restored
                        color: '#039BE5',
                        label: 'Book an appointment',
                        target: scriptTargetRef.current, // Target the inner div
                    });
                }
            };
            document.body.appendChild(jsScript);
        };

        loadGoogleCalendarScript();

        // Cleanup function not cleanly possible with this script as it attaches globally, 
        // but we can ensure our refs are okay.
        // Original cleanup for script and link is removed as per instruction.
    }, []);

    const handleClick = () => {
        if (!containerRef.current) {
            console.error("BookMeeting: containerRef is null");
            return;
        }

        console.log("BookMeeting: Attempting to trigger Google Calendar button in container", containerRef.current);
        console.log("BookMeeting: Container HTML:", containerRef.current.innerHTML);

        // The script renders the button as a sibling to scriptTargetRef, so it should be inside containerRef.
        const selectors = [
            "button.qxCTlb",
            "div[role='button']",
            "button",
            "a",
            "iframe"
        ];

        for (const selector of selectors) {
            const element = containerRef.current.querySelector(selector) as HTMLElement;
            if (element) {
                console.log("BookMeeting: Found element with selector", selector);
                element.click();
                return;
            }
        }

        // Fallback: search recursively in container
        const findClickable = (el: HTMLElement): HTMLElement | null => {
            if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.getAttribute('role') === 'button') {
                return el;
            }
            for (let i = 0; i < el.children.length; i++) {
                const found = findClickable(el.children[i] as HTMLElement);
                if (found) return found;
            }
            return null;
        };

        const fallback = findClickable(containerRef.current);
        if (fallback) {
            fallback.click();
        } else {
            console.warn("Could not find Google Calendar trigger button");
        }
    };

    return (
        <>
            <MagneticButton onClick={handleClick} className="h-16 px-8 text-lg bg-transparent border border-white/20 text-white hover:bg-white hover:text-black">
                Book Appointment <Calendar className="ml-2 w-5 h-5" />
            </MagneticButton>

            {/* 
                Hidden container.
                The script appends the button as a SIBLING to the target element.
                So we provide a wrapper (containerRef) to hold both the target (scriptTargetRef) and the resulting button.
                We hide the wrapper off-screen.
            */}
            <div
                ref={containerRef}
                style={{ position: 'fixed', top: 0, left: '-9999px', width: '200px', height: '100px', overflow: 'hidden', zIndex: -1 }}
            >
                <div ref={scriptTargetRef} />
            </div>
        </>
    );
}
