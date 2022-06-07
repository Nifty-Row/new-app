import {MigrationInterface, QueryRunner} from "typeorm";

export class new1654607742899 implements MigrationInterface {
    name = 'new1654607742899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NOT NULL`);
    }

}
