import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateChurchDto } from 'src/church/dto/create-church.dto';
import { Church } from 'src/church/entities/church.entity';

export class SignUpDto {
  @ApiProperty({ example: `username` })
  @IsString()
  username: string;

  @ApiProperty({ example: `example@gmail.com` })
  @IsEmail()
  email: string;

  @ApiProperty({ example: `3518279265` })
  @IsString()
  number: string;

  @ApiProperty({ example: `+39` })
  @IsString()
  prefix: string;

  @ApiProperty({ example: `password` })
  @IsString()
  password: string;

  @IsString()
  hashedPassword?: string;

  @ApiProperty({
    example: ` {
        "id": 1,
        "name": "Sabaoth Church",
        "address": "Via Rosalba Carriera 11, Milano"
    }`,
  })
  churchId: CreateChurchDto;
}
