import { MigrationInterface, QueryRunner } from 'typeorm';
import { Producer } from '../entities';
import { producerFixtures } from '../fixtures';

export class Producer1654202403212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Producer, 'producer')
      .insert()
      .values(producerFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Producer, 'producer').delete().execute();
  }
}
