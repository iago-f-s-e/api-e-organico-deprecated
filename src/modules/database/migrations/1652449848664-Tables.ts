import { MigrationInterface, QueryRunner } from "typeorm";

export class Tables1652449848664 implements MigrationInterface {
    name = 'Tables1652449848664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "producer" (
                "producer_id" uuid NOT NULL,
                "make_delivery" boolean NOT NULL DEFAULT false,
                "status" character varying NOT NULL DEFAULT 'PENDING',
                "certification_type" character varying NOT NULL DEFAULT 'IN CONVERSION',
                CONSTRAINT "REL_626f808e3dff8f607304175673" UNIQUE ("producer_id"),
                CONSTRAINT "PK_626f808e3dff8f6073041756736" PRIMARY KEY ("producer_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL,
                "name" character varying(150) NOT NULL,
                "phone" character varying(11) NOT NULL,
                "email" character varying(100) NOT NULL,
                "document" character varying(114) NOT NULL,
                "password" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_71fdad8489d3d818ec393e6eb14" UNIQUE ("document"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_phone" ON "user" ("phone")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_email" ON "user" ("email")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_document" ON "user" ("document")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_user_is_active" ON "user" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_user_phone_email_document" ON "user" ("phone", "email", "document")
        `);
        await queryRunner.query(`
            CREATE TABLE "address" (
                "address_id" uuid NOT NULL,
                "user_id" uuid,
                "state" character varying(35) NOT NULL,
                "city" character varying(58) NOT NULL,
                "district" character varying(150) NOT NULL,
                "street" character varying(200) NOT NULL,
                "zip_code" character varying(109) NOT NULL,
                "complement" character varying(130),
                "number" integer,
                CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "unit_measure" (
                "unit_measure_id" uuid NOT NULL,
                "name" character varying(50) NOT NULL,
                "abbreviation" character varying(10) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_3c3be7a68da958f117b88427187" UNIQUE ("name"),
                CONSTRAINT "UQ_44ed22e0844941b4697ce9418e5" UNIQUE ("abbreviation"),
                CONSTRAINT "PK_9eabff1fbf369933b1fcee9caac" PRIMARY KEY ("unit_measure_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_name" ON "unit_measure" ("name")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_abbreviation" ON "unit_measure" ("abbreviation")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_unit_measure_is_active" ON "unit_measure" ("is_active")
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_unit_measure_abbreviation_name" ON "unit_measure" ("name", "abbreviation")
        `);
        await queryRunner.query(`
            CREATE TABLE "unit_measure_product" (
                "unit_measure_id" uuid NOT NULL,
                "product_id" uuid NOT NULL,
                CONSTRAINT "PK_f53ec15066ef32782140d9d9e3c" PRIMARY KEY ("unit_measure_id", "product_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "product_id" uuid NOT NULL,
                "name" character varying(100) NOT NULL,
                "type" character varying(50) NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
                CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_product_name" ON "product" ("name")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_product_is_active" ON "product" ("is_active")
        `);
        await queryRunner.query(`
            ALTER TABLE "producer"
            ADD CONSTRAINT "FK_626f808e3dff8f6073041756736" FOREIGN KEY ("producer_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "unit_measure_product"
            ADD CONSTRAINT "FK_69f5103494c87ed46f4a57d239a" FOREIGN KEY ("unit_measure_id") REFERENCES "unit_measure"("unit_measure_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "unit_measure_product"
            ADD CONSTRAINT "FK_5a3ac5d2704c61e6bd5c200a388" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "unit_measure_product" DROP CONSTRAINT "FK_5a3ac5d2704c61e6bd5c200a388"
        `);
        await queryRunner.query(`
            ALTER TABLE "unit_measure_product" DROP CONSTRAINT "FK_69f5103494c87ed46f4a57d239a"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_35cd6c3fafec0bb5d072e24ea20"
        `);
        await queryRunner.query(`
            ALTER TABLE "producer" DROP CONSTRAINT "FK_626f808e3dff8f6073041756736"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_product_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_product_name"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP TABLE "unit_measure_product"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_abbreviation_name"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_abbreviation"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_unit_measure_name"
        `);
        await queryRunner.query(`
            DROP TABLE "unit_measure"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_phone_email_document"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_is_active"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_document"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_email"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_user_phone"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "producer"
        `);
    }

}
