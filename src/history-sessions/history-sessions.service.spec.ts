import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HistorySessionsService } from 'src/history-sessions/history-sessions.service';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { HistorySessionsController } from './history-sessions.controller';

describe('HistorySessionsService', () => {
  let service: HistorySessionsService;

  beforeEach(async () => {
    const mockDataSource = {}; // Mock DataSource as an empty object or a spy
    const mockRepository = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistorySessionsService,
        {
          provide: getRepositoryToken(HistorySession),
          useValue: mockRepository, // Mock repository
        },
        {
          provide: DataSource,
          useValue: mockDataSource, // Mock DataSource
        },
      ],
      controllers: [HistorySessionsController],
    }).compile();

    service = module.get<HistorySessionsService>(HistorySessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
