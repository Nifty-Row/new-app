"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1655393230701 = void 0;
class new1655393230701 {
    constructor() {
        this.name = 'new1655393230701';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`displayImage\` \`displayImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`coverImage\` \`coverImage\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`coverImage\` \`coverImage\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_photo\` CHANGE \`displayImage\` \`displayImage\` varchar(255) NOT NULL`);
    }
}
exports.new1655393230701 = new1655393230701;
//# sourceMappingURL=1655393230701-new.js.map