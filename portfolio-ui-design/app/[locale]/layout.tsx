'use client'

import React from "react"

import { useParams } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const t = getTranslations(locale)

  return (
    <div className="relative min-h-screen overflow-hidden bg-cyber-dark text-slate-100 selection:bg-cyber-blue/25 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-40" />
        <div className="absolute left-[-12rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyber-blue/10 blur-[150px]" />
        <div className="absolute right-[-10rem] top-10 h-[28rem] w-[28rem] rounded-full bg-cyber-purple/10 blur-[150px]" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[24rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyber-emerald/10 blur-[150px]" />
      </div>
      
      <Header locale={locale} t={t} />
      <main className="relative z-10">{children}</main>
      <Footer locale={locale} t={t} />
    </div>
  )
}
