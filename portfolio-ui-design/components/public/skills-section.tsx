'use client'

import { useState, type ComponentType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Cloud,
  Code2,
  GitBranch,
  Layers3,
  Search,
  Server,
  Shield,
  Sparkles,
  Users,
  Webhook,
  Wrench,
  Zap,
} from 'lucide-react'
import {
  SiAntdesign,
  SiFigma,
  SiGithub,
  SiGithubactions,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiReact,
  SiReacthookform,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVscodium,
} from '@icons-pack/react-simple-icons'
import type { PublicSkills } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface SkillsSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  skills: PublicSkills
}

const skillCategories = [
  { key: 'frontend' as const, icon: Code2, accent: 'text-cyber-blue' },
  { key: 'backend' as const, icon: Server, accent: 'text-cyber-purple' },
  { key: 'devops' as const, icon: Cloud, accent: 'text-amber-300' },
  { key: 'tools' as const, icon: Wrench, accent: 'text-rose-300' },
]

const lucideIcons: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  'Lucide:Webhook': Webhook,
  'Lucide:Shield': Shield,
  'Lucide:GitBranch': GitBranch,
  'Lucide:Cloud': Cloud,
  'Lucide:Zap': Zap,
  'Lucide:Search': Search,
  'Lucide:Users': Users,
  'Lucide:Layers3': Layers3,
  'Lucide:Wrench': Wrench,
}

const simpleIcons: Record<string, ComponentType<{ className?: string; size?: number; color?: string }>> = {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiAntdesign,
  SiReacthookform,
  SiMysql,
  SiMongodb,
  SiSocketdotio,
  SiGithubactions,
  SiGithub,
  SiFigma,
  SiPostman,
  SiVscodium,
}

function SkillIcon({ iconKey }: { iconKey: string }) {
  const LucideIcon = lucideIcons[iconKey]
  if (LucideIcon) {
    return <LucideIcon className="h-4 w-4 shrink-0 text-cyber-blue" />
  }

  const SimpleIcon = simpleIcons[iconKey]
  if (SimpleIcon) {
    return <SimpleIcon className="h-4 w-4 shrink-0 text-cyber-sky" color="currentColor" />
  }

  return null
}

export function SkillsSection({ t, skills }: SkillsSectionProps) {
  const [expandedCategory, setExpandedCategory] = useState<keyof PublicSkills | null>('frontend')

  return (
    <section id="skills" className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl font-black tracking-tight text-white">
            <Sparkles className="h-4 w-4 text-cyber-blue" />
            {t.skills.title}
          </h2>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {t.skills.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skillCategories.map((category, index) => {
          const isExpanded = expandedCategory === category.key
          const Icon = category.icon
          const categorySkills = skills[category.key]

          return (
            <motion.button
              key={category.key}
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => setExpandedCategory((prev) => (prev === category.key ? null : category.key))}
              aria-expanded={isExpanded}
              className={cn(
                'cyber-panel-hover group relative overflow-hidden rounded-2xl border p-4 text-left transition',
                isExpanded
                  ? 'border-cyber-blue/30 bg-slate-900/55 shadow-[0_0_22px_rgba(0,229,255,0.08)]'
                  : 'border-slate-800 bg-slate-950/35 hover:border-slate-700'
              )}
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-950 shadow-inner transition group-hover:scale-105">
                    <Icon className={cn('h-5 w-5', category.accent)} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-black text-white transition group-hover:text-cyber-blue">
                      {t.skills[category.key]}
                    </h3>
                    <p className="mt-1 text-[10px] font-medium text-slate-500">
                      {categorySkills.length} technologies
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-1 rounded-full border border-cyber-blue/20 bg-cyber-blue/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyber-sky">
                  Core
                  {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="relative overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill.name}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: skillIndex * 0.03 }}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs font-semibold text-slate-300"
                        >
                          <SkillIcon iconKey={skill.icon} />
                          {skill.name}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
