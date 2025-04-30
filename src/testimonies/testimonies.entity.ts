import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testimonies')
export class Testimonies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_reviewer: string;

  @Column('text')
  review_text: string;

  @Column()
  rating: number;

  @Column('date')
  tanggal_review: Date;
}