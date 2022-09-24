import { MigrationInterface, QueryRunner } from 'typeorm';

export class new1664044540085 implements MigrationInterface {
  name = 'new1664044540085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` ADD \`status\` ENUM('subscribed', 'unsubscribed') NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    );
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` DROP COLUMN \`updated_at\``
    );
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` DROP COLUMN \`created_at\``
    );
    await queryRunner.query(
      `ALTER TABLE \`newsletter\` DROP COLUMN \`status\``
    );
  }
}
