import { Injectable } from '@nestjs/common'
import { UpdateSettingsDto } from './dto/update-settings.dto'

type SettingsEntity = {
  siteName: string
  defaultLocale: 'en' | 'vi'
  defaultTheme: 'light' | 'dark' | 'system'
  socialLinks: Record<string, string>
  updatedAt: string
}

@Injectable()
export class SettingsService {
  private settings: SettingsEntity = {
    siteName: 'Van Thien Tung Portfolio',
    defaultLocale: 'en',
    defaultTheme: 'system',
    socialLinks: {
      github: 'https://github.com/tungvt2003',
      email: 'mailto:thientung57203@gmail.com',
    },
    updatedAt: new Date().toISOString(),
  }

  findPublic() {
    return {
      siteName: this.settings.siteName,
      defaultLocale: this.settings.defaultLocale,
      defaultTheme: this.settings.defaultTheme,
      socialLinks: this.settings.socialLinks,
      updatedAt: this.settings.updatedAt,
    }
  }

  findAdmin() {
    return this.settings
  }

  update(dto: UpdateSettingsDto) {
    this.settings = {
      ...this.settings,
      ...dto,
      socialLinks: dto.socialLinks
        ? {
            ...this.settings.socialLinks,
            ...dto.socialLinks,
          }
        : this.settings.socialLinks,
      updatedAt: new Date().toISOString(),
    }

    return this.settings
  }
}
