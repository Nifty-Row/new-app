"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1653728416797 = void 0;
class new1653728416797 {
    constructor() {
        this.name = 'new1653728416797';
    }
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_75e2be4ce11d447ef43be0e374\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_75e2be4ce11d447ef43be0e374\` ON \`user\` (\`photoId\`)`);
    }
}
exports.new1653728416797 = new1653728416797;
//# sourceMappingURL=1653728416797-new.js.map