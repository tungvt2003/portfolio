import { Injectable } from '@nestjs/common'
import { UpdateProfileDto } from './dto/update-profile.dto'

type LocalizedText = {
  en: string
  vi: string
}

type ProfileEntity = {
  id: string
  name: string
  title: LocalizedText
  objective: LocalizedText
  location: LocalizedText
  email: string
  phone: string
  github: string
  cvUrl: string
}

@Injectable()
export class ProfileService {
  private profile: ProfileEntity = {
    id: 'profile-1',
    name: 'Van Thien Tung',
    title: {
      en: 'Frontend Developer',
      vi: 'Frontend Developer',
    },
    objective: {
      en: 'Frontend Developer with 1+ year of experience building scalable and user-friendly web applications using React and Next.js.',
      vi: 'Frontend Developer co hon 1 nam kinh nghiem xay dung ung dung web de mo rong bang React va Next.js.',
    },
    location: {
      en: 'Thu Duc City, Ho Chi Minh City',
      vi: 'Thu Duc, TP. Ho Chi Minh',
    },
    email: 'thientung57203@gmail.com',
    phone: '0816466357',
    github: 'https://github.com/tungvt2003',
    cvUrl: '/CV-Van_Thien_Tung.pdf',
  }

  findPublic() {
    return this.profile
  }

  findAdmin() {
    return this.profile
  }

  update(dto: UpdateProfileDto) {
    this.profile = {
      ...this.profile,
      ...dto,
      title: dto.title ? { ...this.profile.title, ...dto.title } : this.profile.title,
      objective: dto.objective
        ? { ...this.profile.objective, ...dto.objective }
        : this.profile.objective,
      location: dto.location ? { ...this.profile.location, ...dto.location } : this.profile.location,
    }

    return this.profile
  }
}
