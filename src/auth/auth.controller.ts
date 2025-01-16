import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInDto } from '../user/dto/sign-in.dto';
import { UserRegistrationDto } from 'src/user/dto/user-registration.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import {
  AccessTokenDto,
  LoginRefreshDto,
  LoginRefreshResponseDto,
} from 'src/user/dto/login-refresh.dto';
import { AuthGuard } from '@nestjs/passport';
import { SignOutResponse } from './responses/sign-out.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @Public()
  @Post('sign-up')
  async signUp(@Body() registerUserDto: UserRegistrationDto) {
    return this.usersService.create(registerUserDto);
  }

  @Throttle({
    short: { limit: 2, ttl: 1000 },
    long: { limit: 20, ttl: 60000 },
  })
  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('refresh')
  async loginRefresh(
    @Body() loginRefreshDto: LoginRefreshDto,
  ): Promise<LoginRefreshResponseDto> {
    return await this.authService.refreshAccessToken(loginRefreshDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('sign-out')
  async signOut(@Req() request: Request): Promise<SignOutResponse> {
    return await this.authService.signOut(request);
  }
}
