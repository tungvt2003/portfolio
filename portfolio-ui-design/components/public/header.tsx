'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Globe, Menu, MessageSquare, Moon, Sparkles, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
}

export function Header({ locale, t }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('projects')

  const navLinks = useMemo(
    () => [
      { id: 'projects', label: t.nav.projects },
      { id: 'experience', label: t.nav.experience },
      { id: 'education', label: t.nav.education },
      { id: 'skills', label: t.nav.skills },
      { id: 'contact', label: t.nav.contact },
    ],
    [t]
  )

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const scrollPosition = window.scrollY + 120
      for (const section of navLinks) {
        const element = document.getElementById(section.id)
        if (!element) {
          continue
        }

        const top = element.offsetTop
        const bottom = top + element.offsetHeight
        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navLinks])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)

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
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-cyber-dark/80 py-3 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 overflow-hidden rounded-lg border border-cyber-blue/30 bg-slate-950/60 shadow-[0_0_18px_rgba(0,229,255,0.18)]">
            <img
              src="/portfolio/vt-logo.png"
              alt={`${profile.initials} logo`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </span>
          <span className="hidden font-display text-sm font-bold tracking-wide text-white sm:inline-flex">
            {profile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-slate-950/50 px-2 py-1.5 backdrop-blur-md lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className={cn(
                'relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors',
                activeSection === link.id ? 'text-cyber-blue' : 'text-slate-400 hover:text-white'
              )}
            >
              {activeSection === link.id ? (
                <motion.span
                  layoutId="main-nav-active-pill"
                  className="absolute inset-0 rounded-full border border-cyber-blue/20 bg-cyber-blue/10"
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                />
              ) : null}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="border border-white/10 bg-slate-950/30 text-xs text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <Link href={locale === 'en' ? '/vi' : '/en'}>
              <Globe className="h-3.5 w-3.5 text-cyber-blue" />
              {locale === 'en' ? 'VI' : 'EN'}
            </Link>
          </Button>

          {mounted ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="border border-white/10 bg-slate-950/30 text-slate-300 hover:bg-white/5 hover:text-white"
              title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-cyber-sky" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          ) : null}

          <Button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="bg-cyber-blue text-xs font-bold text-slate-950 shadow-[0_0_16px_rgba(0,229,255,0.35)] hover:bg-cyber-blue hover:brightness-110"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            {t.nav.hireMe}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 border border-white/10 bg-slate-950/30 px-2 text-[10px] text-slate-300 hover:bg-white/5"
          >
            <Link href={locale === 'en' ? '/vi' : '/en'}>
              <Globe className="h-3 w-3 text-cyber-blue" />
              {locale === 'en' ? 'VI' : 'EN'}
            </Link>
          </Button>
          <Button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="h-8 bg-cyber-blue px-3 text-xs font-bold text-slate-950 hover:bg-cyber-blue hover:brightness-110"
          >
            Hire
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="border border-white/10 bg-slate-950/30 text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-white/10 bg-cyber-dark/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                    activeSection === link.id
                      ? 'bg-cyber-blue/10 text-cyber-blue'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id ? <Sparkles className="h-3.5 w-3.5" /> : null}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
