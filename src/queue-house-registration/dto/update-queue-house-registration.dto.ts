import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQueueHouseRegistrationDto } from './create-queue-house-registration.dto';
import { CreateHouseDto } from 'src/house/dto/create-house.dto';

export class UpdateQueueHouseRegistrationDto extends PartialType(
  CreateQueueHouseRegistrationDto,
) {
  @ApiProperty({
    example: ``,
  })
  house?: CreateHouseDto;
  email?: string;
}