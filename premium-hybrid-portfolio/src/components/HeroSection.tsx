import { Calendar, Briefcase, Code, Sparkles, Send, FileText, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { motion } from "motion/react";

interface HeroSectionProps {
  onViewProjectsClick: () => void;
  onDownloadCVClick: () => void;
}

export default function HeroSection({ onViewProjectsClick, onDownloadCVClick }: HeroSectionProps) {
  const { profile } = PORTFOLIO_DATA;

  // Let's create an elegant orbital configuration for orbiting icons
  const orbitIcons = [
    { name: "React", iconText: "⚛️", top: "12%", left: "10%", delay: 0 },
    { name: "Next.js", iconText: "▲", top: "25%", right: "-5%", delay: 1.5 },
    { name: "TS", iconText: "TS", top: "72%", right: "3%", delay: 3 },
    { name: "CSS", iconText: "⌘", top: "75%", left: "-5%", delay: 4.5 }
  ];

  return (
    <section id="hero-section" className="relative pt-28 pb-16 lg:py-20 flex flex-col items-center">
      {/* Background soft glowing orb elements */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyber-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyber-purple/10 blur-[130px] pointer-events-none" />

      {/* Grid wrapper */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT TEXT CONTENT - 6 cols */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/5 px-3 py-1 text-xs font-semibold text-cyber-sky tracking-wider uppercase">
            <Sparkles size={11} className="text-cyber-blue animate-pulse" />
            <span>Hi, I am ✨</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
              {profile.name}
            </h1>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-cyber-blue tracking-tight flex items-center gap-2">
              <span>{profile.title}</span>
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyber-blue animate-ping" />
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            {profile.bio}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onViewProjectsClick}
              className="flex items-center gap-2 rounded-lg bg-cyber-blue px-5 py-3 font-display text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:brightness-110"
            >
              <span>View Projects</span>
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>

            <button
              onClick={onDownloadCVClick}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 px-5 py-3 font-display text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-500 transition-all duration-200"
            >
              <FileText size={14} className="text-cyber-blue" />
              <span>Download CV</span>
            </button>
          </div>

          {/* Numerical counters */}
          <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8 mt-4 max-w-md">
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-tight">
                {profile.experienceYears}
              </div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Years Experience
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-tight">
                {profile.keyProjectsCount}
              </div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Key Projects
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-white tracking-tight">
                {profile.technologiesCount}
              </div>
              <div className="font-sans text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-1">
                Core Techs
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT METALLIC HOVERING SPATIAL PORTAL - 5 cols */}
        <div className="lg:col-span-5 flex justify-center items-center py-6">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none flex items-center justify-center">
            {/* Pulsing Back Glow Rings */}
            <div className="absolute inset-2 rounded-full border border-cyber-blue/10 animate-pulse-ring" />
            <div className="absolute inset-6 rounded-full border border-cyber-purple/15 animate-pulse-ring" style={{ animationDelay: "1s" }} />

            {/* Orbit Paths */}
            <div className="absolute inset-0 rounded-full border border-dashed border-white/5 rotate-12" />
            <div className="absolute inset-10 rounded-full border border-solid border-cyber-blue/5 -rotate-45" />

            {/* Main Avatar Container */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1.5 border border-cyber-blue/30 bg-cyber-dark/40 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.15)] select-none">
              {/* Spinning luminous gradient border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-blue/20 via-transparent to-cyber-purple/20 animate-spin" style={{ animationDuration: "12s" }} />
              
              {/* Actual Avatar Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/5 bg-slate-950">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full scale-102 transition duration-555 hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Blue SciFi HUD ring overlay */}
              <div className="absolute inset-1 border border-cyber-blue/10 rounded-full pointer-events-none" />
              <div className="absolute inset-2 border-2 border-transparent border-t-cyber-blue/20 border-b-cyber-blue/20 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "8s" }} />
            </div>

            {/* Orbiting Tech Floating Badges */}
            {orbitIcons.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: badge.delay,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: badge.top,
                  left: badge.left,
                  right: badge.right
                }}
                className="z-10 h-10 w-10 flex items-center justify-center rounded-xl glass-card text-xs font-semibold text-white shadow-lg pointer-events-none select-none border border-white/10 hover:border-cyber-blue/40"
              >
                {/* Luminous Inner Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/5 to-white/0" />
                <span className="font-mono text-sm leading-none drop-shadow-md select-none">{badge.iconText}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
