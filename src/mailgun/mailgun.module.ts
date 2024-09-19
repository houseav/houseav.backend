import { Module } from '@nestjs/common';
import { MailgunService } from './mailgun.service';
import { MailgunController } from './mailgun.controller';

@Module({
  controllers: [MailgunController],
  providers: [MailgunService],
})
export class MailgunModule {}
