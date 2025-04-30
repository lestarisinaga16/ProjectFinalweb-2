import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Username minimal 3 karakter' })
  username: string;

  @IsEmail({}, { message: 'Email tidak valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;

  @IsString()
  @IsOptional()
  role?: string;
}