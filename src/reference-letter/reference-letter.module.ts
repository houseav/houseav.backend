import { Module } from '@nestjs/common';
import { ReferenceLetterService } from './reference-letter.service';
import { ReferenceLetterController } from './reference-letter.controller';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { ReferenceLetter } from './entities/reference-letter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { PolicyController } from 'src/policy/policy.controller';
import { PolicyService } from 'src/policy/policy.service';
import { Church } from 'src/church/entities/church.entity';
import { ChurchController } from 'src/church/church.controller';
import { ChurchService } from 'src/church/church.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { House } from 'src/house/entities/house.entity';
import { HouseController } from 'src/house/house.controller';
import { HouseService } from 'src/house/house.service';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';
import { QueueHouseRegistrationController } from 'src/queue-house-registration/queue-house-registration.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QueueRegister,
      QueueHouseRegistration,
      ReferenceLetter,
      User,
      Role,
      Policy,
      Church,
      House,
    ]),
    QueueRegister,
    User,
    Role,
    Church,
  ],
  controllers: [
    ReferenceLetterController,
    QueueUserRegistrationController,
    QueueHouseRegistrationController,
    UserController,
    PolicyController,
    ChurchController,
    HouseController,
  ],
  providers: [
    ReferenceLetterService,
    QueueUserRegistrationService,
    QueueHouseRegistrationService,
    UserService,
    PolicyService,
    ChurchService,
    MailgunService,
    HouseService,
  ],
})
export class ReferenceLetterModule {}
