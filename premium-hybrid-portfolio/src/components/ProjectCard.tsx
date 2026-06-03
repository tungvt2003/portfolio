import { Eye, Github, MessageCircle } from "lucide-react";
import { Project } from "../types";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export default function ProjectCard({
  project,
  onViewDetails,
  isHovered,
  onHover,
  onLeave
}: ProjectCardProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative flex flex-col w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
        isHovered
          ? "border-cyber-blue/50 bg-slate-900/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          : "border-slate-800 bg-slate-950/40"
      }`}
    >
      {/* Visual Image Preview */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden select-none border-b border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-all duration-500 scale-101 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Glow overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
      </div>

      {/* Info Block */}
      <div className="flex-1 flex flex-col p-5 space-y-3">
        <div className="space-y-1">
          <h3 className="font-display font-bold text-base text-white group-hover:text-cyber-blue transition duration-200">
            {project.title}
          </h3>
          <p className="font-sans text-[11px] text-slate-500 font-semibold tracking-wide uppercase">
            {project.subtitle}
          </p>
        </div>

        <p className="font-sans text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 pt-1.5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded bg-sky-950/25 border border-sky-900/40 px-2 py-0.5 font-mono text-[9px] text-cyber-sky font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Button controls */}
      <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-2.5 z-10">
        <button
          onClick={() => onViewDetails(project)}
          className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 font-display text-xs font-bold transition duration-200 ${
            isHovered
              ? "bg-cyber-blue text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.25)] hover:brightness-110"
              : "bg-slate-800 hover:bg-slate-700 text-slate-200"
          }`}
        >
          <Eye size={12} strokeWidth={2.5} />
          <span>Details</span>
        </button>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 py-2.5 font-display text-xs font-bold text-slate-300 transition duration-200"
        >
          <Github size={12} />
          <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  );
}
