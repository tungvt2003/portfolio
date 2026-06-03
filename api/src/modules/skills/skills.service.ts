import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'

type SkillEntity = {
  id: string
  category: string
  name: string
  level: number
  status: 'draft' | 'published' | 'archived'
  order: number
  createdAt: string
  updatedAt: string
}

@Injectable()
export class SkillsService {
  private skills: SkillEntity[] = [
    { id: 'skill-1', category: 'frontend', name: 'React.js / Next.js', level: 90, status: 'published', order: 1, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-2', category: 'frontend', name: 'TypeScript', level: 88, status: 'published', order: 2, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-3', category: 'frontend', name: 'Tailwind CSS', level: 90, status: 'published', order: 3, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-4', category: 'state', name: 'Zustand / Redux', level: 82, status: 'published', order: 4, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-5', category: 'backend', name: 'REST API', level: 82, status: 'published', order: 5, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-6', category: 'backend', name: 'MySQL / MongoDB', level: 72, status: 'published', order: 6, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-7', category: 'devops', name: 'GitHub Actions (CI/CD)', level: 76, status: 'published', order: 7, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
    { id: 'skill-8', category: 'other', name: 'Socket.IO / i18n / SEO', level: 75, status: 'published', order: 8, createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-01-01T00:00:00.000Z' },
  ]

  findPublished() {
    return this.skills
      .filter((skill) => skill.status === 'published')
      .sort((a, b) => a.order - b.order)
  }

  findPublishedGrouped() {
    return this.findPublished().reduce<Record<string, SkillEntity[]>>((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {})
  }

  findAllAdmin() {
    return [...this.skills].sort((a, b) => a.order - b.order)
  }

  create(dto: CreateSkillDto) {
    const now = new Date().toISOString()
    const entity: SkillEntity = {
      id: `skill-${Date.now()}`,
      category: dto.category,
      name: dto.name,
      level: dto.level,
      status: dto.status ?? 'draft',
      order: dto.order ?? this.skills.length + 1,
      createdAt: now,
      updatedAt: now,
    }

    this.skills.push(entity)
    return entity
  }

  update(id: string, dto: UpdateSkillDto) {
    const index = this.skills.findIndex((skill) => skill.id === id)

    if (index < 0) {
      throw new NotFoundException('Skill not found')
    }

    const current = this.skills[index]
    const updated: SkillEntity = {
      ...current,
      ...dto,
      updatedAt: new Date().toISOString(),
    }

    this.skills[index] = updated
    return updated
  }

  remove(id: string) {
    const index = this.skills.findIndex((skill) => skill.id === id)

    if (index < 0) {
      throw new NotFoundException('Skill not found')
    }

    const [removed] = this.skills.splice(index, 1)
    return removed
  }
}
