"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface LockdownContextType {
    isLocked: boolean;
    unlockTime: number | null;
    triggerLockdown: () => void;
}

const LockdownContext = createContext<LockdownContextType | undefined>(undefined);

export function LockdownProvider({ children }: { children: React.ReactNode }) {
    const [isLocked, setIsLocked] = useState(false);
    const [unlockTime, setUnlockTime] = useState<number | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const storedUnlockTime = localStorage.getItem("lockdown_unlock_time");
        if (storedUnlockTime) {
            const time = parseInt(storedUnlockTime, 10);
            if (Date.now() < time) {
                setIsLocked(true);
                setUnlockTime(time);
            } else {
                // Lock expired
                localStorage.removeItem("lockdown_unlock_time");
            }
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isLocked && unlockTime) {
            interval = setInterval(() => {
                if (Date.now() >= unlockTime) {
                    setIsLocked(false);
                    setUnlockTime(null);
                    localStorage.removeItem("lockdown_unlock_time");
                    clearInterval(interval);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isLocked, unlockTime]);

    const triggerLockdown = () => {
        const duration = 10 * 60 * 1000; // 10 minutes
        const targetTime = Date.now() + duration;

        setIsLocked(true);
        setUnlockTime(targetTime);
        localStorage.setItem("lockdown_unlock_time", targetTime.toString());
    };

    return (
        <LockdownContext.Provider value={{ isLocked, unlockTime, triggerLockdown }}>
            {children}
        </LockdownContext.Provider>
    );
}

export function useLockdown() {
    const context = useContext(LockdownContext);
    if (context === undefined) {
        throw new Error("useLockdown must be used within a LockdownProvider");
    }
    return context;
}
