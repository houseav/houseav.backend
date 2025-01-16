import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Church } from 'src/church/entities/church.entity';

// Common DTO Fields
export class BaseUserDto {
  @ApiProperty({ example: `user` })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username must be validated' })
  username: string;

  @ApiProperty({ example: `email@email.it` })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email must be validated' })
  email: string;

  @ApiProperty({ example: `+39 3518279265`, nullable: true })
  number: string;

  @ApiProperty({ example: `User's avatar url`, nullable: true })
  avatar: string;

  @ApiProperty({ example: `2`, nullable: true })
  roleId: string;

  @ApiProperty({
    example: `{
        "id": 1,
        "name": "Sabaoth Church",
        "address": "Via Rosalba Carriera 11, Milano"
    }`,
  })
  churchId: Church;

  @ApiProperty({ example: `1`, nullable: true })
  verified: boolean;
}

// DTO Requiring a Password
export class CreateUserWithPasswordDto extends BaseUserDto {
  @ApiProperty({ example: `password` })
  @IsNotEmpty({ message: 'Password must be provided' })
  @IsString()
  @Length(8, 100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}

// DTO Without a Password
export class CreateUserWithoutPasswordDto extends BaseUserDto {
  @ApiProperty({ example: `password`, required: false })
  password?: string; // Optional
}
