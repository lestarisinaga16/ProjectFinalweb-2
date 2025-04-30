import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  client_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone_no: string;  

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  company: string;
}

export class CreateMenuDTO {
  @ApiProperty({ example: 'Nasi Uduk', description: 'Nama makanan' })
  nama_makanan: string;

  @ApiProperty({ example: 10000, description: 'Harga makanan' })
  harga: number;

  @ApiProperty({ example: 'Tersedia', description: 'Status ketersediaan' })
  status: string;
}
