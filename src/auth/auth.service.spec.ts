import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../user/dto/sign-in.dto';
import { User } from '../user/entities/user.entity';
import {
  mockHistorySessionLogin,
  mockUser,
} from 'src/test/mock.entities/mock.entities';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;
  let historySessionRepository: jest.Mocked<Repository<HistorySession>>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(HistorySession),
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
    historySessionRepository = module.get(getRepositoryToken(HistorySession));
    configService = module.get(ConfigService);
  });

  it('should successfully login a user', async () => {
    const mockSignInDto: SignInDto = {
      email: 'test@example.com',
      password: 'password',
    };

    userService.findByEmail.mockResolvedValue(mockUser);
    historySessionRepository.findOne.mockResolvedValue(mockHistorySessionLogin);
    jwtService.sign.mockReturnValue('mockAccessToken');
    configService.get.mockReturnValue('1h');
    historySessionRepository.update.mockResolvedValue(null);
    historySessionRepository.save.mockResolvedValue(null);

    const result = await authService.signIn(mockSignInDto);

    expect(result).toEqual({
      access_token: 'mockAccessToken',
      refresh_token: 'mockAccessToken',
      user: mockUser,
    });
    expect(historySessionRepository.update).toHaveBeenCalledWith(
      mockHistorySessionLogin.id,
      expect.objectContaining({ active: false }),
    );
    expect(historySessionRepository.save).toHaveBeenCalled();
  });

  it('should throw an UnauthorizedException for invalid email', async () => {
    const mockSignInDto: SignInDto = {
      email: 'invalid@example.com',
      password: 'password',
    };

    userService.findByEmail.mockResolvedValue(null);

    await expect(authService.signIn(mockSignInDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw an UnauthorizedException for invalid password', async () => {
    mockUser.validatePassword = jest.fn().mockResolvedValue(false);

    const mockSignInDto: SignInDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
    };

    userService.findByEmail.mockResolvedValue(mockUser);

    await expect(authService.signIn(mockSignInDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should handle no active history session gracefully', async () => {
    mockUser.validatePassword = jest.fn().mockResolvedValue(true);

    const mockSignInDto: SignInDto = {
      email: 'test@example.com',
      password: 'password',
    };

    userService.findByEmail.mockResolvedValue(mockUser);
    historySessionRepository.findOne.mockResolvedValue(null);
    jwtService.sign.mockReturnValue('mockAccessToken');
    configService.get.mockReturnValue('1h');
    historySessionRepository.save.mockResolvedValue(null);

    const result = await authService.signIn(mockSignInDto);

    expect(result).toEqual({
      access_token: 'mockAccessToken',
      refresh_token: 'mockAccessToken',
      user: mockUser,
    });
    expect(historySessionRepository.save).toHaveBeenCalled();
  });
});