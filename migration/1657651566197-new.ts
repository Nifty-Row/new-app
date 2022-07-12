import {MigrationInterface, QueryRunner} from "typeorm";

export class new1657651566197 implements MigrationInterface {
    name = 'new1657651566197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`slider_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstSlide\` varchar(255) NULL, \`secondSlide\` varchar(255) NULL, \`thirdSlide\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`slider_image\``);
    }

}
