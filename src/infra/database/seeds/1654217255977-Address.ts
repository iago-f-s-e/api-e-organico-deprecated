import { MigrationInterface, QueryRunner } from 'typeorm';
import { Address } from '../entities';
import { addressFixtures } from '../fixtures';

export class Address1654217255977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Address, 'address')
      .insert()
      .values(addressFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Address, 'address').delete().execute();
  }
}
