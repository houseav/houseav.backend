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
import * as ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(HistorySession)
    private historySessionRepository: Repository<HistorySession>,
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

    const userHistorySessions = await this.historySessionRepository.findOne({
      where: { fkUserId: user },
      order: { createdAt: 'DESC' },
    });

    if (userHistorySessions) {
      // Invalidate jwt
      userHistorySessions.active = false;
      userHistorySessions.invalidateBy = 'User action';
      userHistorySessions.invalidateReason = 'User Login';
      await this.historySessionRepository.update(
        userHistorySessions.id,
        userHistorySessions,
      );
    }

    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refresh_token = await this.generateRefreshToken(user.id, accessToken);

    const newHistorySession = new HistorySession();
    newHistorySession.access_token = accessToken;
    newHistorySession.refresh_token = refresh_token;
    // Convert duration to milliseconds
    const access_tokenDurationInMs = ms(process.env.AUTH_DURATION);
    const refresh_tokenDurationInMs = ms(process.env.AUTH_DURATION_REFRESH);
    if (
      access_tokenDurationInMs === undefined ||
      refresh_tokenDurationInMs === undefined
    ) {
      throw new Error('Invalid expire duration format');
    }
    const currentTime = new Date();
    const expire_access_token = new Date(
      currentTime.getTime() + access_tokenDurationInMs,
    );
    const expire_refresh_token = new Date(
      currentTime.getTime() + refresh_tokenDurationInMs,
    );
    newHistorySession.access_token_expiresAt = expire_access_token;
    newHistorySession.refresh_token_expiresAt = expire_refresh_token;
    newHistorySession.active = true;
    newHistorySession.fkUserId = user;
    // TODO to add
    // UserAgent
    // IpAddress
    await this.historySessionRepository.save(newHistorySession);
    user.password = null;
    return { access_token: accessToken, refresh_token: refresh_token, user };
  }

  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }

  async generateRefreshToken(authUserId: number, currentRefreshToken?: string) {
    console.log(
      'auth.services.js::generateRefreshTkn:process.env',
      JSON.stringify({
        secret: process.env.AUTH_SECRET_REFRESH,
        expiresIn: process.env.AUTH_DURATION_REFRESH,
      }),
    ); //TODO remove
    const newRefreshToken = this.jwtService.sign(
      { sub: authUserId },
      {
        secret: process.env.AUTH_SECRET_REFRESH,
        expiresIn: process.env.AUTH_DURATION_REFRESH,
      },
    );

    if (currentRefreshToken) {
      if (await this.isTokenBlackListed(currentRefreshToken, authUserId)) {
        throw new UnauthorizedException('Invalid refresh token.');
      }
    }

    return newRefreshToken;
  }

  private isTokenBlackListed(token: string, userId: number) {
    // check if the token is invalidated
    return false;
  }
}
