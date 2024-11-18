import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { RoleController } from 'src/role/role.controller';
import { Role } from 'src/role/entities/role.entity';
import { Church } from 'src/church/entities/church.entity';
import { ChurchController } from 'src/church/church.controller';
import { ChurchService } from 'src/church/church.service';
import { QueueRegister } from '../queue-user-registration/entities/queue-register.entity';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { Policy } from 'src/policy/entities/policy.entity';
import { PolicyController } from 'src/policy/policy.controller';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Church,
      QueueRegister,
      Policy,
      ReferenceLetter,
      HistorySession
    ]),
    QueueRegister,
    Role,
    Church,
    Policy,
  ],
  controllers: [
    UserController,
    RoleController,
    ChurchController,
    QueueUserRegistrationController,
    PolicyController,
    ReferenceLetterController,
  ],
  providers: [
    UserService,
    RoleService,
    ChurchService,
    QueueUserRegistrationService,
    PolicyService,
    ReferenceLetterService,
    MailgunService,
  ],
})
export class UserModule {}
