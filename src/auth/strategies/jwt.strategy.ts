import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET || 'secret',
    });
    this.usersService = usersService;
  }

  async validate(payload: JwtPayload): Promise<User> {
    let user: User;
    if (payload.email) {
      user = await this.usersService.findByEmail(payload.email);
    }
    if (user) {
      return user;
    }
    this.logger.error('User not found');
    throw new UnauthorizedException();
  }
}
