import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { RoleName } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (minimum 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: 'John', 
    required: false, 
    description: 'User first name' 
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ 
    example: 'Doe', 
    required: false, 
    description: 'User last name' 
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ 
    example: '+6281234567890', 
    required: false, 
    description: 'User phone number' 
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ 
    example: 'Jl. Sudirman No.1', 
    required: false, 
    description: 'User address' 
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ 
    enum: RoleName, 
    example: RoleName.USER,
    description: 'User role in the system',
    enumName: 'RoleName'
  })
  @IsEnum(RoleName)
  role: RoleName;

  @ApiProperty({ 
    example: false, 
    required: false, 
    description: 'Whether user can purchase products',
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isBuyer?: boolean;

  @ApiProperty({ 
    example: false, 
    required: false, 
    description: 'Whether user can enroll in courses',
    default: false
  })
  @IsOptional()
  @IsBoolean()
  isStudent?: boolean;
}