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
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-number mb-2 flex items-center gap-2">
            <Briefcase className="h-3 w-3 text-cyber-blue/60" />
            02 · EXPERIENCE
          </p>
          <h2 className="font-display text-2xl font-black tracking-tight text-slate-700 dark:text-white sm:text-3xl">
            {t.experience.title}
          </h2>
          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {t.experience.subtitle}
          </p>
        </div>
        <div className="hidden h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/10 to-transparent sm:block" />
      </div>

      <div className="relative space-y-6 border-l border-slate-200 dark:border-white/10 pl-6 sm:pl-8">
        <div className="absolute bottom-0 -left-px top-0 w-px bg-linear-to-b from-cyber-blue via-cyber-purple/40 to-transparent" />

        {experiences.map((exp, index) => (
          <motion.article
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="cyber-panel-hover group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/35 p-5"
          >
            <span className="absolute -left-7.75 top-6 h-3 w-3 rounded-full border border-slate-100 dark:border-cyber-dark bg-slate-400 dark:bg-slate-700 transition group-hover:scale-125 group-hover:bg-cyber-blue group-hover:shadow-[0_0_12px_#00e5ff] sm:-left-9.75" />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-sm font-black text-slate-700 dark:text-white transition group-hover:text-cyber-blue">
                  {exp.role[locale]}
                </h3>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-cyber-sky">
                  {exp.company}
                </p>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-slate-500">
                <Calendar className="h-3 w-3 text-slate-400 dark:text-slate-600" />
                {exp.period}
              </div>
            </div>

            <ul className="mt-4 list-outside list-disc space-y-2 pl-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
              {exp.description[locale].map((item) => (
                <li key={item} className="transition-colors hover:text-slate-700 dark:hover:text-slate-200">
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
