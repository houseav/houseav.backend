import { PartialType } from '@nestjs/swagger';
import { CreateQueueFeatureRequestDto } from './create-queue-feature-request.dto';

export class UpdateQueueFeatureRequestDto extends PartialType(
  CreateQueueFeatureRequestDto,
) {}
