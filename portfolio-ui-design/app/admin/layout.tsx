'use client'

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, FolderKanban, Settings, Bell, Search, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { profile } from '@/lib/data'
import { clearAdminAccessToken, getAdminAccessToken } from '@/lib/admin-api'
import { cn } from '@/lib/utils'

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (isLoginPage) {
      setAuthReady(true)
      return
    }

    setAuthReady(false)
    const token = getAdminAccessToken()

    if (!token) {
      router.replace('/admin/login')
      return
    }

    setAuthReady(true)
  }, [isLoginPage, pathname, router])

  const handleSignOut = () => {
    clearAdminAccessToken()
    router.replace('/admin/login')
  }

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    return segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1,
    }))
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (!authReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">
        Checking admin session...
      </div>
    )
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border/50 bg-sidebar flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
              {profile.initials}
            </div>
            <span className="font-semibold text-sidebar-foreground">Portfolio Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                )}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/admin.jpg" />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{profile.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{profile.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-between px-6">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb) => (
                  <BreadcrumbItem key={crumb.href}>
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <>
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="w-64 pl-9 h-9 bg-secondary/50 border-border/50"
                />
              </div>

              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/admin.jpg" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {profile.initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </Suspense>
    </div>
  )
}
