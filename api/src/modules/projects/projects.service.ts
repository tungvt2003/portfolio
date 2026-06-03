import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

type LocalizedText = {
  en: string
  vi: string
}

type LocalizedList = {
  en: string[]
  vi: string[]
}

type ProjectEntity = {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  role: LocalizedText
  highlights: LocalizedList
  tags: string[]
  demoUrl: string
  repoUrl: string
  thumbnailUrl: string
  status: 'draft' | 'published' | 'archived'
  order: number
  createdAt: string
  updatedAt: string
}

@Injectable()
export class ProjectsService {
  private projects: ProjectEntity[] = [
    {
      id: 'project-1',
      slug: 'fastcare-phone-laptop-repair',
      title: {
        en: 'FastCare - Phone & Laptop Repair System',
        vi: 'FastCare - He thong sua chua dien thoai va laptop',
      },
      summary: {
        en: 'Customer-facing website and admin dashboard for repair service management.',
        vi: 'Website ban hang cho khach va dashboard admin de quan ly dich vu sua chua.',
      },
      role: {
        en: 'Frontend Developer & DevOps',
        vi: 'Frontend Developer & DevOps',
      },
      highlights: {
        en: [
          'Built responsive UI from Figma.',
          'Implemented admin modules and API integration.',
          'Configured basic CI/CD and staging deployment.',
        ],
        vi: [
          'Trien khai UI responsive tu Figma.',
          'Xay dung module admin va tich hop API.',
          'Thiet lap CI/CD co ban va staging deployment.',
        ],
      },
      tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'REST API', 'GitHub Actions'],
      demoUrl: '',
      repoUrl: 'https://github.com/tungvt2003',
      thumbnailUrl: '/placeholder.jpg',
      status: 'published',
      order: 1,
      createdAt: '2024-08-01T00:00:00.000Z',
      updatedAt: '2025-01-10T00:00:00.000Z',
    },
    {
      id: 'project-2',
      slug: 'tamda-express-logistics-management',
      title: {
        en: 'Tamda Express - Logistics Management System',
        vi: 'Tamda Express - He thong quan ly van tai',
      },
      summary: {
        en: 'Operations-focused logistics platform with realtime updates.',
        vi: 'Nen tang logistics tap trung van hanh voi cap nhat realtime.',
      },
      role: {
        en: 'Frontend Developer',
        vi: 'Frontend Developer',
      },
      highlights: {
        en: [
          'Delivered CRUD for drivers, orders, and trips.',
          'Implemented map-based scheduling and Socket.IO realtime flow.',
          'Optimized rendering for high-volume data lists.',
        ],
        vi: [
          'Phat trien CRUD cho tai xe, don hang va chuyen di.',
          'Trien khai lap lich map-based va cap nhat Socket.IO realtime.',
          'Toi uu rendering cho danh sach du lieu lon.',
        ],
      },
      tags: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'Socket.IO', 'REST API'],
      demoUrl: '',
      repoUrl: 'https://github.com/tungvt2003',
      thumbnailUrl: '/placeholder.jpg',
      status: 'published',
      order: 2,
      createdAt: '2024-10-01T00:00:00.000Z',
      updatedAt: '2025-01-12T00:00:00.000Z',
    },
    {
      id: 'project-3',
      slug: 'skyline-edu-website-cms',
      title: {
        en: 'Skyline Edu - Education Website & CMS',
        vi: 'Skyline Edu - Website giao duc va CMS',
      },
      summary: {
        en: 'Education platform for public website and internal CMS.',
        vi: 'Nen tang giao duc cho website nguoi dung va CMS noi bo.',
      },
      role: {
        en: 'Frontend Developer',
        vi: 'Frontend Developer',
      },
      highlights: {
        en: [
          'Built responsive UI and reusable component architecture.',
          'Integrated API contracts and i18n-friendly content structure.',
          'Configured GitHub Actions for staging deployment.',
        ],
        vi: [
          'Xay dung UI responsive va kien truc component tai su dung.',
          'Tich hop API va cau truc noi dung ho tro i18n.',
          'Thiet lap GitHub Actions cho staging deployment.',
        ],
      },
      tags: ['Next.js', 'Tailwind CSS', 'i18n', 'shadcn/ui', 'REST API', 'GitHub Actions'],
      demoUrl: '',
      repoUrl: 'https://github.com/tungvt2003',
      thumbnailUrl: '/placeholder.jpg',
      status: 'published',
      order: 3,
      createdAt: '2025-01-05T00:00:00.000Z',
      updatedAt: '2025-02-15T00:00:00.000Z',
    },
  ]

  findPublished() {
    return this.projects
      .filter((project) => project.status === 'published')
      .sort((a, b) => a.order - b.order)
  }

  findBySlug(slug: string) {
    const project = this.projects.find((item) => item.slug === slug && item.status === 'published')

    if (!project) {
      throw new NotFoundException('Project not found')
    }

    return project
  }

  findAllAdmin() {
    return [...this.projects].sort((a, b) => a.order - b.order)
  }

  create(dto: CreateProjectDto) {
    const now = new Date().toISOString()
    const project: ProjectEntity = {
      id: `project-${Date.now()}`,
      slug: dto.slug ?? this.slugify(dto.title.en),
      title: dto.title,
      summary: dto.summary,
      role: dto.role,
      highlights: dto.highlights ?? { en: [], vi: [] },
      tags: dto.tags,
      demoUrl: dto.demoUrl ?? '',
      repoUrl: dto.repoUrl ?? '',
      thumbnailUrl: dto.thumbnailUrl ?? '/placeholder.jpg',
      status: dto.status ?? 'draft',
      order: dto.order ?? this.projects.length + 1,
      createdAt: now,
      updatedAt: now,
    }

    this.projects.push(project)

    return project
  }

  update(id: string, dto: UpdateProjectDto) {
    const index = this.projects.findIndex((project) => project.id === id)

    if (index < 0) {
      throw new NotFoundException('Project not found')
    }

    const current = this.projects[index]
    const updated: ProjectEntity = {
      ...current,
      ...dto,
      title: dto.title ? { ...current.title, ...dto.title } : current.title,
      summary: dto.summary ? { ...current.summary, ...dto.summary } : current.summary,
      role: dto.role ? { ...current.role, ...dto.role } : current.role,
      highlights: dto.highlights
        ? {
            en: dto.highlights.en ?? current.highlights.en,
            vi: dto.highlights.vi ?? current.highlights.vi,
          }
        : current.highlights,
      slug: dto.slug ?? current.slug,
      updatedAt: new Date().toISOString(),
    }

    this.projects[index] = updated

    return updated
  }

  remove(id: string) {
    const index = this.projects.findIndex((project) => project.id === id)

    if (index < 0) {
      throw new NotFoundException('Project not found')
    }

    const [deleted] = this.projects.splice(index, 1)

    return deleted
  }

  private slugify(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }
}
