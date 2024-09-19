import { Module } from '@nestjs/common';
import { QueueUserRegistrationService } from './queue-user-registration.service';
import { QueueUserRegistrationController } from './queue-user-registration.controller';
import { UserController } from 'src/user/user.controller';
import { QueueRegister } from './entities/queue-register.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';
import { RoleController } from 'src/role/role.controller';
import { RoleService } from 'src/role/role.service';
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
      Role,
      Policy,
      ReferenceLetter,
      Church,
    ]),
    QueueRegister,
    User,
    Role,
    Church,
  ],
  controllers: [
    QueueUserRegistrationController,
    UserController,
    RoleController,
    PolicyController,
    ReferenceLetterController,
    ChurchController,
  ],
  providers: [
    QueueUserRegistrationService,
    UserService,
    RoleService,
    PolicyService,
    ReferenceLetterService,
    ChurchService,
    MailgunService,
  ],
})
export class QueueUserRegistrationModule {}
