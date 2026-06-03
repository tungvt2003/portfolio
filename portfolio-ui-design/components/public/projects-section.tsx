'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Github, Star } from 'lucide-react'
import type { PublicProject } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface ProjectsSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  projects: PublicProject[]
  onViewDetails: (project: PublicProject) => void
}

export function ProjectsSection({ locale, t, projects, onViewDetails }: ProjectsSectionProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('projects')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filterTabs = [
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ]

  const scrollProjects = (direction: 'left' | 'right') => {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (!element) {
      return
    }

    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 88,
      behavior: 'smooth',
    })
  }

  return (
    <section id="projects" className="border-t border-white/10 py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl font-black tracking-tight text-white">
              <Star className="h-4 w-4 text-cyber-blue" />
              {t.projects.title}
            </h2>
            <p className="mt-1 max-w-xl text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
              {t.projects.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollProjects('left')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/70 text-slate-400 shadow-inner transition hover:border-cyber-blue/30 hover:text-cyber-blue"
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollProjects('right')}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/70 text-slate-400 shadow-inner transition hover:border-cyber-blue/30 hover:text-cyber-blue"
              aria-label="Scroll projects right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2 overflow-x-auto border-b border-white/10 pb-4 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors',
                activeTab === tab.id
                  ? 'border-cyber-blue/30 bg-cyber-blue/10 text-cyber-sky'
                  : 'border-transparent bg-slate-950/40 text-slate-500 hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          ref={scrollContainerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 scroll-smooth scrollbar-none"
        >
          {projects.map((project, index) => {
            const isHovered = hoveredCardId === project.id

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                onMouseEnter={() => setHoveredCardId(project.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={cn(
                  'group flex w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border transition-all duration-300 sm:w-[320px]',
                  isHovered
                    ? 'border-cyber-blue/50 bg-slate-900/60 shadow-[0_0_24px_rgba(0,229,255,0.14)]'
                    : 'border-slate-800 bg-slate-950/50'
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-slate-950">
                  <img
                    src={project.thumbnail}
                    alt={project.title[locale]}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-cyber-blue/20 bg-cyber-blue/10 px-2 py-0.5 font-mono text-[9px] font-bold text-cyber-sky"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div>
                    <h3 className="font-display text-base font-black leading-snug text-white transition-colors group-hover:text-cyber-blue">
                      {project.title[locale]}
                    </h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      {project.role[locale]}
                    </p>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-slate-400">
                    {project.summary[locale]}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(3, 7).map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-slate-800 bg-slate-900/40 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => onViewDetails(project)}
                    className={cn(
                      'inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 font-display text-xs font-bold transition',
                      isHovered
                        ? 'bg-cyber-blue text-slate-950 shadow-[0_0_14px_rgba(0,229,255,0.24)]'
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    )}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {t.projects.viewDetails}
                  </button>

                  {project.repoUrl ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 py-2.5 font-display text-xs font-bold text-slate-300 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" />
                      {t.projects.viewCode}
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 py-2.5 font-display text-xs font-bold text-slate-600"
                    >
                      <Github className="h-3.5 w-3.5" />
                      {t.projects.viewCode}
                    </button>
                  )}
                </div>

                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-5 mb-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-cyber-blue/20 bg-cyber-blue/10 py-2 text-xs font-bold text-cyber-sky transition hover:bg-cyber-blue/15"
                  >
                    {t.projects.viewDemo}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </motion.article>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
