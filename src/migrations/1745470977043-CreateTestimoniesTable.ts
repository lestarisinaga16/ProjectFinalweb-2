import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestimoniesTable1745470977043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE testimonies (
                id SERIAL PRIMARY KEY,
                nama VARCHAR(100) NOT NULL,
                pesan TEXT NOT NULL,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                foto_url TEXT,
                is_approved BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ); 
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE testimonies;`)
    }

}
