import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Church } from 'src/church/entities/church.entity';

export class CreateUserDto {
  @ApiProperty({ example: 1, nullable: true })
  id?: number | (() => string);

  @ApiProperty({ example: `user` })
  @IsString({ message: 'Username must be a string', always: true })
  @IsNotEmpty({
    message: 'Username must be validated',
    always: true,
  })
  username: string;

  @ApiProperty({ example: `email@email.it` })
  @IsString({ message: 'Email must be a string', always: true })
  @IsNotEmpty({
    message: 'Email must be validated',
    always: true,
  })
  email: string;

  @ApiProperty({ example: `password` })
  password?: string;

  @ApiProperty({
    example: `
  "instagram":"@ig",
  "facebook":"instagram",
  `,
  })
  social?: string;

  @ApiProperty({ example: `+39 3518279265`, nullable: true })
  number: string;

  @ApiProperty({ example: `User's avatar url`, nullable: true })
  avatar: string;

  @ApiProperty({ example: `2`, nullable: true })
  roleId: string;

  // @ApiProperty({ example: `Church's user id` })
  // @IsString({ message: 'Church id must be a string', always: true })
  // @IsNotEmpty({
  //   message: 'Church id must be validated',
  //   always: true,
  // })
  // churchId: string;

  @ApiProperty({
    example: ` {
        "id": 1,
        "name": "Sabaoth Church",
        "address": "Via Rosalba Carriera 11, Milano"
    }`,
  })
  churchId: Church;

  @ApiProperty({ example: `1`, nullable: true })
  verified: boolean;
  idQueueUserRegistration?: string | number;
}
