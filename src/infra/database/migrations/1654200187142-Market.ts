import { MigrationInterface, QueryRunner } from "typeorm";

export class Market1654200187142 implements MigrationInterface {
    name = 'Market1654200187142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "workday" (
                "workday_id" uuid NOT NULL,
                "market_id" uuid NOT NULL,
                "weekday" character varying NOT NULL,
                "opening" character varying NOT NULL,
                "closing" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_d8c90e83b6e0384eb96e72d2ee1" PRIMARY KEY ("workday_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_workday_is_active" ON "workday" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_market_weekday" ON "workday" ("market_id", "weekday")
        `);
        await queryRunner.query(`
            CREATE TABLE "market" (
                "market_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_1a8068c93b7b3b7f483268ea117" PRIMARY KEY ("market_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_market_is_active" ON "market" ("is_active")
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD "market_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "UQ_2da624cf0abb585d301991e23cf" UNIQUE ("market_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "workday"
            ADD CONSTRAINT "FK_d80f26fcc57f1e83e72c07d8f4d" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_2da624cf0abb585d301991e23cf" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_2da624cf0abb585d301991e23cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "workday" DROP CONSTRAINT "FK_d80f26fcc57f1e83e72c07d8f4d"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "UQ_2da624cf0abb585d301991e23cf"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP COLUMN "market_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_market_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "market"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_market_weekday"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_workday_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "workday"
        `);
    }

}
