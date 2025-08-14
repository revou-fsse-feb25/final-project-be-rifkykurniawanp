// dto/request/create-role.dto.ts
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { RoleName } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name from predefined enum values',
    enum: RoleName,
    example: RoleName.USER
  })
  @IsNotEmpty({ message: 'Role name is required' })
  @IsEnum(RoleName, { message: 'Role name must be a valid role type' })
  name: RoleName;

  @ApiPropertyOptional({
    description: 'Description of the role and its responsibilities',
    maxLength: 500,
    example: 'Standard user with basic access to products and courses'
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;
}