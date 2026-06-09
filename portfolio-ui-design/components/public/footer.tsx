'use client'

import Link from 'next/link'
import { Github, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '@/lib/data'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
}

export function Footer({ locale, t }: FooterProps) {
  const socialLinks = [
    { icon: Github, href: profile.github, label: 'GitHub' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ]

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-white/10 bg-white/30 dark:bg-cyber-dark/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex w-fit items-center gap-3">
              <span className="flex h-9 w-9 overflow-hidden rounded-lg border border-cyber-blue/30 bg-white dark:bg-slate-950 shadow-[0_0_16px_rgba(0,229,255,0.16)]">
                <img src="/portfolio/vt-logo.png" alt={`${profile.initials} logo`} className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-sm font-bold tracking-wide text-slate-700 dark:text-white">{profile.name}</span>
            </Link>

            <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyber-blue" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-cyber-blue" />
                {profile.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyber-blue" />
                {profile.location[locale]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white/35 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400 transition hover:border-cyber-blue/30 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-white"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-white/10 pt-5 text-center text-xs font-semibold text-slate-400 dark:text-slate-600">
          <p>
            © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
