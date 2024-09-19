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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QueueRegister,
      ReferenceLetter,
      User,
      Role,
      Policy,
      Church,
    ]),
    QueueRegister,
    User,
    Role,
    Church,
  ],
  controllers: [
    ReferenceLetterController,
    QueueUserRegistrationController,
    UserController,
    PolicyController,
    ChurchController,
  ],
  providers: [
    ReferenceLetterService,
    QueueUserRegistrationService,
    UserService,
    PolicyService,
    ChurchService,
    MailgunService,
  ],
})
export class ReferenceLetterModule {}
