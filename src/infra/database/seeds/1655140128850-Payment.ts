import { MigrationInterface, QueryRunner } from 'typeorm';
import { Payment } from '../entities';
import { paymentFixtures } from '../fixtures';

export class Payment1655140128850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Payment, 'payment')
      .insert()
      .values(paymentFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Payment, 'payment').delete().execute();
  }
}
