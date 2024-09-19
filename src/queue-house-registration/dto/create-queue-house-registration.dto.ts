import { CreateHouseDto } from 'src/house/dto/create-house.dto';
import { PartialType } from '@nestjs/swagger';

export class CreateQueueHouseRegistrationDto extends PartialType(
  CreateHouseDto,
) {}
