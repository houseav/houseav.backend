import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateForgotPasswordDto {
  @ApiProperty({
    description: 'The token associated with the forgot password request.',
    example: 'abc123456789',
  })
  @IsString()
  token?: string;

  @ApiProperty({
    description: 'Email to request forgot password access page.',
    example: 'test@gmail.com',
  })
  @IsString()
  email?: string;

  @ApiProperty({
    description:
      'The ID of the user associated with this forgot password request.',
    example: 1,
  })
  fkUserId?: number;
}
