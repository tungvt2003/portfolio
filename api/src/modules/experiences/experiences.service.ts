import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'

type LocalizedText = { en: string; vi: string }
type LocalizedList = { en: string[]; vi: string[] }

type ExperienceEntity = {
  id: string
  role: LocalizedText
  company: string
  period: string
  description: LocalizedList
  status: 'draft' | 'published' | 'archived'
  order: number
  createdAt: string
  updatedAt: string
}

@Injectable()
export class ExperiencesService {
  private experiences: ExperienceEntity[] = [
    {
      id: 'exp-1',
      role: { en: 'Frontend Developer', vi: 'Frontend Developer' },
      company: 'DANSOLUTIONS Technology Co., Ltd',
      period: '08/2024 - Present',
      description: {
        en: [
          'Built modern frontend products with React and Next.js.',
          'Delivered reusable component architecture and REST API integration.',
          'Supported CI/CD and staging deployment setup.',
        ],
        vi: [
          'Phat trien san pham frontend hien dai bang React va Next.js.',
          'Xay dung kien truc component tai su dung va tich hop REST API.',
          'Ho tro thiet lap CI/CD va moi truong staging.',
        ],
      },
      status: 'published',
      order: 1,
      createdAt: '2024-08-01T00:00:00.000Z',
      updatedAt: '2025-01-10T00:00:00.000Z',
    },
    {
      id: 'exp-2',
      role: { en: 'IT Tutor / Teaching Assistant', vi: 'IT Tutor / Teaching Assistant' },
      company: 'GREEN ACADEMY',
      period: '09/2022 - 09/2023',
      description: {
        en: [
          'Supported learners in coding practice and assignment completion.',
          'Mentored students on frontend fundamentals and debugging workflow.',
        ],
        vi: [
          'Ho tro hoc vien luyen tap lap trinh va hoan thanh bai tap.',
          'Huong dan kien thuc frontend co ban va quy trinh debug.',
        ],
      },
      status: 'published',
      order: 2,
      createdAt: '2022-09-01T00:00:00.000Z',
      updatedAt: '2023-09-01T00:00:00.000Z',
    },
  ]

  findPublished() {
    return this.experiences
      .filter((experience) => experience.status === 'published')
      .sort((a, b) => a.order - b.order)
  }

  findAllAdmin() {
    return [...this.experiences].sort((a, b) => a.order - b.order)
  }

  create(dto: CreateExperienceDto) {
    const now = new Date().toISOString()
    const entity: ExperienceEntity = {
      id: `exp-${Date.now()}`,
      role: dto.role,
      company: dto.company,
      period: dto.period,
      description: dto.description,
      status: dto.status ?? 'draft',
      order: dto.order ?? this.experiences.length + 1,
      createdAt: now,
      updatedAt: now,
    }

    this.experiences.push(entity)
    return entity
  }

  update(id: string, dto: UpdateExperienceDto) {
    const index = this.experiences.findIndex((item) => item.id === id)

    if (index < 0) {
      throw new NotFoundException('Experience not found')
    }

    const current = this.experiences[index]
    const updated: ExperienceEntity = {
      ...current,
      ...dto,
      role: dto.role ? { ...current.role, ...dto.role } : current.role,
      description: dto.description
        ? {
            en: dto.description.en ?? current.description.en,
            vi: dto.description.vi ?? current.description.vi,
          }
        : current.description,
      updatedAt: new Date().toISOString(),
    }

    this.experiences[index] = updated
    return updated
  }

  remove(id: string) {
    const index = this.experiences.findIndex((item) => item.id === id)

    if (index < 0) {
      throw new NotFoundException('Experience not found')
    }

    const [removed] = this.experiences.splice(index, 1)
    return removed
  }
}
