import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama makanan harus diisi' })
  nama_makanan: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Harga harus diisi' })
  harga: number;

  @IsString()
  @IsNotEmpty({ message: 'Status harus diisi' })
  status: string;
} 