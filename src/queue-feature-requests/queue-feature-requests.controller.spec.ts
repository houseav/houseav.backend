import { Test, TestingModule } from '@nestjs/testing';
import { QueueFeatureRequestsController } from './queue-feature-requests.controller';
import { QueueFeatureRequestsService } from './queue-feature-requests.service';

describe('QueueFeatureRequestsController', () => {
  let controller: QueueFeatureRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueFeatureRequestsController],
      providers: [QueueFeatureRequestsService],
    }).compile();

    controller = module.get<QueueFeatureRequestsController>(QueueFeatureRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
