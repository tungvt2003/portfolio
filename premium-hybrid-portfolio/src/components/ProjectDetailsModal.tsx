import { X, ExternalLink, Github, CheckCircle, Lightbulb, ShieldAlert, Award } from "lucide-react";
import { Project } from "../types";
import { motion } from "motion/react";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-dark/85 backdrop-blur-md">
      {/* Scrollable Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-3xl max-h-[85vh] rounded-2xl border border-white/10 bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Sticky modal Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/5 bg-slate-950/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse" />
            <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-wider">PROJECT SCHEMA</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 bg-slate-800/40 hover:bg-slate-700 p-1.5 text-slate-400 hover:text-white transition"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
          {/* Banner & Title */}
          <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/5 bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5">
              <span className="rounded bg-cyber-blue/10 border border-cyber-blue/30 px-2.5 py-0.5 font-mono text-[9px] text-cyber-sky font-semibold tracking-wider uppercase">
                {project.subtitle}
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          <p className="font-sans text-sm text-slate-300 leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Core Features */}
          <div className="space-y-3.5 border-t border-white/5 pt-5">
            <h3 className="font-display font-medium text-white text-sm flex items-center gap-2">
              <Award size={15} className="text-cyber-blue" />
              <span>Key Orchestrated Features</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-slate-950/25 p-3 text-xs text-slate-400 leading-relaxed font-sans"
                >
                  <CheckCircle size={14} className="text-cyber-blue mt-0.5 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Challenges & Technical Solutions */}
          {project.challenges && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-5 pb-2">
              <div className="rounded-xl border border-red-950/40 bg-red-950/10 p-4 space-y-2">
                <h4 className="font-display font-bold text-red-400 text-xs flex items-center gap-2">
                  <ShieldAlert size={14} />
                  <span>Engineering Challenges</span>
                </h4>
                <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                  {project.challenges}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-950/40 bg-emerald-950/10 p-4 space-y-2">
                <h4 className="font-display font-bold text-emerald-400 text-xs flex items-center gap-2">
                  <Lightbulb size={14} />
                  <span>Deployed Solutions</span>
                </h4>
                <p className="font-sans text-[11px] text-slate-400 leading-relaxed">
                  {project.solutions}
                </p>
              </div>
            </div>
          )}

          {/* Project Details Tech Stack */}
          <div className="border-t border-white/5 pt-5 pb-3">
            <h4 className="font-display text-xs text-white uppercase tracking-wider font-semibold mb-3">Orchestrated Tech-Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full bg-slate-800/60 border border-slate-700/60 px-3 py-1 font-mono text-[10px] text-slate-300 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-end gap-3 px-6 py-4.5 border-t border-white/5 bg-slate-950/60">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 px-4 py-2 font-display text-xs font-semibold text-slate-300 transition"
          >
            <Github size={13} />
            <span>GitHub Repository</span>
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-cyber-blue px-4 py-2 font-display text-xs font-semibold text-slate-950 transition hover:brightness-115 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
          >
            <span>Live Demonstration</span>
            <ExternalLink size={11} strokeWidth={2.5} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
