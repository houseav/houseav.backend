import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailgunService } from './mailgun.service';
import { SendEmailDto } from './dto/sendemail-mailgun.dto';
import { ForgotPasswordDto } from './dto/forgotpassword-mailgun.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/decorators/public.decorator';
import { generateSecurePassword } from 'utils/functions';

@Controller('mailgun')
export class MailgunController {
  constructor(private readonly mailgunService: MailgunService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/send-email')
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully.',
    type: String,
  })
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<any> {
    return await this.mailgunService.sendEmail(
      sendEmailDto.email,
      sendEmailDto.username,
    );
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<any> {
    try {
      forgotPasswordDto.timeCreation = parseAndValidateDate(
        '2025-01-28T10:14:29.279Z',
      );
    } catch (error) {
      throw new Error('Time creation is not valid');
    }

    const temporaryPassword = generateSecurePassword(12);
    return await this.mailgunService.sendForgotPasswordEmail(
      temporaryPassword,
      forgotPasswordDto.email,
      forgotPasswordDto.timeCreation,
    );
  }

  @Public()
  @Post('/user-verified')
  async sendEmailUserVerified(
    @Body() sendEmailDto: SendEmailDto,
  ): Promise<any> {
    return await this.mailgunService.sendEmailUserVerified(
      sendEmailDto.email,
      sendEmailDto.username,
    );
  }

  @Public()
  @Post('/house-verified')
  async sendEmailHouseVerified(
    @Body() sendEmailDto: SendEmailDto,
    @Body() houseTitle: string,
  ): Promise<any> {
    return await this.mailgunService.sendEmailHouseVerified(
      sendEmailDto.email,
      houseTitle,
    );
  }
}

function parseAndValidateDate(dateString: string) {
  if (typeof dateString !== 'string') {
    throw new Error('Input is not a string.');
  }

  // Check if the string matches the ISO 8601 date format
  const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  if (!iso8601Regex.test(dateString)) {
    throw new Error(
      'Invalid date format. Expected ISO 8601 format (e.g., 2025-01-28T10:14:29.279Z).',
    );
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date value.');
  }

  return date;
}
