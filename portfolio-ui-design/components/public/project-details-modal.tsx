'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award, CheckCircle2, ExternalLink, Github, Layers3, X } from 'lucide-react'
import type { PublicProject } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface ProjectDetailsModalProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  project: PublicProject
  onClose: () => void
}

export function ProjectDetailsModal({ locale, t, project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const highlights = project.highlights[locale].length
    ? project.highlights[locale]
    : [project.summary[locale]]

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-100/90 dark:bg-cyber-dark/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-details-title"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl shadow-black/10 dark:shadow-black/40"
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyber-blue shadow-[0_0_10px_#00e5ff]" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Project schema
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 text-slate-500 dark:text-slate-400 transition hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-white"
            aria-label="Close project details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-7">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950">
            <img
              src={project.thumbnail}
              alt={project.title[locale]}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="rounded border border-cyber-blue/30 bg-cyber-blue/10 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-cyber-sky">
                {project.role[locale]}
              </span>
              <h2 id="project-details-title" className="mt-2 font-display text-xl font-black text-white sm:text-2xl">
                {project.title[locale]}
              </h2>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-500 dark:text-slate-300">{project.summary[locale]}</p>

          <div className="space-y-3 border-t border-slate-200 dark:border-white/10 pt-5">
            <h3 className="flex items-center gap-2 font-display text-sm font-bold text-slate-700 dark:text-white">
              <Award className="h-4 w-4 text-cyber-blue" />
              Key work
            </h3>
            <ul className="grid gap-3 md:grid-cols-2">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/35 p-3 text-xs leading-6 text-slate-500 dark:text-slate-400"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyber-blue" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 dark:border-white/10 pt-5">
            <h4 className="mb-3 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-white">
              <Layers3 className="h-4 w-4 text-cyber-purple" />
              Tech stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 px-3 py-1 font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-slate-950/60 px-5 py-4 sm:flex-row sm:justify-end">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/35 dark:bg-slate-900/60 px-4 py-2 font-display text-xs font-bold text-slate-500 dark:text-slate-300 transition hover:border-slate-300 dark:hover:border-slate-500 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white"
            >
              <Github className="h-4 w-4" />
              {t.projects.viewCode}
            </a>
          ) : null}

          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyber-blue px-4 py-2 font-display text-xs font-bold text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.22)] transition hover:brightness-110"
            >
              {t.projects.viewDemo}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}
