import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInDto } from '../user/dto/sign-in.dto';
import { UserRegistrationDto } from 'src/user/dto/user-registration.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import {
  LoginRefreshDto,
  LoginRefreshResponseDto,
} from 'src/user/dto/login-refresh.dto';

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

  @Public()
  @Get('sign-out')
  async signOut() {
    // @Next() next: NextFunction, // @Res() res: Response, // @Req() req: Request,
    // return this.authService.signOut(req, res, next);
    return '';
  }
}
