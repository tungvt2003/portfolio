import { useState } from "react";
import { Briefcase, GraduationCap, Clock, Ship, Calendar, CircleDot } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { motion } from "motion/react";

export default function Timeline() {
  const { experience, education } = PORTFOLIO_DATA;
  const [activeExpId, setActiveExpId] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* WORK EXPERIENCE */}
      <section id="experience" className="relative space-y-6">
        <div>
          <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <Briefcase size={16} className="text-cyber-blue" />
            <span>Work Experience</span>
          </h2>
          <p className="font-sans text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            Professional trajectory and impact
          </p>
        </div>

        {/* Timeline Track container */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/5 space-y-8 pb-2">
          {/* Glowing laser line (overly visual) */}
          <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] bg-gradient-to-b from-cyber-blue via-cyber-purple/40 to-transparent" />

          {/* Map Experience items */}
          {experience.map((exp) => {
            const isHovered = activeExpId === exp.id;
            return (
              <motion.div
                key={exp.id}
                onMouseEnter={() => setActiveExpId(exp.id)}
                onMouseLeave={() => setActiveExpId(null)}
                className={`group relative rounded-xl border p-5 transition-all duration-300 ${
                  isHovered
                    ? "border-cyber-blue/45 bg-slate-900/50 shadow-[0_0_15px_rgba(0,229,255,0.08)]"
                    : "border-slate-800 bg-slate-950/20"
                }`}
              >
                {/* Pulse node point beside */}
                <div
                  className={`absolute left-[-29px] sm:left-[-37px] top-6.5 h-3 w-3 rounded-full border border-cyber-dark z-10 transition duration-300 ${
                    isHovered
                      ? "bg-cyber-blue scale-125 shadow-[0_0_10px_#00e5ff]"
                      : "bg-slate-700 hover:bg-cyber-blue"
                  }`}
                />

                {/* Role header details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-cyber-blue transition duration-250">
                      {exp.role}
                    </h3>
                    <p className="font-display font-medium text-[11px] text-cyber-sky uppercase tracking-wide">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 font-semibold">
                    <Calendar size={11} className="text-slate-600" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Detail Points */}
                <ul className="space-y-2 list-outside list-disc pl-4 font-sans text-xs text-slate-400 leading-relaxed">
                  {exp.points.map((pt, idx) => (
                    <li key={idx} className="hover:text-slate-200 transition duration-150">
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="relative space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
            <GraduationCap size={17} className="text-cyber-blue" />
            <span>Education</span>
          </h2>
          <p className="font-sans text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
            Academic credentials and focus
          </p>
        </div>

        {/* Education lists */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/5 pb-2">
          {/* Glowing laser line segment */}
          <div className="absolute top-0 bottom-0 left-[-1px] w-[1px] bg-gradient-to-b from-cyber-blue to-transparent" />

          {education.map((edu) => (
            <div
              key={edu.id}
              className="group relative rounded-xl border border-slate-800 bg-slate-950/20 p-5 space-y-3"
            >
              <div className="absolute left-[-29px] sm:left-[-37px] top-6.5 h-3 w-3 rounded-full bg-cyber-blue/30 border border-cyber-blue border-solid z-10" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-sm text-white group-hover:text-cyber-blue transition duration-200">
                    {edu.institution}
                  </h3>
                  <p className="font-sans text-xs text-slate-400 mt-0.5">
                    {edu.major}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 font-mono text-[10px]/none">
                  <span className="font-bold text-cyber-sky bg-sky-950/30 border border-sky-900/40 px-2 py-0.5 rounded-full font-sans uppercase tracking-wider">
                    GPA: {edu.gpa.split(" ")[0]}
                  </span>
                  <span className="text-slate-500 mt-1 font-semibold">{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
