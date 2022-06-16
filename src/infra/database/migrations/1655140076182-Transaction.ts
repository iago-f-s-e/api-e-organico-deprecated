import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1655140076182 implements MigrationInterface {
    name = 'Transaction1655140076182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "payment" (
                "payment_id" uuid NOT NULL,
                "name" character varying NOT NULL,
                "type" character varying NOT NULL DEFAULT 'in-person',
                CONSTRAINT "UQ_06a96865bf0d5a224c8dc13c653" UNIQUE ("name"),
                CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_payment_name" ON "payment" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_payment_type" ON "payment" ("type")
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction-product" (
                "transaction_product_id" uuid NOT NULL,
                "transaction_id" uuid NOT NULL,
                "producer_product_id" uuid NOT NULL,
                "quantity" double precision NOT NULL,
                "total" double precision NOT NULL,
                CONSTRAINT "PK_ce04430a66074435ace998a1c88" PRIMARY KEY ("transaction_product_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "transaction" (
                "transaction_id" uuid NOT NULL,
                "consumer_id" uuid NOT NULL,
                "producer_id" uuid NOT NULL,
                "payment_id" uuid NOT NULL,
                "selected_day_id" uuid,
                "market_id" uuid,
                "address_id" uuid,
                "total" double precision NOT NULL,
                "product_quantity" integer NOT NULL,
                "type" character varying NOT NULL,
                "status" character varying NOT NULL DEFAULT 'waiting-for-confirmation-from-the-producer',
                "description" character varying,
                "observation" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()',
                CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_transaction_type" ON "transaction" ("type")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_transaction_status" ON "transaction" ("status")
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product"
            ADD CONSTRAINT "FK_5034d3c96745310dcaf233ac19a" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product"
            ADD CONSTRAINT "FK_1953727aaf08bbffc38fb52ea86" FOREIGN KEY ("producer_product_id") REFERENCES "producer_product"("producer_product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_2285b911ae40ffa022e1e89ac1f" FOREIGN KEY ("consumer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_44af915369fd5e0341ac72cffa7" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_87d332611ebc2beababe8dc4d18" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_ad89e073f3af18bfce77743960c" FOREIGN KEY ("selected_day_id") REFERENCES "workday"("workday_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_bcaea95123d1e8248a3129ac39d" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction"
            ADD CONSTRAINT "FK_db254bac06d7e6099a5024b33a7" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_db254bac06d7e6099a5024b33a7"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_bcaea95123d1e8248a3129ac39d"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_ad89e073f3af18bfce77743960c"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_87d332611ebc2beababe8dc4d18"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_44af915369fd5e0341ac72cffa7"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction" DROP CONSTRAINT "FK_2285b911ae40ffa022e1e89ac1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product" DROP CONSTRAINT "FK_1953727aaf08bbffc38fb52ea86"
        `);
        await queryRunner.query(`
            ALTER TABLE "transaction-product" DROP CONSTRAINT "FK_5034d3c96745310dcaf233ac19a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_status"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_transaction_type"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction"
        `);
        await queryRunner.query(`
            DROP TABLE "transaction-product"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_payment_type"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_payment_name"
        `);
        await queryRunner.query(`
            DROP TABLE "payment"
        `);
    }

}
