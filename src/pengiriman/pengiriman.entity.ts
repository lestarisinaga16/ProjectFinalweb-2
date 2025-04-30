import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pengiriman')
export class Pengiriman {
  @PrimaryColumn()
  id_pesanan: string; // Format: P001, P002, etc.

  @Column()
  nama_pemesan: string;

  @Column()
  nomor_telepon: string;

  @Column()
  alamat: string;

  @Column('json')
  pesanan: {
    nama_makanan: string;
    jumlah: number;
  }[];

  @Column()
  total: number;

  @Column({ nullable: true })
  catatan: string;

  @Column({
    type: 'enum',
    enum: ['Dipesan', 'Diproses', 'Sedang Dikirim', 'Diterima'],
    default: 'Dipesan'
  })
  status: string;
}