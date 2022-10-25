import {MigrationInterface, QueryRunner} from "typeorm";

export class new1666260900136 implements MigrationInterface {
    name = 'new1666260900136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD INDEX \`IDX_f2578043e491921209f5dadd08\` (\`phoneNumber\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_f2578043e491921209f5dadd08\``);
    }

}
