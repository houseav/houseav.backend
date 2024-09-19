import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChurchDto {
  @ApiProperty({ example: `Church's name` })
  @IsString({ message: 'Name of the church must be a string', always: true })
  @IsNotEmpty({
    message: 'Church must be validated',
    always: true,
  })
  name: string;

  @ApiProperty({ example: `Church's address` })
  @IsString({ message: 'Address of the church must be a string', always: true })
  @IsNotEmpty({
    message: 'Address must be validated',
    always: true,
  })
  address: string;

  id?: number | string;
}
