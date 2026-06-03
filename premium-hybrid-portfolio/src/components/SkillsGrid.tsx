import { useState } from "react";
import { Sparkles, Code2, Database, Shield, Wrench, ChevronUp, ChevronDown, CheckCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { SkillCategory } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function SkillsGrid() {
  const { skills } = PORTFOLIO_DATA;
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>("skill-frontend");
  const [levelFilter, setLevelFilter] = useState<"All" | "High">("High");

  const toggleCategory = (id: string) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  // Filter skills based on toggle selection
  const filteredSkills = skills.filter((category) => {
    if (levelFilter === "High") {
      return category.level === "High";
    }
    return true;
  });

  const getIcon = (type: string, size = 18) => {
    switch (type) {
      case "frontend":
        return <Code2 size={size} className="text-cyber-blue" />;
      case "backend":
        return <Database size={size} className="text-cyber-purple" />;
      case "devops":
        return <Shield size={size} className="text-amber-400" />;
      case "tools":
        return <Wrench size={size} className="text-rose-400" />;
      default:
        return <Code2 size={size} className="text-cyber-blue" />;
    }
  };

  return (
    <section id="skills" className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <Sparkles size={16} className="text-cyber-blue" />
            <span>Skills & Expertise</span>
          </h2>
          <p className="font-sans text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            Categorized glassmorphism stacks
          </p>
        </div>

        {/* Level filter control */}
        <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-slate-900/40 p-1 backdrop-blur-sm">
          <button
            onClick={() => setLevelFilter("High")}
            className={`rounded-md px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider transition ${
              levelFilter === "High"
                ? "bg-cyber-blue text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            High Level
          </button>
          <button
            onClick={() => setLevelFilter("All")}
            className={`rounded-md px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-wider transition ${
              levelFilter === "All"
                ? "bg-cyber-blue text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Skills
          </button>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredSkills.map((cat) => {
          const isExpanded = expandedCategoryId === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`group flex flex-col rounded-2xl border p-4.5 cursor-pointer transition-all duration-300 relative overflow-hidden select-none ${
                isExpanded
                  ? "border-cyber-blue/30 bg-slate-900/50 shadow-[0_0_20px_rgba(0,229,255,0.06)]"
                  : "border-slate-800 bg-slate-950/25 hover:border-slate-700 hover:bg-slate-900/10"
              }`}
            >
              {/* Card visual background shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-white/0 opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Card Header details */}
              <div className="flex items-start justify-between gap-2.5 z-10">
                <div className="flex items-center gap-3">
                  {/* Glowing Icon Compartment */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 border border-white/5 shadow-inner scale-100 group-hover:scale-105 transition-transform">
                    {getIcon(cat.iconType, 20)}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-cyber-blue transition duration-200">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-[10px] text-slate-500 font-medium">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-sans text-[9px] font-bold tracking-widest text-cyber-sky bg-sky-950/25 border border-sky-900/40 px-1.5 py-0.5 rounded-full uppercase">
                    Level: {cat.level}
                  </span>
                  <div className="text-slate-500 group-hover:text-white shrink-0 transition">
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </div>
                </div>
              </div>

              {/* Sub-skills panel */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden z-10"
                  >
                    <div className="space-y-3.5 border-t border-white/5 pt-4">
                      {cat.items.map((skill, index) => (
                        <div key={index} className="space-y-1.5">
                          <div className="flex justify-between items-center text-[11px] leading-none">
                            <span className="font-sans font-semibold text-slate-300">
                              {skill.name}
                            </span>
                            <span className="font-mono font-bold text-cyber-blue">
                              {skill.percentage}%
                            </span>
                          </div>
                          {/* Progress bar container */}
                          <div className="h-1.5 w-full bg-slate-950 rounded-full border border-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple/50 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
