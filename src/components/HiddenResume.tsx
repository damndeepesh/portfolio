"use client";

import { resume } from "@/data/resume";

export default function HiddenResume() {
    const asciiArt = `
<!--
    HELLO THERE, FELLOW DEVELOPER! 👋
    
    You found the hidden resume. Here's the raw data:

    ██████╗ ███████╗███████╗██████╗ ███████╗███████╗██╗  ██╗
    ██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝██║  ██║
    ██║  ██║█████╗  █████╗  ██████╔╝█████╗  ███████╗███████║
    ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██╔══╝  ╚════██║██╔══██║
    ██████╔╝███████╗███████╗██║     ███████╗███████║██║  ██║
    ╚═════╝ ╚══════╝╚══════╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═╝
                                                            
    Name: ${resume.name}
    Role: ${resume.title}
    
    [SKILLS]
    Languages: ${resume.skills.languages.join(", ")}
    Frameworks: ${resume.skills.frameworks.join(", ")}
    Tools: ${resume.skills.tools.join(", ")}
    
    [CONTACT]
    Email: ${resume.contact.email}
    GitHub: ${resume.contact.github}
    LinkedIn: ${resume.contact.linkedin}
    
    [MISSION]
    ${resume.about}
    
    Want to see the code? 
    It's built with Next.js, Tailwind, and Framer Motion.
    
    Have a great day! 🚀
-->
`;

    return (
        <div
            dangerouslySetInnerHTML={{ __html: asciiArt }}
            style={{ display: 'none' }}
        />
    );
}
