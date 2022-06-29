import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDefault1656443857904 implements MigrationInterface {
    name = 'RemoveDefault1656443857904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "created_at"
            SET DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "updated_at"
            SET DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "updated_at"
            SET DEFAULT '2022-06-28 17:45:18.472243'
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ALTER COLUMN "created_at"
            SET DEFAULT '2022-06-28 17:45:18.472243'
        `);
    }

}
