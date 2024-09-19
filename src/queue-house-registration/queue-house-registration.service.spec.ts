import { Test, TestingModule } from '@nestjs/testing';
import { QueueHouseRegistrationService } from './queue-house-registration.service';

describe('QueueHouseRegistrationService', () => {
  let service: QueueHouseRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueHouseRegistrationService],
    }).compile();

    service = module.get<QueueHouseRegistrationService>(QueueHouseRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
