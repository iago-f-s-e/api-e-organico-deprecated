import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../entities';
import { productFixtures } from '../fixtures';

export class Product1654188370741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Product, 'product')
      .insert()
      .values(productFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Product, 'product').delete().execute();
  }
}
