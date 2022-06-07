"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1654607742899 = void 0;
class new1654607742899 {
    constructor() {
        this.name = 'new1654607742899';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`discordUrl\` \`discordUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`pinterestUrl\` \`pinterestUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`youtubeUrl\` \`youtubeUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`twitterUrl\` \`twitterUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`facebookUrl\` \`facebookUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`telegramUrl\` \`telegramUrl\` varchar(255) NOT NULL`);
    }
}
exports.new1654607742899 = new1654607742899;
//# sourceMappingURL=1654607742899-new.js.map