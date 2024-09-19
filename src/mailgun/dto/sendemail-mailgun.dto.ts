// src/mailgun/dto/forgot-password.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
