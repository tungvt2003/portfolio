import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { ProfileService } from './profile.service'

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('profile')
  getPublicProfile() {
    return this.profileService.findPublic()
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/profile')
  getAdminProfile() {
    return this.profileService.findAdmin()
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/profile')
  updateProfile(@Body() dto: UpdateProfileDto) {
    return this.profileService.update(dto)
  }
}
