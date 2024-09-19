import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceLetterController } from './reference-letter.controller';
import { ReferenceLetterService } from './reference-letter.service';

describe('ReferenceLetterController', () => {
  let controller: ReferenceLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceLetterController],
      providers: [ReferenceLetterService],
    }).compile();

    controller = module.get<ReferenceLetterController>(ReferenceLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
