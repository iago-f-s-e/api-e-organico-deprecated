import { MigrationInterface, QueryRunner } from 'typeorm';
import { UnitMeasure } from '../entities';
import { unitMeasuresFixtures } from '../fixtures';

export class UnitMeasures1654180982722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(UnitMeasure, 'unitMeasures')
      .insert()
      .values(unitMeasuresFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(UnitMeasure, 'unitMeasures').delete().execute();
  }
}
