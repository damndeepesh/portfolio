"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
    useEffect(() => {
        const styleTitle = [
            "font-size: 40px",
            "font-weight: bold",
            "font-family: monospace",
            "color: #FF4D00", // Primary orange color
            "text-shadow: 2px 2px 0px #000",
        ].join(";");

        const styleBody = [
            "font-size: 14px",
            "font-family: monospace",
            "color: #fff",
            "background-color: #1a1a1a",
            "padding: 10px",
            "border-radius: 5px",
            "line-height: 1.5",
        ].join(";");

        const message = `
%cDEEPESH GUPTA%c

Hey there! 👋
You found the secret console. I see you're curious about how things work.

I like that.

If you're looking for a developer who pays attention to the details (even the hidden ones), let's chat.

📧 Email: hello@deepeshgupta.dev
🐙 Github: https://github.com/damndeepesh
    `;

        console.log(message, styleTitle, styleBody);
    }, []);

    return null;
}
