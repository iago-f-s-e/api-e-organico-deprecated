import { MigrationInterface, QueryRunner } from "typeorm";

export class ProducerStatus1649299081172 implements MigrationInterface {
    name = 'ProducerStatus1649299081172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD "status" character varying NOT NULL DEFAULT 'PENDING'
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "UQ_626f808e3dff8f6073041756736" UNIQUE ("producer_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "UQ_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP COLUMN "status"
        `);
    }

}
