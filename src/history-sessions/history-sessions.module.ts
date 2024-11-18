import { Module } from '@nestjs/common';
import { HistorySessionsService } from './history-sessions.service';
import { HistorySessionsController } from './history-sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorySession } from './entities/history-session.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorySession, User])],
  controllers: [HistorySessionsController],
  providers: [HistorySessionsService],
})
export class HistorySessionsModule {}
