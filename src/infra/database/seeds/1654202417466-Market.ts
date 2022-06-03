import { MigrationInterface, QueryRunner } from 'typeorm';
import { Market } from '../entities';
import { marketFixtures } from '../fixtures';

export class Market1654202417466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Market, 'market')
      .insert()
      .values(marketFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Market, 'market').delete().execute();
  }
}
