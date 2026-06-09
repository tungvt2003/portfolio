'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Sparkles } from 'lucide-react'
import type { PublicProfile, PublicProject } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface HeroSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  profile: PublicProfile
  projects: PublicProject[]
}

const orbitBadges = [
  { label: 'React', text: 'R', top: '10%', left: '8%', delay: 0 },
  { label: 'Next.js', text: 'N', top: '24%', right: '-4%', delay: 1.3 },
  { label: 'TypeScript', text: 'TS', bottom: '15%', right: '4%', delay: 2.6 },
  { label: 'Tailwind CSS', text: 'CSS', bottom: '12%', left: '-5%', delay: 3.9 },
]

export function HeroSection({ locale, t, profile, projects }: HeroSectionProps) {
  const techStackCount = useMemo(() => {
    const tags = new Set(projects.flatMap((project) => project.tags))
    return tags.size
  }, [projects])

  const stats = [
    { value: '1+', label: t.hero.yearsExp },
    { value: `${projects.length}`, label: t.hero.projectsCompleted },
    { value: `${techStackCount}+`, label: t.hero.techStack },
  ]

  return (
    <section id="hero" className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 -translate-y-1/2 rounded-full bg-cyber-blue/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-y-1/3 rounded-full bg-cyber-purple/10 blur-[120px]" />

      <div className="relative grid items-center gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyber-blue/20 bg-cyber-blue/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyber-sky">
            <Sparkles className="h-3 w-3 animate-pulse text-cyber-blue" />
            {t.hero.greeting}
          </div>

          <div className="mt-6 space-y-3">
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {profile.name.split(' ').slice(0, -1).join(' ')}
              </span>
              {' '}
              <span className="bg-gradient-to-r from-cyber-blue via-sky-400 to-cyber-purple bg-clip-text text-transparent">
                {profile.name.split(' ').slice(-1)[0]}
              </span>
            </h1>
            <p className="flex items-center gap-3 font-display text-xl font-semibold tracking-wide text-slate-300 sm:text-2xl">
              <span className="border-l-2 border-cyber-blue pl-3">{profile.role[locale]}</span>
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-blue opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyber-blue" />
              </span>
            </p>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {t.hero.subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-cyber-blue px-5 py-3 font-display text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(0,229,255,0.28)] transition hover:brightness-110"
            >
              {t.hero.viewProjects}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-5 py-3 font-display text-xs font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              <FileText className="h-4 w-4 text-cyber-blue" />
              {t.hero.downloadCV}
            </a>
          </div>

          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/3 p-3 transition hover:border-cyber-blue/30 hover:bg-cyber-blue/5"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyber-blue/5 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="font-display text-2xl font-black tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="flex justify-center lg:col-span-5"
        >
          <div className="relative flex h-72 w-72 select-none items-center justify-center sm:h-80 sm:w-80">
            <div className="absolute inset-2 rounded-full border border-cyber-blue/10 animate-pulse-ring" />
            <div className="absolute inset-7 rounded-full border border-cyber-purple/15 animate-pulse-ring [animation-delay:1s]" />
            <div className="absolute inset-0 rotate-12 rounded-full border border-dashed border-white/10" />
            <div className="absolute inset-10 -rotate-45 rounded-full border border-cyber-blue/10" />

            <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full border border-cyber-blue/30 bg-cyber-dark/50 p-1.5 shadow-[0_0_55px_rgba(0,229,255,0.16)] backdrop-blur-md sm:h-64 sm:w-64">
              <div className="absolute inset-0 animate-spin bg-gradient-to-tr from-cyber-blue/20 via-transparent to-cyber-purple/20 [animation-duration:12s]" />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-slate-950">
                <img
                  src="/portfolio/z7912950942352_d4b1d30ad3c1b2c1e37613c37ec2c074.jpg"
                  alt={profile.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-1 rounded-full border border-cyber-blue/10" />
              <div className="pointer-events-none absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-cyber-blue/20 border-t-cyber-blue/20 [animation-duration:8s]" />
            </div>

            {orbitBadges.map((badge) => (
              <motion.div
                key={badge.label}
                aria-label={badge.label}
                initial={{ y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: badge.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  top: badge.top,
                  right: badge.right,
                  bottom: badge.bottom,
                  left: badge.left,
                }}
                className="absolute z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/55 text-xs font-bold text-white shadow-lg backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <span className="relative font-mono text-[11px] leading-none text-cyber-sky">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
