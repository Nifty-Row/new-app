import {MigrationInterface, QueryRunner} from "typeorm";

export class new1654631262887 implements MigrationInterface {
    name = 'new1654631262887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9bd2fe7a8e694dedc4ec2f666fe\``);
        await queryRunner.query(`DROP INDEX \`REL_75e2be4ce11d447ef43be0e374\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`photoId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`socialId\``);
        await queryRunner.query(`ALTER TABLE \`social\` ADD \`walletAddress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` ADD UNIQUE INDEX \`IDX_91843da732c52f8cfa426eab2a\` (\`walletAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` ADD \`walletAddress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` ADD UNIQUE INDEX \`IDX_58bfac89aa3593395e6cea3711\` (\`walletAddress\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_photo\` DROP INDEX \`IDX_58bfac89aa3593395e6cea3711\``);
        await queryRunner.query(`ALTER TABLE \`user_photo\` DROP COLUMN \`walletAddress\``);
        await queryRunner.query(`ALTER TABLE \`social\` DROP INDEX \`IDX_91843da732c52f8cfa426eab2a\``);
        await queryRunner.query(`ALTER TABLE \`social\` DROP COLUMN \`walletAddress\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`socialId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`photoId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\` (\`socialId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_75e2be4ce11d447ef43be0e374\` ON \`user\` (\`photoId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9bd2fe7a8e694dedc4ec2f666fe\` FOREIGN KEY (\`socialId\`) REFERENCES \`social\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\` FOREIGN KEY (\`photoId\`) REFERENCES \`user_photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
