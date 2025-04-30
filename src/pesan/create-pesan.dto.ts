import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from "class-validator";

export class CreatePesanDTO {
  @ApiProperty({ example: 'Lestari', description: 'Nama Pemesan' })
  @IsString()
  @IsNotEmpty()
  nama_pemesan: string;

  @ApiProperty({ example: '+627207138', description: 'Nomor HP' })
  @IsString()
  @IsNotEmpty()
  no_hp: string;

  @ApiProperty({ example: 'Unai', description: 'Alamat Pengiriman' })
  @IsString()
  @IsNotEmpty()
  alamat: string;

  @ApiProperty({ example: 'Pedas', description: 'Catatan Tambahan' })
  @IsString()
  @IsOptional()
  catatan?: string;

  @ApiProperty({
    example: [
      { nama_makanan: 'Nasi Uduk', jumlah: 2, harga: 10000 },
      { nama_makanan: 'Es Cendol', jumlah: 1, harga: 5000 }
    ],
    description: 'Daftar Pesanan'
  })
  @IsArray()
  pesanan: {
    nama_makanan: string;
    jumlah: number;
    harga: number;
  }[];

  @ApiProperty({ example: 25000, description: 'Total Harga' })
  @IsNumber()
  total: number;
}