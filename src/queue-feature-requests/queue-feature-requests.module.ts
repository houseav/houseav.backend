import { Module } from '@nestjs/common';
import { QueueFeatureRequestsService } from './queue-feature-requests.service';
import { QueueFeatureRequestsController } from './queue-feature-requests.controller';

@Module({
  controllers: [QueueFeatureRequestsController],
  providers: [QueueFeatureRequestsService],
})
export class QueueFeatureRequestsModule {}
