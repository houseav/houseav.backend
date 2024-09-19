import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: `example@gmail.com` })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `password` })
  @IsString({ message: 'Password must be valid!' })
  password: string;
}
