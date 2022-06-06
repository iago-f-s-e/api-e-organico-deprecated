import { MigrationInterface, QueryRunner } from "typeorm";

export class Score1654543363426 implements MigrationInterface {
    name = 'Score1654543363426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "score" (
                "score_id" uuid NOT NULL,
                "user_id" uuid,
                "market_id" uuid,
                "producer_product_id" uuid,
                "transactions" integer NOT NULL DEFAULT '0',
                "rating" double precision NOT NULL DEFAULT '0',
                "ratingQuantity" integer NOT NULL DEFAULT '0',
                "totalRating" integer NOT NULL DEFAULT '0',
                CONSTRAINT "REL_0b3074ecc6d93b5f0974a83441" UNIQUE ("user_id"),
                CONSTRAINT "REL_9bf782a7cc432ed72971806e47" UNIQUE ("market_id"),
                CONSTRAINT "REL_feee02a6709e185f46612e3eb6" UNIQUE ("producer_product_id"),
                CONSTRAINT "PK_757ddc90313d9e3cf1f49d6857a" PRIMARY KEY ("score_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market" DROP CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "property" DROP CONSTRAINT "FK_152068877b8fe9d854444f4237a"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "UQ_626f808e3dff8f6073041756736" UNIQUE ("producer_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_0b3074ecc6d93b5f0974a834416" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_9bf782a7cc432ed72971806e473" FOREIGN KEY ("market_id") REFERENCES "market"("market_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "score"
            ADD CONSTRAINT "FK_feee02a6709e185f46612e3eb64" FOREIGN KEY ("producer_product_id") REFERENCES "producer_product"("producer_product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market"
            ADD CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "property"
            ADD CONSTRAINT "FK_152068877b8fe9d854444f4237a" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE "property" DROP CONSTRAINT "FK_152068877b8fe9d854444f4237a"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market" DROP CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_feee02a6709e185f46612e3eb64"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_9bf782a7cc432ed72971806e473"
        `);
        await queryRunner.query(`
            ALTER TABLE "score" DROP CONSTRAINT "FK_0b3074ecc6d93b5f0974a834416"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product" DROP CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "UQ_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            ALTER TABLE "property"
            ADD CONSTRAINT "FK_152068877b8fe9d854444f4237a" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_product"
            ADD CONSTRAINT "FK_46ea8803ccfcdc08297295dd2a8" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer_market"
            ADD CONSTRAINT "FK_8233ebe0984b6c7fbb49b121c51" FOREIGN KEY ("producer_id") REFERENCES "producer"("producer_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            DROP TABLE "score"
        `);
    }

}
