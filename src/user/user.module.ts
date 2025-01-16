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
import { House } from 'src/house/entities/house.entity';
import { HouseController } from 'src/house/house.controller';
import { HouseService } from 'src/house/house.service';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { QueueHouseRegistrationController } from 'src/queue-house-registration/queue-house-registration.controller';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';

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
      House,
      QueueHouseRegistration,
    ]),
    Role,
    Church,
    Policy,
  ],
  controllers: [
    UserController,
    HouseController,
    QueueHouseRegistrationController,
    RoleController,
    ChurchController,
    QueueUserRegistrationController,
    PolicyController,
    ReferenceLetterController,
  ],
  providers: [
    UserService,
    HouseService,
    QueueHouseRegistrationService,
    RoleService,
    ChurchService,
    QueueUserRegistrationService,
    PolicyService,
    ReferenceLetterService,
    MailgunService,
  ],
})
export class UserModule {}
