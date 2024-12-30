import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../user/dto/sign-in.dto';
import { User } from '../user/entities/user.entity';
import { SignInResponse } from './responses/sign-in.response';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as ms from 'ms';
import {
  LoginRefreshDto,
  LoginRefreshResponseDto,
} from 'src/user/dto/login-refresh.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
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
      where: {
        fkUserId: { id: user.id },
        active: true,
      },
      relations: ['fkUserId'],
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
    } else {
      console.warn('Warning: history session active not found');
    }

    const accessToken = await this.generateAccessToken(user);
    const refresh_token = await this.generateRefreshToken(user, accessToken);

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

  async signOut(request: any): Promise<string> {
    try {
      const authHeader = request.headers['authorization'];
      const token = authHeader?.split(' ')[1];
      const accessTokenJwtVerified = await this.jwtService.decode(token);
      const user: User = await this.usersService.findByEmail(
        accessTokenJwtVerified.email,
      );
      if (!user) {
        throw new UnauthorizedException('Invalid user payload');
      }

      const userHistorySessions = await this.historySessionRepository.findOne({
        where: {
          fkUserId: { id: user.id },
          active: true,
        },
        relations: ['fkUserId'],
        order: { createdAt: 'DESC' },
      });

      if (userHistorySessions) {
        // Invalidate jwt
        userHistorySessions.active = false;
        userHistorySessions.invalidateBy = 'User sign-out action';
        userHistorySessions.invalidateReason = 'User sign-out';
        await this.historySessionRepository.update(
          userHistorySessions.id,
          userHistorySessions,
        );
      } else {
        throw new UnauthorizedException('Session not found');
      }
      return 'User signed-out with success';
    } catch (error) {
      throw new Error(`Error occured while sign-out, ${error.message}`);
    }
  }

  async refreshAccessToken(
    loginRefreshDto: LoginRefreshDto,
  ): Promise<LoginRefreshResponseDto> {
    if (loginRefreshDto.refreshToken) {
      let refreshJwtVerified;
      try {
        refreshJwtVerified = await this.jwtService.verify(
          loginRefreshDto.refreshToken,
          {
            secret: this.config.get('AUTH_SECRET_REFRESH'),
          },
        );

        if (!refreshJwtVerified) {
          throw new UnauthorizedException('Unauthorized, inalid request');
        }

        const user: User = await this.usersService.findByEmail(
          refreshJwtVerified.email,
        );
        if (!user) {
          throw new UnauthorizedException('Invalid user payload');
        }

        const access_token = await this.generateAccessToken(user);
        const refresh_token = await this.generateRefreshToken(user);

        const userHistorySessions = await this.historySessionRepository.findOne(
          {
            where: {
              fkUserId: { id: user.id },
              active: true,
            },
            relations: ['fkUserId'],
            order: { createdAt: 'DESC' },
          },
        );

        if (userHistorySessions) {
          // Invalidate jwt
          userHistorySessions.access_token = access_token;
          userHistorySessions.refresh_token = refresh_token;
          userHistorySessions.active = true;
          userHistorySessions.invalidateBy = 'User refresh-token action';
          userHistorySessions.invalidateReason = 'User generate new tokens';
          await this.historySessionRepository.update(
            userHistorySessions.id,
            userHistorySessions,
          );
        } else {
          throw new UnauthorizedException('Session not found');
        }

        return { access_token, refresh_token };
      } catch (error) {
        if (error.name == 'TokenExpiredError') {
          // update history session with error
          const refreshJwtDecoded = await this.jwtService.decode(
            loginRefreshDto.refreshToken,
          );
          const user: User = await this.usersService.findByEmail(
            refreshJwtDecoded.email,
          );
          if (!user) {
            throw new UnauthorizedException('Invalid user payload');
          }

          const userHistorySessions =
            await this.historySessionRepository.findOne({
              where: {
                fkUserId: { id: user.id },
                active: true,
              },
              relations: ['fkUserId'],
              order: { createdAt: 'DESC' },
            });

          if (userHistorySessions) {
            // Invalidate jwt
            userHistorySessions.active = false;
            userHistorySessions.invalidateBy = 'User refresh-token action';
            userHistorySessions.invalidateReason =
              'User to tempt to refresh-token, but got refresh-token expired';
            await this.historySessionRepository.update(
              userHistorySessions.id,
              userHistorySessions,
            );
          } else {
            throw new UnauthorizedException(`history session active not found`);
          }
        } else {
          console.warn('Warning: history session not found');
        }
      }
    }
    throw new UnauthorizedException('User Unauthorized');
  }

  async generateRefreshToken(
    user: User,
    currentRefreshToken?: string,
  ): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.fkRoleId.id,
      type: 'refresh',
    };
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.AUTH_SECRET_REFRESH,
      expiresIn: process.env.AUTH_DURATION_REFRESH,
    });

    if (currentRefreshToken) {
      if (await this.isTokenBlackListed(currentRefreshToken, user.id)) {
        throw new UnauthorizedException('Invalid refresh token.');
      }
    }

    return newRefreshToken;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.fkRoleId.id,
      type: 'access',
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  private isTokenBlackListed(token: string, userId: number) {
    // check if the token is invalidated
    return false;
  }
}
