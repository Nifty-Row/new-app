"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new1657651566197 = void 0;
class new1657651566197 {
    constructor() {
        this.name = 'new1657651566197';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`slider_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstSlide\` varchar(255) NULL, \`secondSlide\` varchar(255) NULL, \`thirdSlide\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`slider_image\``);
    }
}
exports.new1657651566197 = new1657651566197;
//# sourceMappingURL=1657651566197-new.js.map