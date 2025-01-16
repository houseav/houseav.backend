import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UpdateQueueUserRegistrationDto } from './update-queue-user-registration.dto';
import { IsString } from 'class-validator';
import { BaseUserDto } from 'src/user/dto/create-user.dto';

export class UpdateQueueUserRegistrationVerifyDto extends PartialType(
  UpdateQueueUserRegistrationDto,
) {
  @ApiProperty({ example: `Verify token User Queue Register` })
  @IsString({ message: 'Token' })
  token: string;

  @ApiProperty({
    example: `{  "username": "user",
  "email": "email@email.it",
  "password": "password",
  "social": "\n  \"instagram\":\"@ig\",\n  \"facebook\":\"instagram\",\n  ",
  "number": "+39 3518279265",
  "avatar": "User's avatar url",
  "roleId": "2",
  "churchId": {
    "id": 1,
    "name": "Sabaoth Church",
    "address": "Via Rosalba Carriera 11, Milano"
  }}`,
  })
  user?: BaseUserDto;
}
