import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPassword } from './entities/forgot-password.entity';
import { User } from 'src/user/entities/user.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from 'src/role/role.controller';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { PolicyController } from 'src/policy/policy.controller';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { ChurchController } from 'src/church/church.controller';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { Policy } from 'src/policy/entities/policy.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { Church } from 'src/church/entities/church.entity';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { ChurchService } from 'src/church/church.service';
import Mailgun from 'mailgun.js';
import { MailgunService } from 'src/mailgun/mailgun.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ForgotPassword,
      User,
      Role,
      QueueRegister,
      Policy,
      ReferenceLetter,
      Church,
    ]),
    User,
    ForgotPassword,
    Role,
    QueueRegister,
    Policy,
    ReferenceLetter,
    Church,
  ],
  controllers: [
    ForgotPasswordController,
    QueueUserRegistrationController,
    RoleController,
    PolicyController,
    ReferenceLetterController,
    ChurchController,
  ],
  providers: [
    ForgotPasswordService,
    QueueUserRegistrationService,
    UserService,
    RoleService,
    PolicyService,
    ReferenceLetterService,
    ChurchService,
    MailgunService,
  ],
})
export class ForgotPasswordModule {}
