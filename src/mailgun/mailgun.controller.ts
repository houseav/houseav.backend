import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailgunService } from './mailgun.service';
import { SendEmailDto } from './dto/sendemail-mailgun.dto';
import { ForgotPasswordDto } from './dto/forgotpassword-mailgun.dto';

@Controller('mailgun')
export class MailgunController {
  constructor(private readonly mailgunService: MailgunService) {}

  @Post('/send-email')
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully.',
    type: String,
  })
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<any> {
    return await this.mailgunService.sendEmail(sendEmailDto.email);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void> {
    const temporaryPassword = 'rsferfrwfa';
    await this.mailgunService.sendForgotPasswordEmail(
      temporaryPassword,
      forgotPasswordDto.email,
      forgotPasswordDto.timeCreation,
    );
  }
}
