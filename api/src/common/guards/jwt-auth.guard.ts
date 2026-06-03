import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = unknown>(
    err: Error | null,
    user: TUser | false,
    _info: unknown,
    _context: ExecutionContext
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized')
    }

    return user
  }
}
