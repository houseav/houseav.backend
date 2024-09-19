import { Test, TestingModule } from '@nestjs/testing';
import { QueueUserRegistrationService } from './queue-user-registration.service';

describe('QueueUserRegistrationService', () => {
  let service: QueueUserRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueUserRegistrationService],
    }).compile();

    service = module.get<QueueUserRegistrationService>(QueueUserRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
