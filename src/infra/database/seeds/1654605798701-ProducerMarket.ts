import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProducerMarket } from '../entities';
import { producerMarketFixtures } from '../fixtures';

export class ProducerMarket1654605798701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(ProducerMarket, 'producerMarket')
      .insert()
      .values(producerMarketFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(ProducerMarket, 'producerMarket')
      .delete()
      .execute();
  }
}
