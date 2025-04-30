import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePesanTable1743923426639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE pesan (
              id SERIAL PRIMARY KEY,
              nama VARCHAR(100) NOT NULL,
              email VARCHAR(100) NOT NULL,
              nomor_telepon VARCHAR(20),
              pesan TEXT NOT NULL,
              status VARCHAR(20) DEFAULT 'pending',
              created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pesan;`)
  }
}
