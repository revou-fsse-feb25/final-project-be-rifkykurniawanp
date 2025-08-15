import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { RoleName } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '+6281234567890', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Jl. Sudirman No.1', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ enum: RoleName, example: RoleName.USER })
  @IsEnum(RoleName)
  role: RoleName;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isBuyer?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;
}
