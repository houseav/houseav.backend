import { Test, TestingModule } from '@nestjs/testing';
import { HistorySessionsController } from './history-sessions.controller';
import { HistorySessionsService } from './history-sessions.service';

describe('HistorySessionsController', () => {
  let controller: HistorySessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorySessionsController],
      providers: [HistorySessionsService],
    }).compile();

    controller = module.get<HistorySessionsController>(HistorySessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
