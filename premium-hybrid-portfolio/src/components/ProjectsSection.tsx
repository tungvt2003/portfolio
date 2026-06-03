import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Projector, Bookmark, Star } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import { motion } from "motion/react";

interface ProjectsSectionProps {
  onViewDetails: (project: Project) => void;
}

export default function ProjectsSection({ onViewDetails }: ProjectsSectionProps) {
  const { projects } = PORTFOLIO_DATA;
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all_projects");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filterTabs = [
    { id: "all_projects", label: "View Projects", targetId: "projects" },
    { id: "experiencings", label: "Experiences", targetId: "experience" },
    { id: "skills_tab", label: "Skills", targetId: "skills" },
    { id: "contact_tab", label: "Contact", targetId: "contact" }
  ];

  const handleTabClick = (tabId: string, targetId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-12 border-t border-white/5">
      {/* Header and Slider Navigation Arrows */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <Star size={16} className="text-cyber-blue" />
            <span>Featured Projects</span>
          </h2>
          <p className="font-sans text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            Dynamic real-world systems deployments
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition shadow-inner"
            title="Slide Left"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button
            onClick={scrollRight}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition shadow-inner"
            title="Slide Right"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Categories Tabs in Projects Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none border-b border-white/5">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.targetId)}
            className={`rounded-full px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-widest transition duration-150 shrink-0 ${
              activeTab === tab.id
                ? "bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-sky"
                : "border border-transparent bg-slate-900/30 text-slate-500 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Slider Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="w-[280px] sm:w-[320px] shrink-0 snap-start"
          >
            <ProjectCard
              project={proj}
              onViewDetails={onViewDetails}
              isHovered={hoveredCardId === proj.id}
              onHover={() => setHoveredCardId(proj.id)}
              onLeave={() => setHoveredCardId(null)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
