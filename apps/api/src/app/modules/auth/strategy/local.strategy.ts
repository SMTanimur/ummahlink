import { pick } from 'lodash'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email, password })

    if (!user) throw new UnauthorizedException('Invalid credentials')

    return pick(user.toJSON(), ['_id',  'name', 'email', 'role', 'avatar'])
  }
}