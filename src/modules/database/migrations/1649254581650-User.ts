import { MigrationInterface, QueryRunner } from "typeorm";

export class User1649254581650 implements MigrationInterface {
    name = 'User1649254581650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL,
                "phone" character varying(11) NOT NULL,
                "document" character varying(11) NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"),
                CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14" UNIQUE ("document"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
