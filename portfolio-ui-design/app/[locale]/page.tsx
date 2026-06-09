import type { Locale } from '@/lib/i18n'
import { HomeClient } from './_home-client'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }]
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <HomeClient locale={(locale as Locale) || 'en'} />
}
