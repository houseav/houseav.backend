import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceLetterService } from './reference-letter.service';

describe('ReferenceLetterService', () => {
  let service: ReferenceLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferenceLetterService],
    }).compile();

    service = module.get<ReferenceLetterService>(ReferenceLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
