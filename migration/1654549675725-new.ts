import {MigrationInterface, QueryRunner} from "typeorm";

export class new1654549675725 implements MigrationInterface {
    name = 'new1654549675725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_efbd1135797e451d834bcf88cd\` (\`walletAddress\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_efbd1135797e451d834bcf88cd\``);
    }

}
