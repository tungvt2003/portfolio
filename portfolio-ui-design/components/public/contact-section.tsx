'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Github, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import type { PublicProfile } from '@/lib/portfolio-api'
import type { Locale } from '@/lib/i18n'
import type { getTranslations } from '@/lib/i18n'

interface ContactSectionProps {
  locale: Locale
  t: ReturnType<typeof getTranslations>
  profile: PublicProfile
}

export function ContactSection({ locale, t, profile }: ContactSectionProps) {
  const contactItems = [
    { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: profile.location[locale], href: '' },
  ]

  return (
    <section id="contact" className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 font-display text-xl font-black tracking-tight text-white">
          <MessageSquare className="h-4 w-4 text-cyber-blue" />
          {t.contact.title}
        </h2>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {t.contact.subtitle}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.45 }}
        className="cyber-panel relative overflow-hidden rounded-2xl p-5"
      >
        <div className="pointer-events-none absolute right-[-5rem] top-[-6rem] h-56 w-56 rounded-full bg-cyber-blue/10 blur-[90px]" />
        <div className="pointer-events-none absolute bottom-[-6rem] left-[-6rem] h-52 w-52 rounded-full bg-cyber-purple/10 blur-[90px]" />

        <div className="relative space-y-5">
          <p className="text-xs leading-6 text-slate-400">
            {profile.objective[locale]}
          </p>

          <div className="space-y-3">
            {contactItems.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-950 text-cyber-blue">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="break-all text-xs font-semibold text-slate-300">{item.label}</span>
                </>
              )

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3 transition hover:border-cyber-blue/30 hover:bg-slate-900/40"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/35 p-3"
                >
                  {content}
                </div>
              )
            })}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-cyber-blue px-4 py-3 font-display text-xs font-bold text-slate-950 shadow-[0_0_18px_rgba(0,229,255,0.25)] transition hover:brightness-110"
            >
              {t.contact.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 font-display text-xs font-bold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
