import { experiences as fallbackExperiences, profile as fallbackProfile, projects as fallbackProjects, skills as fallbackSkills } from '@/lib/data'

type LocalizedText = {
  en: string
  vi: string
}

type LocalizedList = {
  en: string[]
  vi: string[]
}

type ApiProfile = {
  name: string
  title: LocalizedText
  objective: LocalizedText
  location: LocalizedText
  email: string
  phone: string
  github: string
  cvUrl?: string
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
}

type ApiExperience = {
  role: LocalizedText
  company: string
  period: string
  description: LocalizedList
}

type ApiSkill = {
  category: string
  name: string
}

type ApiSkillsByCategory = Record<string, ApiSkill[]>

export type PublicProfile = {
  name: string
  role: LocalizedText
  objective: LocalizedText
  location: LocalizedText
  email: string
  phone: string
  github: string
  cvFile: string
}

export type PublicProject = {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  role: LocalizedText
  highlights: LocalizedList
  tags: string[]
  thumbnail: string
  demoUrl: string
  repoUrl: string
  status: 'draft' | 'published' | 'archived'
}

export type PublicExperience = {
  role: LocalizedText
  company: string
  period: string
  description: LocalizedList
}

export type PublicSkill = {
  name: string
  icon: string
}

export type PublicSkills = {
  frontend: PublicSkill[]
  backend: PublicSkill[]
  devops: PublicSkill[]
  tools: PublicSkill[]
}

export type PublicPortfolioData = {
  profile: PublicProfile
  projects: PublicProject[]
  experiences: PublicExperience[]
  skills: PublicSkills
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001').replace(
  /\/$/,
  ''
)

const SKILL_ICON_BY_NAME: Record<string, string> = {
  'React.js / Next.js': 'SiReact',
  TypeScript: 'SiTypescript',
  'Tailwind CSS': 'SiTailwindcss',
  'shadcn/ui, Ant Design': 'SiAntdesign',
  'React Hook Form, Yup': 'SiReacthookform',
  'REST API': 'Lucide:Webhook',
  'REST API Integration': 'Lucide:Webhook',
  'MySQL / MongoDB': 'SiMysql',
  MySQL: 'SiMysql',
  MongoDB: 'SiMongodb',
  'Information Security Basics': 'Lucide:Shield',
  'Socket.IO': 'SiSocketdotio',
  'GitHub Actions (CI/CD)': 'SiGithubactions',
  'GitHub Actions': 'SiGithubactions',
  'CI/CD Fundamentals': 'Lucide:GitBranch',
  'Staging Deployment': 'Lucide:Cloud',
  'Performance Optimization': 'Lucide:Zap',
  'SEO Basics': 'Lucide:Search',
  'Git / GitHub': 'SiGithub',
  'Figma to Code Workflow': 'SiFigma',
  Postman: 'SiPostman',
  'VS Code': 'SiVscodium',
  'Team Collaboration': 'Lucide:Users',
  'Zustand / Redux': 'Lucide:Layers3',
  'Socket.IO / i18n / SEO': 'Lucide:Layers3',
}

const CATEGORY_FALLBACK_ICON: Record<keyof PublicSkills, string> = {
  frontend: 'SiReact',
  backend: 'Lucide:Webhook',
  devops: 'SiGithubactions',
  tools: 'Lucide:Wrench',
}

const PROJECT_THUMBNAIL_BY_ID: Record<string, string> = {
  fastcare: '/portfolio/project-fastcare.png',
  'tamda-express': '/portfolio/project-tamda.png',
  'skyline-edu': '/portfolio/project-skyline.png',
}

function getFallbackPortfolioData(): PublicPortfolioData {
  return {
    profile: {
      name: fallbackProfile.name,
      role: fallbackProfile.role,
      objective: fallbackProfile.objective,
      location: fallbackProfile.location,
      email: fallbackProfile.email,
      phone: fallbackProfile.phone,
      github: fallbackProfile.github,
      cvFile: fallbackProfile.cvFile,
    },
    projects: fallbackProjects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      role: project.role,
      highlights: {
        en: [...project.highlights.en],
        vi: [...project.highlights.vi],
      },
      tags: [...project.tags],
      thumbnail: project.thumbnail,
      demoUrl: project.demoUrl,
      repoUrl: project.repoUrl,
      status: project.status,
    })),
    experiences: fallbackExperiences.map((experience) => ({
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: {
        en: [...experience.description.en],
        vi: [...experience.description.vi],
      },
    })),
    skills: {
      frontend: fallbackSkills.frontend.map((item) => ({ ...item })),
      backend: fallbackSkills.backend.map((item) => ({ ...item })),
      devops: fallbackSkills.devops.map((item) => ({ ...item })),
      tools: fallbackSkills.tools.map((item) => ({ ...item })),
    },
  }
}

async function fetchApiJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

function toPublicProfile(profile: ApiProfile): PublicProfile {
  return {
    name: profile.name,
    role: profile.title,
    objective: profile.objective,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    github: profile.github,
    cvFile: profile.cvUrl || '/CV-Van_Thien_Tung.pdf',
  }
}

function toPublicProject(project: ApiProject): PublicProject {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    role: project.role,
    highlights: project.highlights || { en: [], vi: [] },
    tags: project.tags,
    thumbnail: project.thumbnailUrl || PROJECT_THUMBNAIL_BY_ID[project.id] || '/placeholder.jpg',
    demoUrl: project.demoUrl || '',
    repoUrl: project.repoUrl || '',
    status: project.status,
  }
}

function toPublicSkills(skillsByCategory: ApiSkillsByCategory): PublicSkills {
  const mapped: PublicSkills = {
    frontend: [],
    backend: [],
    devops: [],
    tools: [],
  }

  const normalizeCategory = (category: string): keyof PublicSkills | null => {
    if (category === 'frontend' || category === 'backend' || category === 'devops') {
      return category
    }

    if (category === 'state' || category === 'other' || category === 'tools') {
      return 'tools'
    }

    return null
  }

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    const normalizedCategory = normalizeCategory(category)

    if (!normalizedCategory) {
      return
    }

    skills.forEach((skill) => {
      mapped[normalizedCategory].push({
        name: skill.name,
        icon:
          SKILL_ICON_BY_NAME[skill.name] || CATEGORY_FALLBACK_ICON[normalizedCategory],
      })
    })
  })

  return mapped
}

export async function loadPublicPortfolioData(): Promise<PublicPortfolioData> {
  const fallback = getFallbackPortfolioData()

  const [profileResult, projectsResult, experiencesResult, skillsResult] =
    await Promise.allSettled([
      fetchApiJson<ApiProfile>('/api/profile'),
      fetchApiJson<ApiProject[]>('/api/projects'),
      fetchApiJson<ApiExperience[]>('/api/experiences'),
      fetchApiJson<ApiSkillsByCategory>('/api/skills'),
    ])

  return {
    profile:
      profileResult.status === 'fulfilled'
        ? toPublicProfile(profileResult.value)
        : fallback.profile,
    projects:
      projectsResult.status === 'fulfilled'
        ? projectsResult.value.map(toPublicProject)
        : fallback.projects,
    experiences:
      experiencesResult.status === 'fulfilled'
        ? experiencesResult.value.map((item) => ({
            role: item.role,
            company: item.company,
            period: item.period,
            description: item.description,
          }))
        : fallback.experiences,
    skills:
      skillsResult.status === 'fulfilled'
        ? toPublicSkills(skillsResult.value)
        : fallback.skills,
  }
}

export { getFallbackPortfolioData }
