"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1654549629254 = void 0;
class new1654549629254 {
    constructor() {
        this.name = 'new1654549629254';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
    }
}
exports.new1654549629254 = new1654549629254;
//# sourceMappingURL=1654549629254-new.js.map