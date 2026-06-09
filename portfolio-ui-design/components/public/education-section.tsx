'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface EducationSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
}

export function EducationSection({ locale, t }: EducationSectionProps) {
  return (
    <section id="education" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-number mb-2 flex items-center gap-2">
            <GraduationCap className="h-3 w-3 text-cyber-blue/60" />
            03 · EDUCATION
          </p>
          <h2 className="font-display text-2xl font-black tracking-tight text-slate-700 dark:text-white sm:text-3xl">
            {t.education.title}
          </h2>
          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {t.education.subtitle}
          </p>
        </div>
        <div className="hidden h-px flex-1 bg-linear-to-r from-slate-200 dark:from-white/10 to-transparent sm:block" />
      </div>

      <div className="relative border-l border-slate-200 dark:border-white/10 pl-6 sm:pl-8">
        <div className="absolute bottom-0 -left-px top-0 w-px bg-linear-to-b from-cyber-blue to-transparent" />

        {education.map((item, index) => (
          <motion.article
            key={item.school.en}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="cyber-panel-hover group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-950/35 p-5"
          >
            <span className="absolute left-[-31px] top-6 h-3 w-3 rounded-full border border-cyber-blue bg-cyber-blue/30 sm:left-[-39px]" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-sm font-black text-slate-700 dark:text-white transition group-hover:text-cyber-blue">
                  {item.school[locale]}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                  {t.education.degree}:{' '}
                  <span className="font-semibold text-slate-600 dark:text-slate-200">{item.major[locale]}</span>
                </p>
                <p className="mt-1 font-mono text-[10px] font-semibold text-slate-500">
                  {item.period}
                </p>
              </div>

              <div className="w-fit rounded-full border border-cyber-blue/20 bg-cyber-blue/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyber-sky">
                {t.education.gpa}: {item.gpa}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
