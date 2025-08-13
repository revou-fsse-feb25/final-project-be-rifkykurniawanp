import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email user yang valid',
    example: 'john.doe@example.com',
    maxLength: 100,
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    description: 'Password user (minimal 6 karakter)',
    example: 'password123',
    minLength: 6,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({
    description: 'Alamat user',
    example: 'Jl. Merdeka No. 10',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  address?: string;

  @ApiPropertyOptional({
    description: 'Nama depan user',
    example: 'John',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Nama belakang user',
    example: 'Doe',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Nomor telepon',
    example: '+628123456789',
    maxLength: 20,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({
    description: 'ID Role yang dimiliki user',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  roleId?: number;

  @ApiPropertyOptional({
    description: 'Status apakah user adalah pembeli',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isBuyer?: boolean;

  @ApiPropertyOptional({
    description: 'Status apakah user adalah pelajar',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;
}
