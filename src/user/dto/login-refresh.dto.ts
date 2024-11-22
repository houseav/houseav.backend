import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRefreshDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Refresh token should not be empty' })
  @IsString({ message: 'Refresh token must be a string' })
  refreshToken: string;
}

export class LoginRefreshResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token?: string;
}
