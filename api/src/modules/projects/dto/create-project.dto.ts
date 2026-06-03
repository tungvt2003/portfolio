import { Type } from 'class-transformer'
import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'

class LocalizedTextDto {
  @IsString()
  en!: string

  @IsString()
  vi!: string
}

class LocalizedListDto {
  @IsArray()
  @IsString({ each: true })
  en!: string[]

  @IsArray()
  @IsString({ each: true })
  vi!: string[]
}

export class CreateProjectDto {
  @IsOptional()
  @IsString()
  slug?: string

  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  title!: LocalizedTextDto

  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  summary!: LocalizedTextDto

  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  role!: LocalizedTextDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedListDto)
  highlights?: LocalizedListDto

  @IsArray()
  @IsString({ each: true })
  tags!: string[]

  @IsOptional()
  @IsString()
  demoUrl?: string

  @IsOptional()
  @IsString()
  repoUrl?: string

  @IsOptional()
  @IsString()
  thumbnailUrl?: string

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived'

  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number
}
