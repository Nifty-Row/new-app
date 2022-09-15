import {MigrationInterface, QueryRunner} from "typeorm";

export class new1663247731504 implements MigrationInterface {
    name = 'new1663247731504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roles\` \`role\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`role\` \`roles\` text NOT NULL`);
    }

}
