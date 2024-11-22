import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { ForgotPasswordResponse } from './response/ForgotPasswordResponse';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('/request')
  create(
    @Body() createForgotPasswordDto: CreateForgotPasswordDto,
  ): Promise<ForgotPasswordResponse> {
    return this.forgotPasswordService.createByEmail(
      createForgotPasswordDto.email,
    );
  }

  @Put('/reset')
  reset(
    @Query() query: any,
    @Body() body: any,
  ): Promise<ForgotPasswordResponse> {
    return this.forgotPasswordService.resetPassword(query, body.newPassword);
  }

  @Get('/check')
  async checkForgotPasswordRequest(
    @Query() query: any,
  ): Promise<ForgotPasswordResponse> {
    return await this.forgotPasswordService.checkRequest(query);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.forgotPasswordService.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forgotPasswordService.findOne(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forgotPasswordService.remove(+id);
  }
}
