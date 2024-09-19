import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInDto } from '../user/dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from 'src/user/dto/sign-up.dto';
import { Public } from 'src/decorators/public.decorator';
import { NextFunction } from 'express';
import { User } from 'src/user/entities/user.entity';
import { UserRegistrationDto } from 'src/user/dto/user-registration.dto';

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

  @Public()
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Get('sign-out')
  async signOut() {
    // @Next() next: NextFunction, // @Res() res: Response, // @Req() req: Request,
    // return this.authService.signOut(req, res, next);
    return '';
  }
}
