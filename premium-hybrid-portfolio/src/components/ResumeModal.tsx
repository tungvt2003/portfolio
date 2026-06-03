import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { motion } from "motion/react";

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const { profile, experience, education, skills } = PORTFOLIO_DATA;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-dark/80 backdrop-blur-md">
      {/* Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden print:static print:h-auto print:border-none print:shadow-none"
      >
        {/* Header - Controls (hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950 print:hidden">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyber-blue animate-pulse"></span>
            <h3 className="font-display font-semibold text-white text-sm">Professional CV CV_VT_TUNG.pdf</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-white uppercase tracking-wider font-semibold"
            >
              <Printer size={13} className="text-cyber-blue" />
              <span>Print Resume</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-white/5 bg-slate-800 hover:bg-slate-700 p-1.5 text-slate-400 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* CV Body Content - Scrollable area */}
        <div className="flex-1 overflow-y-auto bg-white text-slate-800 px-8 py-10 sm:px-14 print:overflow-visible print:p-0 print:text-black">
          {/* Header area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-200 pb-6 mb-8 gap-4">
            <div>
              <h1 className="font-display font-bold text-3xl tracking-tight text-slate-900 print:text-2xl">{profile.name}</h1>
              <p className="font-display font-semibold text-md text-sky-600 print:text-sky-700 uppercase tracking-widest mt-1">{profile.title}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 print:text-black">
              <span className="flex items-center gap-2"><Mail size={13} className="text-sky-600" /> {profile.email}</span>
              <span className="flex items-center gap-2"><Phone size={13} className="text-sky-600" /> {profile.phone}</span>
              <span className="flex items-center gap-2"><MapPin size={13} className="text-sky-600" /> {profile.location}</span>
            </div>
          </div>

          {/* Profile summary */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3 flex items-center gap-2">
              <Award size={15} className="text-sky-600" /> Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-600 font-sans print:text-black">{profile.bio}</p>
          </div>

          {/* Grid section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Col - 2/3 width */}
            <div className="md:col-span-2 space-y-8">
              {/* Experiences */}
              <div>
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4 flex items-center gap-2">
                  <Briefcase size={15} className="text-sky-600" /> Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-sans font-bold text-slate-800 text-xs">{exp.role}</h4>
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{exp.period}</span>
                      </div>
                      <p className="font-display font-medium text-[11px] text-sky-600 mb-2">{exp.company}</p>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600 leading-relaxed font-sans list-outside print:text-black">
                        {exp.points.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4 flex items-center gap-2">
                  <GraduationCap size={15} className="text-sky-600" /> Education Background
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h4 className="font-sans font-bold text-slate-800 text-xs">{edu.institution}</h4>
                        <p className="text-[11px] text-slate-600 mt-0.5">{edu.major}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[10px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-bold">GPA: {edu.gpa.split(" ")[0]}</span>
                        <p className="font-sans text-[10px] text-slate-400 mt-1">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col - 1/3 width */}
            <div className="space-y-8">
              {/* Core Technologies & Skills */}
              <div>
                <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4">
                  Core Expertise
                </h2>
                <div className="space-y-4">
                  {skills.map((cat) => (
                    <div key={cat.id}>
                      <h4 className="font-sans font-bold text-slate-800 text-[11px] mb-2">{cat.name}</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-slate-100 text-slate-700 text-[9px] font-sans font-medium px-2 py-1 rounded"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* References or Footers */}
              <div className="border border-slate-100 rounded-lg p-3 bg-slate-50 print:border-none print:bg-transparent">
                <h4 className="font-sans font-bold text-slate-800 text-[10px] uppercase mb-2">Qualifications Check</h4>
                <ul className="space-y-1.5 text-[10px] text-slate-500 font-sans print:text-black">
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-500" /> Modern JS/ES6 Standards</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-500" /> UI Accessibility Compliant</li>
                  <li className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-emerald-500" /> Information Sec. Literate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
