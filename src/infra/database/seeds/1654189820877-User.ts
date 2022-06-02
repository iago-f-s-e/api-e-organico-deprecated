import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities';
import { userFixtures } from '../fixtures';

export class User1654189820877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(User, 'user')
      .insert()
      .values(userFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(User, 'user').delete().execute();
  }
}
