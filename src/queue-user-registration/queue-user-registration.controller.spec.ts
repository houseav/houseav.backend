import { Test, TestingModule } from '@nestjs/testing';
import { QueueUserRegistrationController } from './queue-user-registration.controller';
import { QueueUserRegistrationService } from './queue-user-registration.service';

describe('QueueUserRegistrationController', () => {
  let controller: QueueUserRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueUserRegistrationController],
      providers: [QueueUserRegistrationService],
    }).compile();

    controller = module.get<QueueUserRegistrationController>(QueueUserRegistrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
