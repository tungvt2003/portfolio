import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CreateExperienceDto } from './dto/create-experience.dto'
import { UpdateExperienceDto } from './dto/update-experience.dto'
import { ExperiencesService } from './experiences.service'

@Controller('experiences')
export class PublicExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  findPublished() {
    return this.experiencesService.findPublished()
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/experiences')
export class AdminExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  findAllAdmin() {
    return this.experiencesService.findAllAdmin()
  }

  @Post()
  create(@Body() dto: CreateExperienceDto) {
    return this.experiencesService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experiencesService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.experiencesService.remove(id)
  }
}
