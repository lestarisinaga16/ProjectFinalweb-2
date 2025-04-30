import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_makanan: string;

  @Column()
  harga: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}