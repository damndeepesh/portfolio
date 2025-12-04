import Background from "@/components/Background";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import TechMarquee from "@/components/TechMarquee";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <Background />
      <div className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
