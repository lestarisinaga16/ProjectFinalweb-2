import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsOptional, IsEnum } from 'class-validator';

export class CreatePengirimanDTO {
  @ApiProperty({ example: 'P001', description: 'ID Pesanan' })
  @IsString()
  id_pesanan: string;

  @ApiProperty({ example: 'Lestari', description: 'Nama Pemesan' })
  @IsString()
  nama_pemesan: string;

  @ApiProperty({ example: '+629582', description: 'Nomor Telepon' })
  @IsString()
  nomor_telepon: string;

  @ApiProperty({ example: 'Komplek UNAI', description: 'Alamat Pengiriman' })
  @IsString()
  alamat: string;

  @ApiProperty({
    example: [
      { nama_makanan: 'Nasi uduk', jumlah: 2, harga: 10000 },
      { nama_makanan: 'Es cendol', jumlah: 1, harga: 8000 }
    ],
    description: 'Daftar Pesanan'
  })
  @IsArray()
  pesanan: {
    nama_makanan: string;
    jumlah: number;
    harga: number;
  }[];

  @ApiProperty({ example: 28000, description: 'Total Harga' })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 'Tanpa Pedas', description: 'Catatan Tambahan' })
  @IsString()
  @IsOptional()
  catatan?: string;

  @ApiProperty({ 
    enum: ['Dipesan', 'Diproses', 'Sedang Dikirim', 'Diterima'],
    example: 'Dipesan',
    description: 'Status Pesanan'
  })
  @IsEnum(['Dipesan', 'Diproses', 'Sedang Dikirim', 'Diterima'])
  status: string;
} 