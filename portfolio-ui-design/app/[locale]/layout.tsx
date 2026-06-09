import React from 'react'
import type { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/i18n'
import { Header } from '@/components/public/header'
import { Footer } from '@/components/public/footer'
import { SceneBackground } from '@/components/three/scene/SceneBackground'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = getTranslations((locale as Locale) || 'en')

  return (
    <div className="relative min-h-screen overflow-hidden bg-cyber-dark text-slate-100 selection:bg-cyber-blue/25 selection:text-white">
      {/* Three.js particle canvas — fixed background layer, pointer-events: none */}
      <SceneBackground />

      {/* CSS fallback background — grid texture + ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 cyber-grid-bg opacity-25" />
        <div className="absolute left-[-12rem] top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyber-blue/8 blur-[150px]" />
        <div className="absolute right-[-10rem] top-10 h-[28rem] w-[28rem] rounded-full bg-cyber-purple/8 blur-[150px]" />
        <div className="absolute bottom-[-12rem] left-1/2 h-[24rem] w-[34rem] -translate-x-1/2 rounded-full bg-cyber-emerald/8 blur-[150px]" />
      </div>

      <div className="relative" style={{ zIndex: 10 }}>
        <Header locale={(locale as Locale) || 'en'} t={t} />
        <main>{children}</main>
        <Footer locale={(locale as Locale) || 'en'} t={t} />
      </div>
    </div>
  )
}
