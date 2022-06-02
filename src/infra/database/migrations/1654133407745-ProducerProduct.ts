import { MigrationInterface, QueryRunner } from "typeorm";

export class ProducerProduct1654133407745 implements MigrationInterface {
    name = 'ProducerProduct1654133407745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "producer_product" (
                "producer_product_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                "producer_id" uuid NOT NULL,
                "unit_measure_id" uuid NOT NULL,
                "price" double precision NOT NULL,
                "stock" double precision NOT NULL,
                "harvest_date" date NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_4397e02b37363d30b3daae8c1ff" PRIMARY KEY ("producer_product_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_producer_product_is_active" ON "producer_product" ("is_active")
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "UQ_626f808e3dff8f6073041756736" UNIQUE ("producer_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_d19e952c391e3a1044ed21a89e3" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measure"("unit_measure_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_dcdaf3c2260f1c065d14a52f544" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_dcdaf3c2260f1c065d14a52f544"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_d19e952c391e3a1044ed21a89e3"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "UQ_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_producer_product_is_active"
        `);
        await queryRunner.query(`
            DROP TABLE "producer_product"
        `);
    }

}
