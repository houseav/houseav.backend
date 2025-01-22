import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { House } from './entities/house.entity';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Role } from 'src/role/entities/role.entity';
import { RoleController } from 'src/role/role.controller';
import { RoleService } from 'src/role/role.service';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { QueueHouseRegistration } from 'src/queue-house-registration/entities/queue-house-registration.entity';
import { QueueHouseRegistrationService } from 'src/queue-house-registration/queue-house-registration.service';
import { QueueHouseRegistrationController } from 'src/queue-house-registration/queue-house-registration.controller';
import { PolicyController } from 'src/policy/policy.controller';
import { Policy } from 'src/policy/entities/policy.entity';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { Church } from 'src/church/entities/church.entity';
import { ChurchController } from 'src/church/church.controller';
import { ChurchService } from 'src/church/church.service';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { MapGeometry } from 'src/map-geometry/entities/map-geometry.entity';
import { MapGeometryController } from 'src/map-geometry/map-geometry.controller';
import { MapGeometryService } from 'src/map-geometry/map-geometry.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      House,
      Role,
      QueueRegister,
      QueueHouseRegistration,
      Policy,
      ReferenceLetter,
      Church,
      MapGeometry,
    ]),
    User,
    Role,
    QueueRegister,
    QueueHouseRegistration,
    Church,
  ],
  controllers: [
    HouseController,
    UserController,
    RoleController,
    QueueHouseRegistrationController,
    PolicyController,
    ReferenceLetterController,
    ChurchController,
    MapGeometryController,
  ],
  providers: [
    HouseService,
    UserService,
    RoleService,
    QueueHouseRegistrationService,
    PolicyService,
    ReferenceLetterService,
    ChurchService,
    MailgunService,
    MapGeometryService,
  ],
})
export class HouseModule {}
