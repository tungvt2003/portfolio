import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { ProfileModule } from './modules/profile/profile.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { ExperiencesModule } from './modules/experiences/experiences.module'
import { SkillsModule } from './modules/skills/skills.module'
import { SettingsModule } from './modules/settings/settings.module'
import { AppController } from './app.controller'

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    ExperiencesModule,
    SkillsModule,
    SettingsModule,
  ],
})
export class AppModule {}
