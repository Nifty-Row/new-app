import {MigrationInterface, QueryRunner} from "typeorm";

export class new1655393230701 implements MigrationInterface {
    name = 'new1655393230701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`displayImage\` \`displayImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`coverImage\` \`coverImage\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`coverImage\` \`coverImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`displayImage\` \`displayImage\` varchar(255) NOT NULL`);
    }

}
