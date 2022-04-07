import { MigrationInterface, QueryRunner } from "typeorm";

export class Address1649294171567 implements MigrationInterface {
    name = 'Address1649294171567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "address" (
                "address_id" uuid NOT NULL,
                "user_id" uuid,
                "street" character varying NOT NULL,
                "number" character varying NOT NULL,
                "zip_code" character varying NOT NULL,
                "district" character varying NOT NULL,
                "city" character varying NOT NULL,
                "state" character varying NOT NULL,
                "complement" character varying NOT NULL,
                CONSTRAINT "REL_35cd6c3fafec0bb5d072e24ea2" UNIQUE ("user_id"),
                CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
    }

}
