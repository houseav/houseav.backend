import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty({ example: 'Motivation of the user ban' })
  @IsString({ message: 'Motivation of banner must be a string', always: true })
  @IsNotEmpty({
    message: 'Motivation of banner must be validated',
    always: true,
  })
  motivation: string;
}
