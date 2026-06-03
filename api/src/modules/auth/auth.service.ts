import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

type AuthPayload = {
  sub: string
  email: string
  role: 'admin'
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  login(dto: LoginDto) {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL', 'admin@portfolio.local')
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD', 'change-me')

    if (dto.email !== adminEmail || dto.password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: AuthPayload = {
      sub: 'admin-user',
      email: dto.email,
      role: 'admin',
    }

    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN_SECONDS', 86400),
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      },
    }
  }
}
