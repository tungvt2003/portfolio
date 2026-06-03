import { Module } from '@nestjs/common'
import {
  AdminExperiencesController,
  PublicExperiencesController,
} from './experiences.controller'
import { ExperiencesService } from './experiences.service'

@Module({
  controllers: [PublicExperiencesController, AdminExperiencesController],
  providers: [ExperiencesService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
