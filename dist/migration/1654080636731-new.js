"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1654080636731 = void 0;
class new1654080636731 {
    constructor() {
        this.name = 'new1654080636731';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
    }
}
exports.new1654080636731 = new1654080636731;
//# sourceMappingURL=1654080636731-new.js.map