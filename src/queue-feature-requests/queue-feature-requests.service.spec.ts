import { Test, TestingModule } from '@nestjs/testing';
import { QueueFeatureRequestsService } from './queue-feature-requests.service';

describe('QueueFeatureRequestsService', () => {
  let service: QueueFeatureRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueFeatureRequestsService],
    }).compile();

    service = module.get<QueueFeatureRequestsService>(
      QueueFeatureRequestsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
