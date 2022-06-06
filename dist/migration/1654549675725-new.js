"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1654549675725 = void 0;
class new1654549675725 {
    constructor() {
        this.name = 'new1654549675725';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
    }
}
exports.new1654549675725 = new1654549675725;
//# sourceMappingURL=1654549675725-new.js.map