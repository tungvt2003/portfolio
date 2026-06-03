import { Type } from 'class-transformer'
import {
  IsEmail,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator'

class LocalizedTextDto {
  @IsString()
  en!: string

  @IsString()
  vi!: string
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  title?: LocalizedTextDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  objective?: LocalizedTextDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  location?: LocalizedTextDto

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string

  @IsOptional()
  @IsString()
  github?: string

  @IsOptional()
  @IsString()
  cvUrl?: string
}
