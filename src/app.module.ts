import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
// import { HouaseavDatabaseConfig } from './database/houseav.database';
import { TestModule } from './test/test.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChurchModule } from './church/church.module';
import { BannerModule } from './banner/banner.module';
import { HouseModule } from './house/house.module';
import { QueueFeatureRequestsModule } from './queue-feature-requests/queue-feature-requests.module';
import { QueueHouseRegistrationModule } from './queue-house-registration/queue-house-registration.module';
import { QueueUserRegistrationModule } from './queue-user-registration/queue-user-registration.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { Banner } from './banner/entities/banner.entity';
import { Role } from './role/entities/role.entity';
import { Church } from './church/entities/church.entity';
import { User } from './user/entities/user.entity';
import { House } from './house/entities/house.entity';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { QueueRegister } from './queue-user-registration/entities/queue-register.entity';
import { QueueHouseRegistration } from './queue-house-registration/entities/queue-house-registration.entity';
import { ReferenceLetterModule } from './reference-letter/reference-letter.module';
import { ReferenceLetter } from './reference-letter/entities/reference-letter.entity';
import { PolicyModule } from './policy/policy.module';
import { Policy } from './policy/entities/policy.entity';
import { MailgunModule } from './mailgun/mailgun.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { ForgotPassword } from './forgot-password/entities/forgot-password.entity';
import { DatabaseInitService } from './database/init.database';

@Module({
  imports: [
    // TypeOrmModule.forRoot(HouaseavDatabaseConfig),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.prod.env' : '.local.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URI'),
          host: configService.get<string>('DATABASE_HOST'),
          database: configService.get<string>('DATABASE_NAME'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          entities: [
            Role,
            Banner,
            Church,
            User,
            House,
            QueueRegister,
            QueueHouseRegistration,
            ReferenceLetter,
            Policy,
            ForgotPassword,
          ],
          synchronize: true,
          logging: true,
        };
      },

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),

    TestModule,
    RoleModule,
    UserModule,
    ChurchModule,
    BannerModule,
    QueueFeatureRequestsModule,
    HouseModule,
    QueueHouseRegistrationModule,
    QueueUserRegistrationModule,
    AuthModule,
    ReferenceLetterModule,
    PolicyModule,
    MailgunModule,
    ForgotPasswordModule,
  ],
  controllers: [AppController],
  providers: [
    DatabaseInitService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
