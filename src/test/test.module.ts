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
import { House } from 'src/house/entities/house.entity';
import { ForgotPassword } from 'src/forgot-password/entities/forgot-password.entity';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { RoleController } from 'src/role/role.controller';
import { ChurchController } from 'src/church/church.controller';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { QueueHouseRegistrationController } from 'src/queue-house-registration/queue-house-registration.controller';
import { PolicyController } from 'src/policy/policy.controller';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { HouseController } from 'src/house/house.controller';
import { ForgotPasswordController } from 'src/forgot-password/forgot-password.controller';
import { MapGeometryController } from 'src/map-geometry/map-geometry.controller';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { RoleService } from 'src/role/role.service';
import { ChurchService } from 'src/church/church.service';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { HouseService } from 'src/house/house.service';
import { ForgotPasswordService } from 'src/forgot-password/forgot-password.service';
import { MapGeometryService } from 'src/map-geometry/map-geometry.service';
import { MailgunService } from 'src/mailgun/mailgun.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Church,
      QueueRegister,
      QueueHouseRegistration,
      Policy,
      ReferenceLetter,
      HistorySession,      
      House,
      ForgotPassword,
      MapGeometry
    ]),
  ],
  controllers: [TestController,
    UserController,
    RoleController,
    ChurchController,
    QueueUserRegistrationController,
    QueueHouseRegistrationController,
    PolicyController,
    ReferenceLetterController,
    HistorySessionsController,      
    HouseController,
    ForgotPasswordController,
    MapGeometryController,
  ],
  providers: [TestService,
    UserService,
    RoleService,
    ChurchService,
    QueueUserRegistrationService,
    QueueHouseRegistrationService,
    PolicyService,
    ReferenceLetterService,
    HistorySessionsService,      
    HouseService,
    ForgotPasswordService,
    MapGeometryService,
    MailgunService,
})
export class TestModule {}
