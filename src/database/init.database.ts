import { DataSource } from 'typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { Church } from 'src/church/entities/church.entity';
import {
  AdminVerifier,
  QueueRegister,
} from 'src/queue-user-registration/entities/queue-register.entity';
import { ReferenceLetter } from 'src/reference-letter/entities/reference-letter.entity';
import { config } from 'dotenv';
import { Policy } from 'src/policy/entities/policy.entity';
config();

@Injectable()
export class DatabaseInitService implements OnApplicationBootstrap {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    await this.initializeDatabase();
  }

  private async initializeDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Check emptyness tables
      const rolesCount = await queryRunner.manager.count(Role);
      const churchesCount = await queryRunner.manager.count(Church);
      const policyCount = await queryRunner.manager.count(Policy);

      if (rolesCount === 0) {
        const rolesSqlPath = join(process.cwd(), 'utils', 'roles.sql');
        const rolesSql = await readFile(rolesSqlPath, 'utf8');
        await queryRunner.query(rolesSql);
        console.log('Roles table has been populated.');
      }

      if (churchesCount === 0) {
        const churchesSqlPath = join(process.cwd(), 'utils', 'churches.sql');
        const churchesSql = await readFile(churchesSqlPath, 'utf8');
        await queryRunner.query(churchesSql);
        console.log('Churches table has been populated.');
      }

      if (policyCount === 0) {
        const policySqlPath = join(process.cwd(), 'utils', 'policy.sql');
        const policySql = await readFile(policySqlPath, 'utf8');
        await queryRunner.query(policySql);
        console.log('Policy table has been populated.');
      }

      // Create the first admin user
      await this.createAdminUser(queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error during database initialization:', error);
    } finally {
      await queryRunner.release();
    }
  }

  private async createAdminUser(queryRunner) {
    const email = process.env.ADMIN_MAIL;
    const alreadyExistEmail = await queryRunner.manager.findOne(User, {
      where: { email: email },
    });

    if (alreadyExistEmail) {
      return;
    }

    // Create QueueRegister
    const queueRegister = new QueueRegister();
    queueRegister.verified = true;
    queueRegister.adminVerifier = AdminVerifier.ADMIN;
    queueRegister.createdAt = new Date('2024-09-24 18:57:52.258');
    queueRegister.updatedAt = new Date('2024-09-24 18:57:52.258');
    await queryRunner.manager.save(queueRegister);

    // Create ReferenceLetter
    const referenceLetter = new ReferenceLetter();
    referenceLetter.namePastorLeader = 'John';
    referenceLetter.surnamePastorLeader = 'Doe';
    referenceLetter.numberPastorLeader = '1234567890';
    referenceLetter.timeInChurch = new Date('2020-01-01');
    referenceLetter.dateBaptism = new Date('2020-01-01');
    referenceLetter.nameGuardian = 'Jane Doe';
    referenceLetter.numberGuardian = '0987654321';
    referenceLetter.numberChurch = '1234567890';
    referenceLetter.referenceDetails = 'Reference details';
    referenceLetter.acceptDecline = true;
    referenceLetter.fkQueueRegisterId = queueRegister;
    referenceLetter.createdAt = new Date('2024-09-24 18:57:52.258');
    referenceLetter.updatedAt = new Date('2024-09-24 18:57:52.258');
    await queryRunner.manager.save(referenceLetter);

    // Create User
    const user = new User();
    user.id = 1;
    user.email = email;
    user.avatar = 'default';
    user.username = 'admin';
    user.prefix = '+39';
    user.number = '3518279265';
    user.password = process.env.ADMIN_PSWD;
    user.createdAt = new Date('2024-09-24 18:57:52.258');
    user.updatedAt = new Date('2024-09-24 18:57:52.258');
    user.fkRoleId = await queryRunner.manager.findOne(Role, {
      where: { name: 'super-admin' },
    });
    const churches = await queryRunner.manager.find(Church, {
      order: { id: 'ASC' },
      skip: 1,
      take: 1,
    });
    user.fkChurchId = churches[0];
    user.fkQueueRegisterId = queueRegister;
    user.viewAdminChurches = 'ALL';
    await queryRunner.manager.save(user);
  }
}
