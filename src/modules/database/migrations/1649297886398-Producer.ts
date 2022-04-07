import { MigrationInterface, QueryRunner } from "typeorm";

export class Producer1649297886398 implements MigrationInterface {
    name = 'Producer1649297886398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "producer" (
                "producer_id" uuid NOT NULL,
                "make_delivery" boolean NOT NULL DEFAULT false,
                "certification_type" character varying NOT NULL DEFAULT 'IN CONVERSION',
                CONSTRAINT "REL_626f808e3dff8f607304175673" UNIQUE ("producer_id"),
                CONSTRAINT "PK_626f808e3dff8f6073041756736" PRIMARY KEY ("producer_id")
            )
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
            DROP TABLE "producer"
        `);
    }

}
