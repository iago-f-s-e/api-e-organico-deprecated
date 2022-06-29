import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationNumber1656438311269 implements MigrationInterface {
    name = 'MigrationNumber1656438311269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD "number" BIGSERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "created_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "updated_at"
            SET DEFAULT 'now()'
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_transaction_number" ON "transaction" ("number")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_number"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-06-13 17:08:02.89675'
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-13 17:08:02.89675'
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP COLUMN "number"
        `);
    }

}
