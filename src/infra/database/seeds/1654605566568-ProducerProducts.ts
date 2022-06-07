import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProducerProduct } from '../entities';
import { producerProductFixtures } from '../fixtures';

export class ProducerProducts1654605566568 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(ProducerProduct, 'producerProduct')
      .insert()
      .values(producerProductFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(ProducerProduct, 'producerProduct')
      .delete()
      .execute();
  }
}
