import { Module } from '@nestjs/common';
import { QueueHouseRegistrationService } from './queue-house-registration.service';
import { QueueHouseRegistrationController } from './queue-house-registration.controller';
import { User } from 'src/user/entities/user.entity';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { QueueHouseRegistration } from './entities/queue-house-registration.entity';
import { Role } from 'src/role/entities/role.entity';
import { House } from 'src/house/entities/house.entity';
import { HouseController } from 'src/house/house.controller';
import { HouseService } from 'src/house/house.service';
import { Policy } from 'src/policy/entities/policy.entity';
import { PolicyController } from 'src/policy/policy.controller';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { Church } from 'src/church/entities/church.entity';
import { ChurchController } from 'src/church/church.controller';
import { ChurchService } from 'src/church/church.service';
import { MailgunService } from 'src/mailgun/mailgun.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      QueueRegister,
      QueueHouseRegistration,
      Role,
      House,
      Policy,
      ReferenceLetter,
      Church,
    ]),
    QueueRegister,
    User,
    QueueHouseRegistration,
    House,
    Church,
  ],
  controllers: [
    QueueHouseRegistrationController,
    QueueUserRegistrationController,
    UserController,
    HouseController,
    PolicyController,
    ReferenceLetterController,
    ChurchController,
  ],
  providers: [
    QueueHouseRegistrationService,
    QueueUserRegistrationService,
    UserService,
    HouseService,
    PolicyService,
    ReferenceLetterService,
    ChurchService,
    MailgunService,
  ],
})
export class QueueHouseRegistrationModule {}
