import { Injectable } from '@nestjs/common';
import { CreateQueueFeatureRequestDto } from './dto/create-queue-feature-request.dto';
import { UpdateQueueFeatureRequestDto } from './dto/update-queue-feature-request.dto';

@Injectable()
export class QueueFeatureRequestsService {
  create(createQueueFeatureRequestDto: CreateQueueFeatureRequestDto) {
    return 'This action adds a new queueFeatureRequest';
  }

  findAll() {
    return `This action returns all queueFeatureRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queueFeatureRequest`;
  }

  update(
    id: number,
    updateQueueFeatureRequestDto: UpdateQueueFeatureRequestDto,
  ) {
    return `This action updates a #${id} queueFeatureRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} queueFeatureRequest`;
  }
}
