import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pesan')
export class Pesan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_pemesan: string;

  @Column()
  no_hp: string;

  @Column()
  alamat: string;

  @Column({ nullable: true })
  catatan: string;

  @Column('json', { nullable: true })
  pesanan: {
    nama_makanan: string;
    jumlah: number;
    harga: number;
  }[];

  @Column()
  total: number;
}