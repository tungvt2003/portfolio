'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import type { PublicExperience } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface ExperienceSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  experiences: PublicExperience[]
}

export function ExperienceSection({ locale, t, experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 font-display text-xl font-black tracking-tight text-white">
          <Briefcase className="h-4 w-4 text-cyber-blue" />
          {t.experience.title}
        </h2>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {t.experience.subtitle}
        </p>
      </div>

      <div className="relative space-y-6 border-l border-white/10 pl-6 sm:pl-8">
        <div className="absolute bottom-0 left-[-1px] top-0 w-px bg-gradient-to-b from-cyber-blue via-cyber-purple/40 to-transparent" />

        {experiences.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="cyber-panel-hover group relative rounded-xl border border-slate-800 bg-slate-950/35 p-5"
          >
            <span className="absolute left-[-31px] top-6 h-3 w-3 rounded-full border border-cyber-dark bg-slate-700 transition group-hover:scale-125 group-hover:bg-cyber-blue group-hover:shadow-[0_0_12px_#00e5ff] sm:left-[-39px]" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-sm font-black text-white transition group-hover:text-cyber-blue">
                  {exp.role[locale]}
                </h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-cyber-sky">
                  {exp.company}
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-slate-500">
                <Calendar className="h-3 w-3 text-slate-600" />
                {exp.period}
              </div>
            </div>

            <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-xs leading-6 text-slate-400">
              {exp.description[locale].map((item) => (
                <li key={item} className="transition-colors hover:text-slate-200">
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
