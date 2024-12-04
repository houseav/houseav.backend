import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorySessionsController } from './history-sessions.controller';
import { HistorySessionsService } from './history-sessions.service';
import { HistorySession } from './entities/history-session.entity';

describe('HistorySessionsController', () => {
  let controller: HistorySessionsController;

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorySessionsController],
      providers: [
        HistorySessionsService,
        {
          provide: getRepositoryToken(HistorySession),
          useValue: mockRepository,
        },
      ],
    }).compile();
    controller = module.get<HistorySessionsController>(
      HistorySessionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
