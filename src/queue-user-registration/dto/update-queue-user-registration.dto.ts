import { PartialType } from '@nestjs/swagger';
import { CreateQueueUserRegistrationDto } from './create-queue-user-registration.dto';

export class UpdateQueueUserRegistrationDto extends PartialType(
  CreateQueueUserRegistrationDto,
) {}
