import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path';

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
      const rolesCount = await queryRunner.manager.count('Role');
      const churchesCount = await queryRunner.manager.count('Church');

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

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error during database initialization:', error);
    } finally {
      await queryRunner.release();
    }
  }
}
