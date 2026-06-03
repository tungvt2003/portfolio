import { IsIn, IsObject, IsOptional, IsString } from 'class-validator'

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  siteName?: string

  @IsOptional()
  @IsIn(['en', 'vi'])
  defaultLocale?: 'en' | 'vi'

  @IsOptional()
  @IsIn(['light', 'dark', 'system'])
  defaultTheme?: 'light' | 'dark' | 'system'

  @IsOptional()
  @IsObject()
  socialLinks?: Record<string, string>
}
