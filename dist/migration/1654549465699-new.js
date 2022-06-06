"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1654549465699 = void 0;
class new1654549465699 {
    constructor() {
        this.name = 'new1654549465699';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`contact_us\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`message\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`newsletter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
        await queryRunner.query(`DROP TABLE \`newsletter\``);
        await queryRunner.query(`DROP TABLE \`contact_us\``);
    }
}
exports.new1654549465699 = new1654549465699;
//# sourceMappingURL=1654549465699-new.js.map