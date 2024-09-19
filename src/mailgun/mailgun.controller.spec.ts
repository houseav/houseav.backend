import { Test, TestingModule } from '@nestjs/testing';
import { MailgunController } from './mailgun.controller';
import { MailgunService } from './mailgun.service';

describe('MailgunController', () => {
  let controller: MailgunController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailgunController],
      providers: [MailgunService],
    }).compile();

    controller = module.get<MailgunController>(MailgunController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
