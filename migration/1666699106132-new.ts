import {MigrationInterface, QueryRunner} from "typeorm";

export class new1666699106132 implements MigrationInterface {
    name = 'new1666699106132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_f2578043e491921209f5dadd08\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phoneNumber\` \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_f2578043e491921209f5dadd08\` ON \`user\` (\`phoneNumber\`)`);
    }

}
