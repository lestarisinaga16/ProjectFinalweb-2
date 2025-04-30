import { MigrationInterface, QueryRunner } from "typeorm";

export class PengirimanTable1745470959897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE pengiriman (
                id SERIAL PRIMARY KEY,
                nama_penerima VARCHAR(100) NOT NULL,
                alamat_pengiriman TEXT NOT NULL,
                nomor_telepon VARCHAR(20) NOT NULL,
                catatan TEXT,
                status_pengiriman VARCHAR(50) DEFAULT 'pending',
                waktu_pengiriman TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ); 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE pengiriman;`)
    }

}
