import { MigrationInterface, QueryRunner } from 'typeorm';
import { Workday } from '../entities';
import { workdayFixtures } from '../fixtures';

export class Workday1654202426800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Workday, 'workday')
      .insert()
      .values(workdayFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Workday, 'workday').delete().execute();
  }
}
