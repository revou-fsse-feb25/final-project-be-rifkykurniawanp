// dto/request/update-role.dto.ts
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { RoleName } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiPropertyOptional({
    description: 'Role name from predefined enum values',
    enum: RoleName,
    example: RoleName.USER
  })
  @IsOptional()
  @IsEnum(RoleName, { message: 'Role name must be a valid role type' })
  name?: RoleName;

  @ApiPropertyOptional({
    description: 'Description of the role and its responsibilities',
    maxLength: 500,
    example: 'Updated role description with new responsibilities'
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  description?: string;
}