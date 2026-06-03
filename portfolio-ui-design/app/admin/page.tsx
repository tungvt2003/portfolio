'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderKanban, FileCheck2, Building2, Clock3 } from 'lucide-react'
import { fetchAdminProjects, getAdminAccessToken } from '@/lib/admin-api'
import type { Project } from '@/lib/admin-types'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true)

      try {
        const data = await fetchAdminProjects()
        setProjects(data)
      } catch {
        toast.error('Failed to load dashboard data')
        setProjects([])
        if (!getAdminAccessToken()) {
          router.replace('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    void loadDashboard()
  }, [router])

  const stats = useMemo(
    () => [
      {
        title: 'Total Projects',
        value: `${projects.length}`,
        icon: FolderKanban,
        change: 'All records from admin API',
      },
      {
        title: 'Published Projects',
        value: `${projects.filter((project) => project.status === 'published').length}`,
        icon: FileCheck2,
        change: 'Visible on public portfolio',
      },
      {
        title: 'Current Company',
        value: 'DANSOLUTIONS',
        icon: Building2,
        change: 'Frontend Developer (08/2024 - Present)',
      },
      {
        title: 'Experience',
        value: '1+ year',
        icon: Clock3,
        change: 'React / Next.js focused delivery',
      },
    ],
    [projects]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your portfolio content and current profile snapshot.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Use the Projects section to maintain bilingual content and publishing status for each portfolio project.</p>
        </CardContent>
      </Card>
    </div>
  )
}
