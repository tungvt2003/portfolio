import { Module } from '@nestjs/common'
import { AdminSkillsController, PublicSkillsController } from './skills.controller'
import { SkillsService } from './skills.service'

@Module({
  controllers: [PublicSkillsController, AdminSkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
