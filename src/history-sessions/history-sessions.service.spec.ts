import { Test, TestingModule } from '@nestjs/testing';
import { HistorySessionsService } from './history-sessions.service';

describe('HistorySessionsService', () => {
  let service: HistorySessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorySessionsService],
    }).compile();

    service = module.get<HistorySessionsService>(HistorySessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
