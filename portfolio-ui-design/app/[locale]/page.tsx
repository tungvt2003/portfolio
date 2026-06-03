'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'
import {
  getFallbackPortfolioData,
  loadPublicPortfolioData,
  type PublicProject,
  type PublicPortfolioData,
} from '@/lib/portfolio-api'
import { HeroSection } from '@/components/public/hero-section'
import { ProjectsSection } from '@/components/public/projects-section'
import { ExperienceSection } from '@/components/public/experience-section'
import { EducationSection } from '@/components/public/education-section'
import { SkillsSection } from '@/components/public/skills-section'
import { ContactSection } from '@/components/public/contact-section'
import { ProjectDetailsModal } from '@/components/public/project-details-modal'

export default function HomePage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const t = getTranslations(locale)
  const [portfolioData, setPortfolioData] = useState<PublicPortfolioData>(() =>
    getFallbackPortfolioData()
  )
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null)

  useEffect(() => {
    let isMounted = true

    const refreshPortfolioData = async () => {
      try {
        const data = await loadPublicPortfolioData()
        if (isMounted) {
          setPortfolioData(data)
        }
      } catch {
        // Keep fallback data when API is unavailable.
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void refreshPortfolioData()
      }
    }
    const handleWindowFocus = () => {
      void refreshPortfolioData()
    }

    void refreshPortfolioData()
    window.addEventListener('focus', handleWindowFocus)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      isMounted = false
      window.removeEventListener('focus', handleWindowFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="space-y-10">
          <HeroSection
            locale={locale}
            t={t}
            profile={portfolioData.profile}
            projects={portfolioData.projects}
          />

          <ProjectsSection
            locale={locale}
            t={t}
            projects={portfolioData.projects}
            onViewDetails={setSelectedProject}
          />

          <div className="border-t border-white/10 pt-8">
            <ExperienceSection
              locale={locale}
              t={t}
              experiences={portfolioData.experiences}
            />
          </div>

          <div className="border-t border-white/10 pt-8">
            <EducationSection locale={locale} t={t} />
          </div>

          <div className="border-t border-white/10 pt-8">
            <SkillsSection locale={locale} t={t} skills={portfolioData.skills} />
          </div>

          <div className="border-t border-white/10 pt-8">
            <ContactSection locale={locale} t={t} profile={portfolioData.profile} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <ProjectDetailsModal
            locale={locale}
            t={t}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}
