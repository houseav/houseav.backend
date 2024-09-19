import { Test, TestingModule } from '@nestjs/testing';
import { QueueHouseRegistrationController } from './queue-house-registration.controller';
import { QueueHouseRegistrationService } from './queue-house-registration.service';

describe('QueueHouseRegistrationController', () => {
  let controller: QueueHouseRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueHouseRegistrationController],
      providers: [QueueHouseRegistrationService],
    }).compile();

    controller = module.get<QueueHouseRegistrationController>(QueueHouseRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
