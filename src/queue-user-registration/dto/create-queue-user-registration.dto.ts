import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateQueueUserRegistrationDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: `QueueRegister's fkUserId` })
  @IsString({ message: 'fkUserId id must be a string', always: true })
  @IsNotEmpty({
    message: 'fkUserId id must be validated',
    always: true,
  })
  fkUserId: string;
}
