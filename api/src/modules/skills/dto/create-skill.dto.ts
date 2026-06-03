import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class CreateSkillDto {
  @IsString()
  category!: string

  @IsString()
  name!: string

  @IsInt()
  @Min(0)
  @Max(100)
  level!: number

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived'

  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number
}
