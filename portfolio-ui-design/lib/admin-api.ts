import type { Project } from '@/lib/admin-types'

type LocalizedText = {
  en: string
  vi: string
}

type LocalizedList = {
  en: string[]
  vi: string[]
}

type ApiProject = {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  role: LocalizedText
  highlights?: LocalizedList
  tags: string[]
  demoUrl?: string
  repoUrl?: string
  thumbnailUrl?: string
  status: 'draft' | 'published' | 'archived'
  order: number
  createdAt: string
  updatedAt: string
}

type LoginResponse = {
  accessToken: string
  tokenType: 'Bearer'
  expiresIn: number
  user: {
    id: string
    email: string
    role: 'admin'
  }
}

export type AdminSettings = {
  siteName: string
  defaultLocale: 'en' | 'vi'
  defaultTheme: 'light' | 'dark' | 'system'
  socialLinks: Record<string, string>
  updatedAt: string
}

type AdminSettingsResponse = {
  user: Record<string, unknown>
  settings: AdminSettings
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001').replace(
  /\/$/,
  ''
)

const ADMIN_ACCESS_TOKEN_KEY = 'portfolio_admin_access_token'

const DEFAULT_PROJECT_ROLE: LocalizedText = {
  en: 'Frontend Developer',
  vi: 'Frontend Developer',
}

function isBrowser() {
  return typeof window !== 'undefined'
}

export function getAdminAccessToken() {
  if (!isBrowser()) {
    return null
  }

  return window.localStorage.getItem(ADMIN_ACCESS_TOKEN_KEY)
}

export function setAdminAccessToken(token: string) {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(ADMIN_ACCESS_TOKEN_KEY, token)
}

export function clearAdminAccessToken() {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(ADMIN_ACCESS_TOKEN_KEY)
}

async function requestApi<T>(
  path: string,
  init?: RequestInit,
  options?: { requiresAuth?: boolean }
): Promise<T> {
  const requiresAuth = options?.requiresAuth ?? false
  const token = getAdminAccessToken()

  if (requiresAuth && !token) {
    throw new Error('Missing access token')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(requiresAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminAccessToken()
    }

    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

function toProject(apiProject: ApiProject): Project {
  return {
    id: apiProject.id,
    slug: apiProject.slug,
    role: apiProject.role,
    title: apiProject.title,
    summary: apiProject.summary,
    repoUrl: apiProject.repoUrl || '',
    demoUrl: apiProject.demoUrl || '',
    tags: apiProject.tags,
    status: apiProject.status,
    order: apiProject.order,
    thumbnailUrl: apiProject.thumbnailUrl || '/placeholder.jpg',
    galleryUrls: [],
    createdAt: new Date(apiProject.createdAt),
    updatedAt: new Date(apiProject.updatedAt),
  }
}

function toApiProjectPayload(data: Partial<Project>, current?: Project) {
  const title = data.title ?? current?.title
  const summary = data.summary ?? current?.summary

  if (!title || !summary) {
    throw new Error('Title and summary are required')
  }

  return {
    slug: data.slug ?? current?.slug,
    title,
    summary,
    role: data.role ?? current?.role ?? DEFAULT_PROJECT_ROLE,
    tags: data.tags ?? current?.tags ?? [],
    demoUrl: data.demoUrl ?? current?.demoUrl ?? '',
    repoUrl: data.repoUrl ?? current?.repoUrl ?? '',
    thumbnailUrl: data.thumbnailUrl ?? current?.thumbnailUrl ?? '/placeholder.jpg',
    status: data.status ?? current?.status ?? 'draft',
    order: data.order ?? current?.order ?? 1,
  }
}

export async function loginAdmin(email: string, password: string) {
  return requestApi<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function fetchAdminProjects() {
  const projects = await requestApi<ApiProject[]>('/api/admin/projects', undefined, {
    requiresAuth: true,
  })

  return projects.map(toProject)
}

export async function createAdminProject(data: Partial<Project>) {
  const payload = toApiProjectPayload(data)
  const project = await requestApi<ApiProject>(
    '/api/admin/projects',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    { requiresAuth: true }
  )

  return toProject(project)
}

export async function updateAdminProject(current: Project, data: Partial<Project>) {
  const payload = toApiProjectPayload(data, current)
  const project = await requestApi<ApiProject>(
    `/api/admin/projects/${current.id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
    { requiresAuth: true }
  )

  return toProject(project)
}

export async function deleteAdminProject(id: string) {
  await requestApi<ApiProject>(
    `/api/admin/projects/${id}`,
    {
      method: 'DELETE',
    },
    { requiresAuth: true }
  )
}

export async function fetchAdminSettings() {
  const response = await requestApi<AdminSettingsResponse>('/api/admin/settings', undefined, {
    requiresAuth: true,
  })

  return response.settings
}

export async function updateAdminSettings(data: Partial<AdminSettings>) {
  return requestApi<AdminSettings>(
    '/api/admin/settings',
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
    { requiresAuth: true }
  )
}
