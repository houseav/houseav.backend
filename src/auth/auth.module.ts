import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleModule } from 'src/role/role.module';
import { RoleService } from 'src/role/role.service';
import { UserController } from 'src/user/user.controller';
import { RoleController } from 'src/role/role.controller';
import { Role } from 'src/role/entities/role.entity';
import { QueueRegister } from 'src/queue-user-registration/entities/queue-register.entity';
import { QueueUserRegistrationService } from 'src/queue-user-registration/queue-user-registration.service';
import { QueueFeatureRequestsController } from 'src/queue-feature-requests/queue-feature-requests.controller';
import { QueueFeatureRequest } from 'src/queue-feature-requests/entities/queue-feature-request.entity';
import { QueueFeatureRequestsService } from 'src/queue-feature-requests/queue-feature-requests.service';
import { QueueUserRegistrationController } from 'src/queue-user-registration/queue-user-registration.controller';
import { Policy } from 'src/policy/entities/policy.entity';
import { PolicyController } from 'src/policy/policy.controller';
import { PolicyService } from 'src/policy/policy.service';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { ReferenceLetterService } from 'src/reference-letter/reference-letter.service';
import { ReferenceLetterController } from 'src/reference-letter/reference-letter.controller';
import { Church } from 'src/church/entities/church.entity';
import { ChurchService } from 'src/church/church.service';
import { ChurchController } from 'src/church/church.controller';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { HistorySession } from 'src/history-sessions/entities/history-session.entity';
import { HistorySessionsService } from 'src/history-sessions/history-sessions.service';
import { HistorySessionsController } from 'src/history-sessions/history-sessions.controller';

@Module({
  imports: [
    UserModule,
    RoleModule,
    QueueRegister,
    QueueFeatureRequest,
    Policy,
    TypeOrmModule.forFeature([
      User,
      Role,
      QueueRegister,
      Policy,
      ReferenceLetter,
      Church,
      HistorySession
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('AUTH_SECRET');
        const expiresIn = configService.get<string>('AUTH_DURATION');
        return {
          secret: secret,
          signOptions: { expiresIn: expiresIn },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    RoleService,
    QueueUserRegistrationService,
    QueueFeatureRequestsService,
    PolicyService,
    ReferenceLetterService,
    ChurchService,
    MailgunService,
    HistorySessionsService,
  ],
  exports: [AuthService],
  controllers: [
    AuthController,
    UserController,
    RoleController,
    QueueUserRegistrationController,
    QueueFeatureRequestsController,
    PolicyController,
    ReferenceLetterController,
    ChurchController,
    HistorySessionsController,
  ],
})
export class AuthModule {}
