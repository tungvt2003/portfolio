'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  fetchAdminSettings,
  getAdminAccessToken,
  updateAdminSettings,
  type AdminSettings,
} from '@/lib/admin-api'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [lastUpdatedAt, setLastUpdatedAt] = useState('')

  const [siteName, setSiteName] = useState('')
  const [defaultLocale, setDefaultLocale] = useState<'en' | 'vi'>('en')
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [githubLink, setGithubLink] = useState('')
  const [emailLink, setEmailLink] = useState('')

  const applySettings = (settings: AdminSettings) => {
    setSiteName(settings.siteName)
    setDefaultLocale(settings.defaultLocale)
    setDefaultTheme(settings.defaultTheme)
    setGithubLink(settings.socialLinks.github || '')
    setEmailLink(settings.socialLinks.email || '')
    setLastUpdatedAt(settings.updatedAt)
  }

  const loadSettings = async () => {
    setIsLoading(true)

    try {
      const settings = await fetchAdminSettings()
      applySettings(settings)
    } catch {
      toast.error('Failed to load settings')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadSettings()
  }, [router])

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const updated = await updateAdminSettings({
        siteName,
        defaultLocale,
        defaultTheme,
        socialLinks: {
          github: githubLink,
          email: emailLink,
        },
      })
      applySettings(updated)
      toast.success('Settings updated successfully')
    } catch {
      toast.error('Failed to update settings')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage locale, theme and public social links.</p>
      </div>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site name</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="siteName"
                value={siteName}
                onChange={(event) => setSiteName(event.target.value)}
              />
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Default locale</Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={defaultLocale}
                  onValueChange={(value) => setDefaultLocale(value as 'en' | 'vi')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Vietnamese</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label>Default theme</Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select
                  value={defaultTheme}
                  onValueChange={(value) => setDefaultTheme(value as 'light' | 'dark' | 'system')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub URL</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="githubLink"
                value={githubLink}
                onChange={(event) => setGithubLink(event.target.value)}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailLink">Email link (mailto:...)</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                id="emailLink"
                value={emailLink}
                onChange={(event) => setEmailLink(event.target.value)}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {lastUpdatedAt ? `Last updated: ${new Date(lastUpdatedAt).toLocaleString()}` : ''}
        </p>
        <Button onClick={() => void handleSave()} disabled={isLoading || isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save settings'}
        </Button>
      </div>
    </div>
  )
}
