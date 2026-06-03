import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import Timeline from "./components/Timeline";
import SkillsGrid from "./components/SkillsGrid";
import ContactForm from "./components/ContactForm";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import ResumeModal from "./components/ResumeModal";
import { Project } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCV, setShowCV] = useState(false);

  const handleScrollToContact = () => {
    const contactBlock = document.getElementById("contact");
    if (contactBlock) {
      window.scrollTo({
        top: contactBlock.offsetTop - 85,
        behavior: "smooth"
      });
    }
  };

  const handleScrollToProjects = () => {
    const projectsBlock = document.getElementById("projects");
    if (projectsBlock) {
      window.scrollTo({
        top: projectsBlock.offsetTop - 85,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080B13] text-slate-100 overflow-x-hidden selection:bg-cyber-blue/30 selection:text-white">
      {/* Absolute Tech Grid Background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111726_1px,transparent_1px),linear-gradient(to_bottom,#111726_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Decorative ambient neon dust */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyber-blue/5 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyber-purple/5 blur-[150px] pointer-events-none" />

      {/* Sticky Header Navigation */}
      <Navbar
        onHireMeClick={handleScrollToContact}
        onDownloadCVClick={() => setShowCV(true)}
      />

      {/* Main Core Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-6 pb-24 z-10 relative">
        
        {/* HYBRID LAYOUT ROUTING (Desktop Split Panel vs Mobile Scroll Flow) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4 items-start">
          
          {/* LEFT PANEL - Sticky Hero intro & sliding Projects view (7 cols) */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pr-1 sm:pr-2 scrollbar-none scroll-smooth">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection
                onViewProjectsClick={handleScrollToProjects}
                onDownloadCVClick={() => setShowCV(true)}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <ProjectsSection onViewDetails={(p) => setSelectedProject(p)} />
            </motion.div>
          </div>

          {/* RIGHT PANEL - Experience chronological nodes, education card, competencies list, email forms (5 cols) */}
          <div className="lg:col-span-5 space-y-10 rounded-2xl lg:bg-slate-950/40 lg:border lg:border-white/5 lg:p-6 lg:backdrop-blur-sm lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto scrollbar-none scroll-smooth">
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Timeline />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="border-t border-white/5 pt-8"
            >
              <SkillsGrid />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-white/5 pt-8"
            >
              <ContactForm />
            </motion.div>
          </div>

        </div>
      </main>

      {/* GLOBAL OVERLAYS (Project Detailed schemas & Interactive CV Downloaders) */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {showCV && (
          <ResumeModal onClose={() => setShowCV(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
