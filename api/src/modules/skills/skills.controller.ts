import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { SkillsService } from './skills.service'

@Controller('skills')
export class PublicSkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findPublishedGrouped() {
    return this.skillsService.findPublishedGrouped()
  }
}

@UseGuards(JwtAuthGuard)
@Controller('admin/skills')
export class AdminSkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAllAdmin() {
    return this.skillsService.findAllAdmin()
  }

  @Post()
  create(@Body() dto: CreateSkillDto) {
    return this.skillsService.create(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.skillsService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id)
  }
}
