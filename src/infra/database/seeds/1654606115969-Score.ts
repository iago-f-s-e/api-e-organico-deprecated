import { MigrationInterface, QueryRunner } from 'typeorm';
import { Score } from '../entities';
import { scoreFixtures } from '../fixtures';

export class Score1654606115969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder(Score, 'score')
      .insert()
      .values(scoreFixtures)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder(Score, 'score').delete().execute();
  }
}
