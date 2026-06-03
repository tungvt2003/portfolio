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

export class CreateExperienceDto {
  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedTextDto)
  role!: LocalizedTextDto

  @IsString()
  company!: string

  @IsString()
  period!: string

  @IsObject()
  @ValidateNested()
  @Type(() => LocalizedListDto)
  description!: LocalizedListDto

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived'

  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number
}
