import { Module } from '@nestjs/common'
import { AdminProjectsController, PublicProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'

@Module({
  controllers: [PublicProjectsController, AdminProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
