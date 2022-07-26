import {MigrationInterface, QueryRunner} from "typeorm";

export class new1658783221769 implements MigrationInterface {
    name = 'new1658783221769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_75e2be4ce11d447ef43be0e374f\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9bd2fe7a8e694dedc4ec2f666fe\``);
        await queryRunner.query(`DROP INDEX \`REL_75e2be4ce11d447ef43be0e374\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\``);
        await queryRunner.query(`CREATE TABLE \`bank_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bankName\` varchar(255) NOT NULL, \`bankAccountNumber\` int NOT NULL, \`bankShortCode\` varchar(255) NOT NULL, \`userWalletAddress\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newsletter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`socialId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`photoId\``);
        await queryRunner.query(`ALTER TABLE \`social\` ADD \`walletAddress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` ADD UNIQUE INDEX \`IDX_91843da732c52f8cfa426eab2a\` (\`walletAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` ADD \`walletAddress\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` ADD UNIQUE INDEX \`IDX_58bfac89aa3593395e6cea3711\` (\`walletAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`type\` \`type\` varchar(255) NOT NULL DEFAULT 'collector'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`type\` \`type\` varchar(255) NOT NULL DEFAULT 'fiat-user'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` DROP INDEX \`IDX_58bfac89aa3593395e6cea3711\``);
        await queryRunner.query(`ALTER TABLE \`user_photo\` DROP COLUMN \`walletAddress\``);
        await queryRunner.query(`ALTER TABLE \`social\` DROP INDEX \`IDX_91843da732c52f8cfa426eab2a\``);
        await queryRunner.query(`ALTER TABLE \`social\` DROP COLUMN \`walletAddress\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`photoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`socialId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`newsletter\``);
        await queryRunner.query(`DROP TABLE \`contact_us\``);
        await queryRunner.query(`DROP TABLE \`bank_info\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_9bd2fe7a8e694dedc4ec2f666f\` ON \`user\` (\`socialId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_75e2be4ce11d447ef43be0e374\` ON \`user\` (\`photoId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9bd2fe7a8e694dedc4ec2f666fe\` FOREIGN KEY (\`socialId\`) REFERENCES \`social\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_75e2be4ce11d447ef43be0e374f\` FOREIGN KEY (\`photoId\`) REFERENCES \`user_photo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
