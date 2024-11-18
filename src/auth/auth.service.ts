import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../user/dto/sign-in.dto';
import { User } from '../user/entities/user.entity';
import { SignInResponse } from './responses/sign-in.response';
import { Request, Response, NextFunction } from 'express';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(HistorySession)
    private historySessionRepository: Repository<HistorySession>
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const { email, password } = signInDto;

    const user: User = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid: boolean = await user.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);


    user.password = null;
    return { access_token: accessToken, user };
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }
}
