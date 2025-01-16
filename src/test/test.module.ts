import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { HistorySessionsService } from 'src/history-sessions/history-sessions.service';
import { HistorySessionsController } from 'src/history-sessions/history-sessions.controller';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { Church } from 'src/church/entities/church.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Church,
      QueueRegister,
      Policy,
      ReferenceLetter,
      HistorySession,
    ]),
  ],
  controllers: [TestController, HistorySessionsController],
  providers: [TestService, HistorySessionsService],
})
export class TestModule {}
