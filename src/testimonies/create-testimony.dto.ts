import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateTestimonyDTO {
  @ApiProperty({ example: 'Lestari', description: 'Nama Reviewer' })
  @IsString()
  nama_reviewer: string;

  @ApiProperty({ example: 'Makanannya enak dan murah', description: 'Teks Review' })
  @IsString()
  review_text: string;

  @ApiProperty({ example: 5, description: 'Rating (1-5 bintang)', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
} 