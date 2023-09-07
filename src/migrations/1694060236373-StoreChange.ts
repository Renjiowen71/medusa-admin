import { MigrationInterface, QueryRunner } from "typeorm"

export class StoreChange1694060236373 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store" 
            ADD "longitudes" Decimal(9,6),
            ADD "latitudes" Decimal(8,6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "store" 
            DROP COLUMN "longitudes", "latitudes"`);
    }


}
